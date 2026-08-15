export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Endpoint API para Bandsintown
    if (url.pathname === '/api/events') {
      const appId = env.BANDSINTOWN_APP_ID;

      if (!appId) {
        return new Response(JSON.stringify({ error: "Missing API Key" }), {
          status: 500,
          headers: { "Content-Type": "application/json" },
        });
      }

      const artistName = "Jesus Molina";
      const apiUrl = `https://rest.bandsintown.com/artists/${encodeURIComponent(artistName)}/events?app_id=${appId}`;

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
