import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: 'esnext',
    lib: {
      entry: 'index.html',
      formats: ['es'],
    },
    rollupOptions: {
      // external: /^lit/,
    },
  },
});
