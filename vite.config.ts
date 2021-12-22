import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import svgrPlugin from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
    svgrPlugin({
      svgrOptions: {
        icon: true,
        // ...svgr options (https://react-svgr.com/docs/options/)
      },
    }),
  ],
  resolve: {
    alias: {
      components: resolve(__dirname, "src", "components"),
      assets: resolve(__dirname, "src", "assets"),
      near: resolve(__dirname, "src", "near"),
      hooks: resolve(__dirname, "src", "hooks"),
      pages: resolve(__dirname, "src", "pages"),
      utils: resolve(__dirname, "src", "utils"),
      store: resolve(__dirname, "src", "store"),
      locales: resolve(__dirname, "src", "locales"),
    }
  },
  define: {
    "process.env": {}
  },
  build: {
    chunkSizeWarningLimit:1500,
    rollupOptions: {
        output:{
            manualChunks(id) {
              if (id.includes('node_modules')) {
                
                  return id.toString().split('node_modules/')[1].split('/')[0].toString();
              }
          }
        }
    }
  }
})
