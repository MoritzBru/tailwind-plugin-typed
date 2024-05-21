import plugin from 'tailwindcss/plugin';
import { arraySum, simpleHash } from './utils/utils';
import { CSSRuleObject } from 'tailwindcss/types/config';

export type Options = {
  delimiter?: string;
  typeLetterDuration?: number;
  pauseAfterWordDuration?: number;
  deleteLetterDuration?: number;
  pauseAfterDeletionDuration?: number;
};

const defaultOptions = {
  delimiter: ';',
  typeLetterDuration: 0.1,
  pauseAfterWordDuration: 2,
  deleteLetterDuration: 0.08,
  pauseAfterDeletionDuration: 1,
};

export default plugin.withOptions<Options>(
  (options) =>
    ({ matchComponents }) => {
      const optionsWithDefaults = Object.assign(defaultOptions, options);

      matchComponents(
        {
          typed: (text) => {
            const hash = simpleHash(text);
            // TODO: escape delimiter!
            // eslint-disable-next-line no-useless-escape
            // const strings = text.split(new RegExp(`(?<!\\)${optionsWithDefaults.delimiter}`, 'gu')).map((string) => string.replaceAll(`\\${optionsWithDefaults.delimiter}`, optionsWithDefaults.delimiter));
            const strings = text.split(optionsWithDefaults.delimiter);
            const durations = strings.map((string) => string.length * (optionsWithDefaults.typeLetterDuration + optionsWithDefaults.deleteLetterDuration) + optionsWithDefaults.pauseAfterWordDuration + optionsWithDefaults.pauseAfterDeletionDuration);
            const durationsCummulative = durations.map((_dur, durIdx) => arraySum(durations.slice(0, durIdx + 1)));
            const duration = arraySum(durations);

            function getTypingKeyframeStep() {
              const keyframes: [string, CSSRuleObject][] = [];
              strings.forEach((string, stringIdx) => {
                [...string].forEach((_char, charIdx) => {
                  const isLastString = stringIdx + 1 === strings.length;
                  const isLastChar = charIdx + 1 === string.length;

                  const durationType = (durationsCummulative[stringIdx - 1] || 0) + (charIdx * optionsWithDefaults.typeLetterDuration);
                  const durationDelete = (durationsCummulative[stringIdx - 1] || 0) + (string.length * optionsWithDefaults.typeLetterDuration) + optionsWithDefaults.pauseAfterWordDuration + ((string.length - charIdx) * optionsWithDefaults.deleteLetterDuration);
                  const keyframe: [string, CSSRuleObject] = [`${durationType / duration * 100}%, ${durationDelete / duration * 100}%`, { content: `"${string.slice(0, charIdx + 1)}"` }];
                  keyframes.push(keyframe);

                  // insert pause after last char of string
                  if (isLastChar) {
                    const durationType = durationsCummulative[stringIdx] - optionsWithDefaults.pauseAfterDeletionDuration + optionsWithDefaults.typeLetterDuration;
                    const offsetTrick = -(Number(!isLastString) * 0.0001);
                    const durationDelete = durationsCummulative[stringIdx] + offsetTrick;
                    const pauseKeyframe: [string, CSSRuleObject] = [`${durationType / duration * 100}%, ${durationDelete / duration * 100}%`, { content: '""' }];
                    keyframes.push(pauseKeyframe);
                  }
                });
              });
              return Object.fromEntries(keyframes);
            }

            return {
              '--tw-typed-caret-color': 'currentcolor',
              '--tw-typed-caret-width': '0.2ch',
              '--tw-typed-caret-space': '0.2ch',
              '--tw-typed-caret-duration': '1s',
              '--tw-typed-caret-delay': '0s',
              '--tw-typed-typing-duration': `${duration}s`,

              // caret
              '&::after': {
                content: '"\u200B"',
                paddingRight: 'var(--tw-typed-caret-space)',
                borderRight: 'var(--tw-typed-caret-width) solid var(--tw-typed-caret-color)',
                animation: 'tw-typed-caret var(--tw-typed-caret-duration) linear var(--tw-typed-caret-delay) infinite forwards',
              },

              // caret keyframes
              '@keyframes tw-typed-caret': {
                '0%, 20%, 80%, 100%': { opacity: '1' },
                '30%, 70%': { opacity: '0' },
              },

              // typing
              '&::before': {
                content: `"${strings.join(optionsWithDefaults.delimiter)}"`,
                whiteSpace: 'break-spaces',
                willChange: 'content',
                animation: `tw-typed-typing-${hash} var(--tw-typed-typing-duration) linear infinite forwards`,
              },

              // typing keyframes
              [`@keyframes tw-typed-typing-${hash}`]: {
                ...getTypingKeyframeStep(),
              },
            } as CSSRuleObject;
          },
        },
      );
    },
);
