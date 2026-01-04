import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// To prevent hardcoding of backend server URL, we set up a proxy in Vite configuration.
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
    },
  },
});