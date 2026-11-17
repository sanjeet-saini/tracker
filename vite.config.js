import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The app is served from https://sanjeet-saini.github.io/tracker/
export default defineConfig({
  plugins: [react()],
  base: '/tracker/',
})
