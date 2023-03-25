import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite';

const DEBUG_SW = false;

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: 'esnext',
    lib: {
      entry: 'index.html',
      formats: ['es'],
    },
  },
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      ...(DEBUG_SW
        ? {
            devOptions: {
              enabled: true,
            },
          }
        : {}),
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.pathname.includes('/api/search'),
            handler: 'CacheFirst',
            options: {
              cacheName: 'api-search-cache',
              expiration: {
                maxEntries: 15,
                maxAgeSeconds: 60 * 60 * 24 * 7, // 1 week
              },
            },
          },
        ],
      },
    }),
  ],
});
