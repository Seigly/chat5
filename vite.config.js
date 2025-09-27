import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  preview: {
    allowedHosts: ['chat5-1-gy7f.onrender.com'], // your Render host
    port: 10000, // optional, you can keep or change
    host: true
  }
})
