import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [vue()],
    publicDir: 'public',
    base: './',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    server: {
      port: 8081,
      open: true,
      strictPort: true,
      proxy: {
        '/api': {
          target: 'http://localhost:12580',
          changeOrigin: true,
          rewrite: url => url.replace(/^\/api/, ''),
        },
      },
    },
    build: {
      outDir: 'dist',
      assetsDir: 'public',
      assetsInlineLimit: 1024 * 4,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('lodash') || id.includes('echarts')) {
                return 'vendor-large';
              };
              if (id.includes('vant')) {
                return 'vant'
              };
              return 'vendor';
            };
          },
          chunkFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: (assetInfo) => {
            const extType = assetInfo.name.split('.').pop()?.toLowerCase();
            if (assetInfo.name === 'index.css') {
              return 'public/index-[hash].css';
            };
            if (['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp'].includes(extType)) {
              return `assets/image/[name]-[hash][extname]`;
            };
            if (['woff', 'woff2', 'ttf', 'eot'].includes(extType)) {
              return `assets/fonts/[name]-[hash][extname]`;
            };
            if (['css'].includes(extType)) {
              return `static/[ext]/[name]-[hash][extname]`;
            };
            return `assets/[ext]/[name]-[hash][extname]`;
          },
        },
      },
      cssCodeSplit: true,
    },
    css: {
      modules: {
        localsConvention: 'cameCase',
      },
      preprocessorOption: {
        scss: {
          additionalData: `
          @use "sass:math";
        `,
          charset: false,
          sassOptions: {
            indentWidth: 2,
            outputStyle: 'expanded',
            sourceMap: true
          },
        },
      },
      devSourcemap: true,
    },
  };
});
