import typedPlugin from '../../dist/index.js';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html'],
  plugins: [
    typedPlugin({
      pauseAfterWordDuration: 1,
    }),
  ],
};
