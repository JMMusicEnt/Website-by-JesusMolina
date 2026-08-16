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

export default defineConfig(() => {
  // Read API key from .dev.vars for local dev proxy
  let bandsintownAppId = '';
  try {
    const devVars = fs.readFileSync(path.resolve('.dev.vars'), 'utf-8');
    const match = devVars.match(/BANDSINTOWN_APP_ID=(.+)/);
    if (match) bandsintownAppId = match[1].trim();
  } catch (e) {
    console.warn('Could not read .dev.vars for local API proxy.');
  }

  return {
    base: '/JesusMolina-WebPage/',
    plugins: [react()],
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