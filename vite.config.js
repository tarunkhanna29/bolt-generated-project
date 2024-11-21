import { defineConfig } from 'vite';
  import react from '@vitejs/plugin-react';

  // https://vitejs.dev/config/
  export default defineConfig({
    plugins: [react()],
    server: {
      proxy: {
        '/upload_bollywood_songs': {
          target: 'http://localhost:3000',
          changeOrigin: true
        },
        '/guess_bollywood_singer': {
          target: 'http://localhost:3000',
          changeOrigin: true
        }
      }
    }
  });
