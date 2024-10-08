import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://backend:5000/api',
        changeOrigin: true,  // Assicura che l'host di origine sia cambiato
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
