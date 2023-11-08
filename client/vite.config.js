import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 4000, // Your configured port
    proxy: {
      "/api": {
        target: 'http://192.168.10.6:8009', // Your server's address
        changeOrigin: true,
      },
    },
  }
})
