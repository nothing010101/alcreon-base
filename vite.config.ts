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
    },
  },
})
