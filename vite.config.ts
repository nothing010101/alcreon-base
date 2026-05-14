import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/clanker': {
        target: 'https://www.clanker.world',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/clanker/, '/api'),
      },
      '/api/dexscreener': {
        target: 'https://api.dexscreener.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/dexscreener/, ''),
      },
      '/api/basescan': {
        target: 'https://api.basescan.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/basescan/, ''),
      },
    },
  },
})
