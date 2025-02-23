# tailwind-plugin-typed

[![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/moritzbru/tailwind-plugin-typed/npm-publish.yml?style=flat-square&logo=github&label=pipeline)](https://github.com/MoritzBru/tailwind-plugin-typed/actions/workflows/npm-publish.yml)
[![GitHub Tag](https://img.shields.io/github/v/tag/moritzbru/tailwind-plugin-typed?style=flat-square&logo=github)](https://github.com/MoritzBru/tailwind-plugin-typed/releases)
[![NPM Version](https://img.shields.io/npm/v/tailwind-plugin-typed?style=flat-square&logo=npm)](https://www.npmjs.com/package/tailwind-plugin-typed)
[![Tailwind Play](https://img.shields.io/badge/tailwind_play-v3_demo-%2338bdf8?style=flat-square&logo=tailwindcss)](https://play.tailwindcss.com/PiCmGMfkag)
[![Tailwind Play](https://img.shields.io/badge/tailwind_play-v4_demo-%2338bdf8?style=flat-square&logo=tailwindcss)](https://play.tailwindcss.com/8DsYJjZUKJ)

A plugin for [Tailwind CSS](https://github.com/tailwindcss/tailwindcss) to generate text typing animations.

## Live Demo

See it in action in the Tailwind Playground for [Tailwind CSS v3.x](https://play.tailwindcss.com/PiCmGMfkag) and for [Tailwind CSS v4.x](https://play.tailwindcss.com/8DsYJjZUKJ)

## 📦 Installation

Install the package with your preferred package manager (e.g. `npm`)

```sh
npm i -D tailwind-plugin-typed
```

## 🔧 Configuration

### For Tailwind CSS v3.x

Add the plugin to your [configuration](https://v3.tailwindcss.com/docs/configuration)

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  // ... other tailwind config
  plugins: [
    require('tailwind-plugin-typed'),
    // ... other plugins
  ],
}
```

### For Tailwind CSS v4.x

Add the plugin to your CSS via the [`@plugin` directive](https://tailwindcss.com/docs/functions-and-directives#plugin-directive)

```css
@import "tailwindcss";
@plugin "tailwind-plugin-typed";
```

## ⚙️ Options

This plugin exposes some optional options that can be passed in the tailwind configuration

| name                         | description                                           | default |
|------------------------------|-------------------------------------------------------|---------|
| `delimiter`                  | character on which strings are split                  | `;`     |
| `typeLetterDuration`         | duration in seconds for typing one single character   | `0.1`   |
| `pauseAfterWordDuration`     | pause in seconds after one whole string is typed      | `2`     |
| `deleteLetterDuration`       | duration in seconds for deleting one single character | `0.05`  |
| `pauseAfterDeletionDuration` | pause in seconds after one whole string is deleted    | `1`     |

### Exmaple for Tailwind CSS v3.x

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

### Example for Tailwind CSS v4.x

```css
@import "tailwindcss";
@plugin "tailwind-plugin-typed" {
  delimiter: ';',
  typeLetterDuration: 0.1,
  pauseAfterWordDuration: 2,
  deleteLetterDuration: 0.05,
  pauseAfterDeletionDuration: 1,
}
```


## 💻 Usage

This plugin utilises [arbitrary values](https://tailwindcss.com/docs/adding-custom-styles#using-arbitrary-values) of Tailwind CSS on the base class `typed` to generate a typing animation with CSS.

### caret

This generates a blinking caret in an `::after` pseudo element.

```html
<p class="typed-caret">Typed</p>
```

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="/.github/assets/caret-dark.gif">
  <source media="(prefers-color-scheme: light)" srcset="/.github/assets/caret-light.gif">
  <img alt="caret typed" src="/.github/assets/caret-light.gif">
</picture>

### single string

This generates an infite looping typing and deleting animation of the string _world_.

```html
<p>Hello <span class="typed-[world] typed-caret"></span></p>
```

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="/.github/assets/single-dark.gif">
  <source media="(prefers-color-scheme: light)" srcset="/.github/assets/single-light.gif">
  <img alt="one string typed" src="/.github/assets/single-light.gif">
</picture>

### multiple strings

This generates a typing and deleting animation of multiple words one after another. The default delimiter of strings is `;` but can be configured in the [plugin options](#-options).

```html
<p>This is <span class="typed-[cool;awesome;superb] typed-caret"></span></p>
```

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="/.github/assets/multiple-dark.gif">
  <source media="(prefers-color-scheme: light)" srcset="/.github/assets/multiple-light.gif">
  <img alt="multiple strings typed" src="/.github/assets/multiple-light.gif">
</picture>

### sentences

One or multiple sentences can be typed as well. Just write an underscore `_` instead of a space as decribed in the [tailwind docs](https://tailwindcss.com/docs/adding-custom-styles#handling-whitespace).

```html
<p class="typed-[This_can_type_sentences.;And_then_delete_them…] typed-caret"></p>
```

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="/.github/assets/sentence-dark.gif">
  <source media="(prefers-color-scheme: light)" srcset="/.github/assets/sentence-light.gif">
  <img alt="senteces typed" src="/.github/assets/sentence-light.gif">
</picture>

### adjust the caret

There are utilities `typed-caret-color`, `typed-caret-width` and `typed-caret-space` to adjust the caret.

```html
<p>Caret <span class="typed-[color;width;space] typed-caret typed-caret-color-emerald-400 dark:typed-caret-color-emerald-600 typed-caret-width-4 typed-caret-space-2"></span></p>
```

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="/.github/assets/caret-adjustment-dark.gif">
  <source media="(prefers-color-scheme: light)" srcset="/.github/assets/caret-adjustment-light.gif">
  <img alt="adjusted caret typed" src="/.github/assets/caret-adjustment-light.gif">
</picture>

### escaping the delimiter and special chars

The delimiter can be escaped with a backslash `\` in front of it. Then it will be typed out normally.
If other [reserved characters](https://tailwindcss.com/docs/adding-custom-styles#resolving-ambiguities) (e.g. colon `:`) should be typed, the whole arbitrary value can be wrapped in backticks `` ` `` which will be removed automatically

```html
<p class="typed-[`semi:_true\;;semi:_false\;`] typed-caret"></p>
```

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="/.github/assets/escape-special-dark.gif">
  <source media="(prefers-color-scheme: light)" srcset="/.github/assets/escape-special-light.gif">
  <img alt="escaped special chars typed" src="/.github/assets/escape-special-light.gif">
</picture>

## ♿️ Notes on a11y

This plugin adds [alternative text to the `content`](https://developer.mozilla.org/en-US/docs/Web/CSS/content#alternative_text) of the pseudo element upon typing so that screen readers can _hopefully_ read the whole text that is being typed at all times and are not affected by the animation.

Tailwind itself provides modfiers to adjust for the [users preference regarding `reduced motion`](https://tailwindcss.com/docs/hover-focus-and-other-states#prefers-reduced-motion).

This example will render a typing animation of the string _no preference_ in case the user does not specify a preferences for reduced motion. In case the users preferes to have an experience with reduced motion the static text _reduce_ will be rendered.

```html
<p>
  prefers-reduced-motion:
  <span class="motion-safe:typed-[no_preference] motion-safe:typed-caret"></span>
  <span class="motion-safe:hidden">reduce</span>
</p>
```

## 💕 Thanks

This project is heavily inspired by other awesome projects like:

- [Typed.js](https://github.com/mattboldt/typed.js)
- [Typed.css](https://github.com/brandonmcconnell/typed.css)
