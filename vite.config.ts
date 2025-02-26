import { copyFileSync } from 'node:fs';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

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
  ],
});
