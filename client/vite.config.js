import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
       "/api": 'https://ecommerce-muneeb-2hdf.vercel.app', // Your server's address
     // "/api": 'http://localhost:8009', // Your server's address
    }
  },
  plugins: [react()],
})
