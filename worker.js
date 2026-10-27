import { fetchChannelVideos, DEFAULT_YOUTUBE_CHANNEL_ID, ARTISTS } from './server/youtube.js';

// Cuánto tiempo se considera "fresca" la lista de videos antes de volver a consultar YouTube
const YOUTUBE_TTL_SECONDS = 60 * 60; // 1 hora
// Si YouTube falla, se sirve la última respuesta buena hasta este límite
const YOUTUBE_STALE_SECONDS = 60 * 60 * 24 * 7; // 7 días

const youtubeMemo = new Map(); // artista -> { body, fetchedAt } — caché en memoria del isolate

function jsonResponse(body, status, extraHeaders = {}) {
  return new Response(typeof body === 'string' ? body : JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...extraHeaders },
  });
}

async function handleYouTube(request, env, ctx) {
  const now = Date.now();
  // ?artist=mister -> solo MISTER MOLINA; cualquier otro valor -> Jesus Molina
  const requested = new URL(request.url).searchParams.get('artist');
  const artist = Object.hasOwn(ARTISTS, requested ?? '') ? requested : 'jesus';
  const cacheKey = new Request(new URL(`/__cache/youtube-videos-v5-${artist}`, request.url).toString());
  const cache = typeof caches !== 'undefined' ? caches.default : null;

  // 1. Caché en memoria, luego Cache API de Cloudflare
  let cached = youtubeMemo.get(artist);
  if (!cached && cache) {
    try {
      const hit = await cache.match(cacheKey);
      if (hit) cached = { body: await hit.text(), fetchedAt: Number(hit.headers.get('X-Fetched-At')) || 0 };
    } catch { /* Cache API no disponible: seguimos sin ella */ }
  }

  const isFresh = cached && now - cached.fetchedAt < YOUTUBE_TTL_SECONDS * 1000;
  if (isFresh) {
    youtubeMemo.set(artist, cached);
    return jsonResponse(cached.body, 200, { "Cache-Control": "public, max-age=900", "X-Cache": "HIT" });
  }

  // 2. Consultar YouTube
  try {
    const data = await fetchChannelVideos({
      apiKey: env.YOUTUBE_API_KEY,
      channelId: artist === 'jesus' ? env.YOUTUBE_CHANNEL_ID || DEFAULT_YOUTUBE_CHANNEL_ID : undefined,
      artist,
    });
    const body = JSON.stringify(data);
    youtubeMemo.set(artist, { body, fetchedAt: now });

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

// ── Dos dominios, una sola web ──
// jesusmolina.org (Jesús Molina) y mistermolinamusic.com (MISTER MOLINA), cada uno con sus propias páginas.
// *.localhost permite probarlo con `wrangler dev` (localhost:8787 y mistermolinamusic.localhost:8787).
const SITE_URLS = { jesus: 'https://jesusmolina.org', mister: 'https://mistermolinamusic.com' };
const MISTER_PATH = '/mister-molina';
// Ambos dominios tienen las mismas páginas, cada una con el contenido de su artista
const SITE_PAGES = ['/', '/concerts', '/biography', '/contact'];

const JESUS_DESCRIPTION = 'Jesús Molina is a Colombian pianist, composer and producer. Tour dates, music, videos, biography and booking.';
const SITE_META = {
  jesus: {
    siteName: 'Jesús Molina',
    titles: {
      '/': 'Jesús Molina | Official Website',
      '/concerts': 'Tour | Jesús Molina',
      '/biography': 'Biography | Jesús Molina',
      '/contact': 'Contact | Jesús Molina',
    },
    description: JESUS_DESCRIPTION,
    image: '/images/biography-portrait.jpg',
  },
  mister: {
    siteName: 'MISTER MOLINA',
    titles: {
      '/': 'MISTER MOLINA | Official Website',
      '/concerts': 'Tour | MISTER MOLINA',
      '/biography': 'Biography | MISTER MOLINA',
      '/contact': 'Contact | MISTER MOLINA',
    },
    description: 'MISTER MOLINA is the electronic alter ego of pianist and producer Jesús Molina. Listen to "Higher Than Heaven" featuring Grace Kinstler, watch the videos and book MISTER MOLINA.',
    image: '/images/mistermolinaphoto.jpeg',
  },
};

function siteFor(hostname) {
  if (/^(www\.)?mistermolinamusic\.(com|localhost)$/.test(hostname)) return 'mister';
  if (/^(www\.)?jesusmolina\.org$/.test(hostname) || hostname === 'localhost') return 'jesus';
  return null; // workers.dev, etc.: una sola web como antes
}

function originsFor(url) {
  if (!url.hostname.endsWith('localhost')) return SITE_URLS;
  const port = url.port ? `:${url.port}` : '';
  return { jesus: `${url.protocol}//localhost${port}`, mister: `${url.protocol}//mistermolinamusic.localhost${port}` };
}

function redirect(location) {
  return Response.redirect(location, 301);
}

// URLs de la web antigua de Wix que siguen en Google (también con prefijo de idioma: /es/bio, /fr/concerts...)
const LANG_PREFIX = /^\/(es|en|fr|it|pt|de)(?=\/|$)/;
const LEGACY_REDIRECTS = [
  [/^\/(bio|biografia(-1)?|copia-de-biografia|epk)$/, '/biography'],
  [/^\/(conciertos|event-details-registration(\/.*)?)$/, '/concerts'],
  [/^\/(contact-8|contactos|copia-de-contactos)$/, '/contact'],
  [/^\/(masterclass(-1)?|clinicasmusicales|online-courses|pianote|videotutoriales|videotutorials)$/, '/#cursos-disponibles'],
  [/^\/(selah|remix)$/, '/#spotify'],
  [/^\/(videosydiscografia|copia-de-videos-discografia)$/, '/#destacados'],
];

// [sitio, ruta] de destino para una ruta pedida en cada dominio; lo que no existe va a la portada
function jesusTarget(path) {
  const unprefixed = path.replace(LANG_PREFIX, '') || '/';
  if (SITE_PAGES.includes(unprefixed)) return ['jesus', unprefixed];
  const legacy = LEGACY_REDIRECTS.find(([pattern]) => pattern.test(unprefixed));
  return ['jesus', legacy ? legacy[1] : '/'];
}

function misterTarget(path) {
  return ['mister', SITE_PAGES.includes(path) ? path : '/'];
}

// '/mister-molina' y '/mister-molina/concerts' (cualquier dominio) -> '/' y '/concerts' en mistermolinamusic.com
function misterPathTarget(path) {
  if (path !== MISTER_PATH && !path.startsWith(`${MISTER_PATH}/`)) return null;
  return misterTarget(path.slice(MISTER_PATH.length) || '/');
}

// Redirecciones 301 entre dominios y desde URLs antiguas (las ve Google; el cliente también lo resuelve)
function siteRedirect(site, url, origins) {
  if (url.hostname.startsWith('www.')) {
    return redirect(`${url.protocol}//${url.host.slice(4)}${url.pathname}${url.search}`);
  }
  // APIs, robots.txt, sitemap.xml y archivos no se tocan
  if (url.pathname.startsWith('/api/') || /\.\w+$/.test(url.pathname)) return null;

  const path = url.pathname.replace(/\/+$/, '') || '/'; // '/concerts/' -> '/concerts'
  const [targetSite, target] = misterPathTarget(path)
    ?? (site === 'mister' ? misterTarget(path) : jesusTarget(path));
  if (targetSite === site && target === url.pathname) return null;

  const [targetPath, hash] = target.split('#');
  return redirect(`${origins[targetSite]}${targetPath}${url.search}${hash ? `#${hash}` : ''}`);
}

function robotsTxt(origin) {
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600' },
  });
}

function sitemapXml(origin) {
  const urls = SITE_PAGES.map((page) => `  <url><loc>${origin}${page}</loc></url>`).join('\n');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600' },
  });
}

// Título, descripción, canonical y Open Graph según el dominio y la página
function withSiteMeta(response, site, url, origin) {
  const meta = SITE_META[site];
  const page = meta.titles[url.pathname] ? url.pathname : '/';
  const title = meta.titles[page];
  const pageUrl = `${origin}${page}`;
  const setContent = (value) => ({ element: (el) => el.setAttribute('content', value) });

  return new HTMLRewriter()
    .on('title', { element: (el) => el.setInnerContent(title) })
    .on('meta[name="description"]', setContent(meta.description))
    .on('link[rel="canonical"]', { element: (el) => el.setAttribute('href', pageUrl) })
    .on('meta[property="og:site_name"]', setContent(meta.siteName))
    .on('meta[property="og:title"]', setContent(title))
    .on('meta[property="og:description"]', setContent(meta.description))
    .on('meta[property="og:url"]', setContent(pageUrl))
    .on('meta[property="og:image"]', setContent(`${origin}${meta.image}`))
    .transform(response);
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const site = siteFor(url.hostname);
    const origins = originsFor(url);

    if (site) {
      const redirectResponse = siteRedirect(site, url, origins);
      if (redirectResponse) return redirectResponse;
      if (url.pathname === '/robots.txt') return robotsTxt(origins[site]);
      if (url.pathname === '/sitemap.xml') return sitemapXml(origins[site]);
    }

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

    // Cualquier otra ruta: archivos estáticos del frontend (React). Las páginas (/, /concerts...)
    // reciben index.html por la configuración "single-page-application" de wrangler.jsonc
    const response = await env.ASSETS.fetch(request);
    const isHtml = (response.headers.get('Content-Type') || '').includes('text/html');
    return site && isHtml ? withSiteMeta(response, site, url, origins[site]) : response;
  }
};
