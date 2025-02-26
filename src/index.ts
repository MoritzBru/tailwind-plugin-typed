import plugin from 'tailwindcss/plugin';
import { arraySum, simpleHash, flattenColorPalette } from './utils/utils';

interface CssInJs {
  [key: string]: string | string[] | CssInJs | CssInJs[];
}

interface Options {
  delimiter?: string;
  typeLetterDuration?: number;
  pauseAfterWordDuration?: number;
  deleteLetterDuration?: number;
  pauseAfterDeletionDuration?: number;
};

const defaultOptions: Required<Options> = {
  delimiter: ';',
  typeLetterDuration: 0.1,
  pauseAfterWordDuration: 2,
  deleteLetterDuration: 0.05,
  pauseAfterDeletionDuration: 1,
};

const ZERO_WIDTH_SPACE = '\u200B';

export default plugin.withOptions<Options>(
  (options) =>
    ({ addComponents, matchComponents, matchUtilities, theme }) => {
      const optionsWithDefaults = Object.assign(defaultOptions, options);
      const isTwV4 = theme('zIndex')?.__BARE_VALUE__ !== undefined;

      matchComponents(
        {
          typed: (text) => {
            const hash = simpleHash(text);

            const strings = text
              .replace(/^`/, '') // if text starts with a backtick ` remove it
              .replace(/`$/, '') // if text ends with a backtick ` remove it
              .split(new RegExp(`(?<!\\\\)${optionsWithDefaults.delimiter}`)) // split on not escaped delimiter
              .map((string) => string.replaceAll(`\\${optionsWithDefaults.delimiter}`, optionsWithDefaults.delimiter)); // replace escaped delimiter with plain delimiter
            const altString = strings.join(`${optionsWithDefaults.delimiter} `);

            const durations = strings.map((string) => string.length * (optionsWithDefaults.typeLetterDuration + optionsWithDefaults.deleteLetterDuration) + optionsWithDefaults.pauseAfterWordDuration + optionsWithDefaults.pauseAfterDeletionDuration);
            const durationsCummulative = durations.map((_dur, durIdx) => arraySum(durations.slice(0, durIdx + 1)));
            const duration = arraySum(durations);

            function getTypingKeyframeStep() {
              const keyframes: [string, CssInJs][] = [];
              strings.forEach((string, stringIdx) => {
                [...string].forEach((_char, charIdx) => {
                  const isLastString = stringIdx + 1 === strings.length;
                  const isLastChar = charIdx + 1 === string.length;

                  const durationType = (durationsCummulative[stringIdx - 1] || 0) + (charIdx * optionsWithDefaults.typeLetterDuration);
                  const durationDelete = (durationsCummulative[stringIdx - 1] || 0) + (string.length * optionsWithDefaults.typeLetterDuration) + optionsWithDefaults.pauseAfterWordDuration + ((string.length - charIdx) * optionsWithDefaults.deleteLetterDuration);
                  const keyframe: [string, CssInJs] = [`${durationType / duration * 100}%, ${durationDelete / duration * 100}%`, { content: `"${string.slice(0, charIdx + 1)}" / "${altString}"` }];
                  keyframes.push(keyframe);

                  // insert pause after last char of string
                  if (isLastChar) {
                    const durationType = durationsCummulative[stringIdx] - optionsWithDefaults.pauseAfterDeletionDuration + optionsWithDefaults.typeLetterDuration;
                    const offsetTrick = -(Number(!isLastString) * 0.0001);
                    const durationDelete = durationsCummulative[stringIdx] + offsetTrick;
                    const pauseKeyframe: [string, CssInJs] = [`${durationType / duration * 100}%, ${durationDelete / duration * 100}%`, { content: `"${ZERO_WIDTH_SPACE}" / "${altString}"` }];
                    keyframes.push(pauseKeyframe);
                  }
                });
              });
              return Object.fromEntries(keyframes);
            }

            // Define keyframes separately and add them to the root
            const keyframes = {
              [`@keyframes tw-typed-typing-${hash}`]: {
                ...getTypingKeyframeStep(),
              },
            };
            if (isTwV4) {
              addComponents(keyframes);
            }

            return {
              '--tw-typed-typing-duration': `${duration}s`,
              '--tw-typed-typing-delay': '0s',

              '&::before': {
                content: `"${altString}"`,
                whiteSpace: 'break-spaces',
                willChange: 'content',
                animation: `tw-typed-typing-${hash} var(--tw-typed-typing-duration) linear var(--tw-typed-typing-delay) infinite`,
              },
              ...(isTwV4 ? {} : keyframes),
            };
          },
        },
      );
      addComponents(
        {
          '.typed-caret': {
            '--tw-typed-caret-content': `"${ZERO_WIDTH_SPACE}"`,
            '--tw-typed-caret-color': 'currentcolor',
            '--tw-typed-caret-width': '0.2ch',
            '--tw-typed-caret-space': '0.2ch',
            '--tw-typed-caret-duration': '1s',
            '--tw-typed-caret-delay': '0s',

            '&::after': {
              content: 'var(--tw-typed-caret-content)',
              paddingRight: 'var(--tw-typed-caret-space)',
              borderRight: 'var(--tw-typed-caret-width) solid var(--tw-typed-caret-color)',
              animation: 'tw-typed-caret var(--tw-typed-caret-duration) linear var(--tw-typed-caret-delay) infinite',
            },
          },
          '@keyframes tw-typed-caret': {
            '0%, 20%, 80%, 100%': { opacity: '1' },
            '30%, 70%': { opacity: '0' },
          },
        },
      );
      matchUtilities(
        {
          'typed-caret-color': (value) => ({
            '--tw-typed-caret-color': value,
          }),
        },
        {
          type: ['color'],
          values: flattenColorPalette(theme('colors')),
        },
      );
      matchUtilities(
        {
          'typed-caret-width': (value) => ({
            '--tw-typed-caret-width': value,
          }),
        },
        {
          values: theme('spacing'),
        },
      );
      matchUtilities(
        {
          'typed-caret-space': (value) => ({
            '--tw-typed-caret-space': value,
          }),
        },
        {
          values: theme('spacing'),
        },
      );
    },
) as ReturnType<typeof plugin.withOptions<Options>>; // TODO: Fix workaround once fixed upstream. See https://github.com/tailwindlabs/tailwindcss/issues/15844
