import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(import.meta.dirname, 'src/index.ts'),
      name: 'tailwindPluginTyped',
      fileName: 'index',
    },
  },
  plugins: [
    dts({
      include: resolve(import.meta.dirname, 'src/index.ts'),
    }),
  ],
});
