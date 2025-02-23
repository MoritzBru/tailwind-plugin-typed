import { copyFileSync } from 'node:fs';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  build: {
    lib: {
      entry: './src/index.ts',
      fileName: 'index',
      formats: ['es', 'cjs'],
    },
    target: 'esnext',
  },
  plugins: [
    dts({
      afterBuild: () => {
        copyFileSync('dist/index.d.ts', 'dist/index.d.cts');
      },
    }),
    tailwindcss(), // only used for local dev 'serve'
  ],
  publicDir: false,
});
