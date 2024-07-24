import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import Dts from 'vite-plugin-dts';
import { baseDir } from './build.js';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Vue(),
    Dts({
      logLevel: 'warn'
    }),
  ],
  resolve: {
    alias: {
      '@ds': resolve(baseDir, './src/components'),
      '@lib': resolve(baseDir, './src/lib'),
      '@': resolve(baseDir, './src'),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, './src/index.ts'),
      name: 'ui',
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      output: {
        globals: {
          'vue': 'Vue',
        },
      },
    },
  },
});
