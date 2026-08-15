export async function onRequest(context) {
  const { env } = context;
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
        // Cache locally or in CDN to avoid hammering the Bandsintown API
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
