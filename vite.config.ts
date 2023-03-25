import terser from '@rollup/plugin-terser';
import minifyHTML from 'rollup-plugin-minify-html-literals';
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
      plugins: [],
    },
  },
});
