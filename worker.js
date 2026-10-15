import { fetchChannelVideos, DEFAULT_YOUTUBE_CHANNEL_ID } from './server/youtube.js';

// Cuánto tiempo se considera "fresca" la lista de videos antes de volver a consultar YouTube
const YOUTUBE_TTL_SECONDS = 60 * 60; // 1 hora
// Si YouTube falla, se sirve la última respuesta buena hasta este límite
const YOUTUBE_STALE_SECONDS = 60 * 60 * 24 * 7; // 7 días

let youtubeMemo = null; // { body, fetchedAt } — caché en memoria del isolate

function jsonResponse(body, status, extraHeaders = {}) {
  return new Response(typeof body === 'string' ? body : JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...extraHeaders },
  });
}

async function handleYouTube(request, env, ctx) {
  const now = Date.now();
  const cacheKey = new Request(new URL('/__cache/youtube-videos-v3', request.url).toString());
  const cache = typeof caches !== 'undefined' ? caches.default : null;

  // 1. Caché en memoria, luego Cache API de Cloudflare
  let cached = youtubeMemo;
  if (!cached && cache) {
    try {
      const hit = await cache.match(cacheKey);
      if (hit) cached = { body: await hit.text(), fetchedAt: Number(hit.headers.get('X-Fetched-At')) || 0 };
    } catch { /* Cache API no disponible: seguimos sin ella */ }
  }

  const isFresh = cached && now - cached.fetchedAt < YOUTUBE_TTL_SECONDS * 1000;
  if (isFresh) {
    youtubeMemo = cached;
    return jsonResponse(cached.body, 200, { "Cache-Control": "public, max-age=900", "X-Cache": "HIT" });
  }

  // 2. Consultar YouTube
  try {
    const data = await fetchChannelVideos({
      apiKey: env.YOUTUBE_API_KEY,
      channelId: env.YOUTUBE_CHANNEL_ID || DEFAULT_YOUTUBE_CHANNEL_ID,
    });
    const body = JSON.stringify(data);
    youtubeMemo = { body, fetchedAt: now };

    if (cache) {
      const toStore = new Response(body, {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": `public, max-age=${YOUTUBE_STALE_SECONDS}`,
          "X-Fetched-At": String(now),
        },
      });
      ctx.waitUntil(cache.put(cacheKey, toStore).catch(() => {}));
    }

    return jsonResponse(body, 200, { "Cache-Control": "public, max-age=900", "X-Cache": "MISS" });
  } catch (error) {
    console.error('YouTube fetch failed:', error.message);
    // 3. Si falla, servir la última respuesta buena (aunque esté vencida)
    if (cached && now - cached.fetchedAt < YOUTUBE_STALE_SECONDS * 1000) {
      return jsonResponse(cached.body, 200, { "Cache-Control": "public, max-age=300", "X-Cache": "STALE" });
    }
    return jsonResponse({ error: "Videos are temporarily unavailable" }, 502, { "Cache-Control": "no-store" });
  }
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Endpoint API para YouTube (la API key se queda en el servidor)
    if (url.pathname === '/api/youtube') {
      return handleYouTube(request, env, ctx);
    }

    // Endpoint API para Bandsintown
    if (url.pathname === '/api/events') {
      const appId = env.BANDSINTOWN_APP_ID;

      if (!appId) {
        return new Response(JSON.stringify({ error: "Missing API Key" }), {
          status: 500,
          headers: { "Content-Type": "application/json" },
        });
      }

      const dateParam = url.searchParams.get('date') || 'upcoming';
      const artistName = "Jesus Molina";
      const apiUrl = `https://rest.bandsintown.com/artists/${encodeURIComponent(artistName)}/events?app_id=${appId}&date=${dateParam}`;

      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`Bandsintown API returned ${response.status}`);
        }

        const data = await response.json();

        return new Response(JSON.stringify(data), {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "public, max-age=3600",
          },
        });
      } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers: { "Content-Type": "application/json" },
        });
      }
    }

    // Cualquier otra ruta la dejamos pasar para que Cloudflare sirva los archivos estáticos de tu frontend (React)
    // En la nueva versión de Workers, si no devuelves nada o lanzas un throw fallará, 
    // pero si usas env.ASSETS puedes servir los assets estáticos explícitamente:
    return env.ASSETS.fetch(request);
  }
};
