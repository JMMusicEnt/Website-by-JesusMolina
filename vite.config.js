/*import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Website-by-JesusMolina/',
  plugins: [react()],
})*/
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { fetchChannelVideos, DEFAULT_YOUTUBE_CHANNEL_ID } from './server/youtube.js'

// Local equivalent of the /api/youtube route in worker.js (API key stays server-side)
function youtubeDevApi(apiKey, channelId) {
  let memo = null
  return {
    name: 'youtube-dev-api',
    configureServer(server) {
      server.middlewares.use('/api/youtube', async (_req, res) => {
        res.setHeader('Content-Type', 'application/json')
        try {
          if (!memo || Date.now() - memo.fetchedAt > 60 * 60 * 1000) {
            const data = await fetchChannelVideos({ apiKey, channelId })
            memo = { body: JSON.stringify(data), fetchedAt: Date.now() }
          }
          res.end(memo.body)
        } catch (e) {
          console.warn('[youtube-dev-api]', e.message)
          if (memo) return res.end(memo.body)
          res.statusCode = 502
          res.end(JSON.stringify({ error: 'Videos are temporarily unavailable' }))
        }
      })
    },
  }
}

export default defineConfig(() => {
  // Read API key from .dev.vars for local dev proxy
  let bandsintownAppId = '';
  let youtubeApiKey = '';
  let youtubeChannelId = DEFAULT_YOUTUBE_CHANNEL_ID;
  try {
    const devVars = fs.readFileSync(path.resolve('.dev.vars'), 'utf-8');
    const match = devVars.match(/BANDSINTOWN_APP_ID=(.+)/);
    if (match) bandsintownAppId = match[1].trim();
    const ytKey = devVars.match(/YOUTUBE_API_KEY=(.+)/);
    if (ytKey) youtubeApiKey = ytKey[1].trim();
    const ytChannel = devVars.match(/YOUTUBE_CHANNEL_ID=(.+)/);
    if (ytChannel) youtubeChannelId = ytChannel[1].trim();
  } catch (e) {
    console.warn('Could not read .dev.vars for local API proxy.');
  }

  return {
    base: '/Website-by-JesusMolina/',
    plugins: [react(), youtubeDevApi(youtubeApiKey, youtubeChannelId)],
    server: {
      proxy: {
        '/api/events': {
          target: 'https://rest.bandsintown.com',
          changeOrigin: true,
          rewrite: (path) => {
            const url = new URL(path, 'http://localhost');
            const dateParam = url.searchParams.get('date') || 'upcoming';
            return `/artists/Jesus%20Molina/events?app_id=${bandsintownAppId}&date=${dateParam}`;
          }
        }
      }
    }
  }
})