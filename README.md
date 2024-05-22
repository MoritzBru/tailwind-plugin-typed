# tailwind-plugin-typed

A plugin for [Tailwind CSS](https://github.com/tailwindcss/tailwindcss) to generate text typing animations.
This is heavily inspired by [Typed.js](https://github.com/mattboldt/typed.js) and [Typed.css](https://github.com/brandonmcconnell/typed.css)

## Installation

Install the package with your preferred package manager (e.g. `npm`)

```sh
npm i -D tailwind-plugin-typed
```

Add the plugin to your tailwind configuration (e.g. `tailwind.config.js`)

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  // ... other tailwind config
  plugins: [
    // ... other plugins
    require('tailwind-plugin-typed'),
  ],
}
```

## Options

This plugin exposes some optional options that can be passed in the tailwind configuration

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  // ... other tailwind config
  plugins: [
    // ... other plugins
    require('tailwind-plugin-typed')({
      delimiter: ';',
      typeLetterDuration: 0.1,
      pauseAfterWordDuration: 2,
      deleteLetterDuration: 0.05,
      pauseAfterDeletionDuration: 1,
    }),
  ],
}
```

| name                         | description                                           | default |
|------------------------------|-------------------------------------------------------|---------|
| `delimiter`                  | character on which strings are split                  | `;`     |
| `typeLetterDuration`         | duration in seconds for typing one single character   | `0.1`   |
| `pauseAfterWordDuration`     | pause in seconds after one whole string is typed      | `2`     |
| `deleteLetterDuration`       | duration in seconds for deleting one single character | `0.05`  |
| `pauseAfterDeletionDuration` | pause in seconds after one whole string is deleted    | `1`     |

## Usage

This plugin utilises [arbitrary values](https://tailwindcss.com/docs/adding-custom-styles#using-arbitrary-values) of Tailwind CSS on the `typed` class to generate a typing animation with CSS.

### one word

This generates an infite looping typing and deleting animation of one word.

```html
<p>Hello <span class="typed-[world]"></span></p>
```

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="/readme/one-word-dark.gif">
  <source media="(prefers-color-scheme: light)" srcset="/readme/one-word-light.gif">
  <img alt="one word typed" src="/readme/one-word-light.gif">
</picture>

### multiple words

This generates an infite looping typing and deleting animation of multiple words after one another. The default delimiter of strings is `;` but can be configured in the [plugin options](#options).

```html
<p>This is <span class="typed-[cool;awesome;superb;amazing]"></span></p>
```

<!-- TODO: add gif -->

### multiple sentences

One or multiple sentences can be typed as well. Just write an underscore `_` instead of a space as decribed in the [tailwind docs](https://tailwindcss.com/docs/adding-custom-styles#handling-whitespace).

```html
<p><span class="typed-[This_can_type_sentences.;And_then_delete_them…;…to_write_other_senteces.;That's_nice!]"></span></p>
```

<!-- TODO: add gif -->

### adjust the caret

There are utilities `typed-caret-color`, `typed-caret-width` and `typed-caret-space` to adjust the caret.

```html
<p>Caret <span class="typed-[color;width;space] typed-caret-color-emerald-400 dark:typed-caret-color-emerald-600 typed-caret-width-4 typed-caret-space-2"></span></p>
```

<!-- TODO: add gif -->

