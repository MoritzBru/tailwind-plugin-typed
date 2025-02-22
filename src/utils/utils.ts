import type { RecursiveKeyValuePair, KeyValuePair } from 'tailwindcss/types/config';

// https://gist.github.com/jlevy/c246006675becc446360a798e2b2d781
export function simpleHash(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
  }
  return (hash >>> 0).toString(36).padStart(7, '0');
};

export function arraySum(arr: number[]) {
  return arr.reduce((sum, a) => sum + a, 0);
}

// https://github.com/tailwindlabs/tailwindcss/blob/master/src/util/flattenColorPalette.js
export function flattenColorPalette(colors: RecursiveKeyValuePair = {}): KeyValuePair {
  return Object.assign({}, ...Object.entries(colors).flatMap(([color, values]) => typeof values == 'object'
    ? Object.entries(flattenColorPalette(values)).map(([number, hex]) => ({
        [color + (number === 'DEFAULT' ? '' : `-${number}`)]: hex,
      }))
    : [
        {
          [`${color}`]: values,
        },
      ]));
}
