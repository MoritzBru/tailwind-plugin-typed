import { resolve } from 'node:path';
import typographyPlugin from '@tailwindcss/typography';
import typedPlugin from '../dist/index.js';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    resolve(__dirname, 'index.html'),
  ],
  plugins: [
    typographyPlugin,
    typedPlugin,
  ],
};
