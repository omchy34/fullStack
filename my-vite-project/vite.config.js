import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/v1': {
        target: 'https://backend-tphy.onrender.com', // Replace with your backend server URL
        changeOrigin: true,
        secure: true, // Set to true if your backend server uses HTTPS
        rewrite: (path) => path.replace(/^\/api\/v1/, ''), // Optional: remove the /api/v1 prefix
      },
    },
  },
});
