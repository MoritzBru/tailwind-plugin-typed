import plugin from 'tailwindcss/plugin';
import { simpleHash } from './utils';

function getKeyframesFromString(string: string) {
  const chars = ['', ...string];
  const step = 100 / chars.length;
  const keyframes = Object.fromEntries(chars.map((_char, idx) => [`${idx * step}%`, { content: `"${string.slice(0, idx)}"` }]));
  return keyframes;
};

export default plugin(
  ({ matchComponents }) => {
    matchComponents(
      {
        // @ts-expect-error signature of dynamic object key
        typed: (string) => {
          return {
            '--tw-typed-caret-color': 'currentcolor',
            '--tw-typed-caret-width': '0.2ch',
            '--tw-typed-caret-space': '0.2ch',
            '--tw-typed-caret-duration': '0.8s',
            '--tw-typed-caret-delay': '0s',
            '--tw-typed-typing-duration': `${(string.length + 1) * 0.2}s`,

            '&::after': {
              content: '"\u200B"',
              position: 'relative',
              display: 'inline-block',
              paddingRight: 'var(--tw-typed-caret-space)',
              borderRight: 'var(--tw-typed-caret-width) solid var(--tw-typed-caret-color)',
              whiteSpace: 'nowrap',
              animation: 'tw-typed-caret var(--tw-typed-caret-duration) linear var(--tw-typed-caret-delay) infinite forwards',
            },

            '@keyframes tw-typed-caret': {
              '49%': { opacity: '1' },
              '51%, 100%': { opacity: '0' },
            },

            '&::before': {
              content: `"${string}"`,
              willChange: 'content',
              animation: `tw-typed-typing-${simpleHash(string)} var(--tw-typed-typing-duration) linear infinite alternate`,
            },

            [`@keyframes tw-typed-typing-${simpleHash(string)}`]: getKeyframesFromString(string),
          };
        },
      },
    );
  },
);
