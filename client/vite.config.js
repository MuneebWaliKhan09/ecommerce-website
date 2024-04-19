import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
       "/api": 'https://ecommerce-muneeb.vercel.app', // Your server's address
    },
  },
  plugins: [react()],
})
