import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/basic": "http://localhost:3000",
      "/form-based": "http://localhost:3000",
    }
  }
})
