import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxying API requests to the backend server
      '/api/v1': {
        target: 'https://backend-tphy.onrender.com', // Replace with your backend server URL
       
      },
    },
  },
});
