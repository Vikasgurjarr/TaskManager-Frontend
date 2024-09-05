import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // Externalizing `react-dom/client` is not required
      // Remove the `external` field
      //external: ['react-dom/client'],
    },
    outDir: 'dist', // Ensure this matches your build output directory
    chunkSizeWarningLimit: 600, // Optional: Increase if necessary to avoid chunk size warnings
  },
});
