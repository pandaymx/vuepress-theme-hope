---
home: true
title: Home
icon: home
heroText: vuepress-plugin-append-date
tagline: Append date info from git to frontmatter

footer: Theme by <a href="https://theme-hope.vuejs.press" target="_blank">VuePress Theme Hope</a> | MIT Licensed, Copyright © 2019-present Mr.Hope

copyright: false
---

::: warning

This plugin requires `@vuepress/plugin-git` to work.

:::

## How to use

### Install

::: code-tabs#shell

@tab pnpm

```bash
pnpm add -D vuepress-plugin-append-date
```

@tab yarn

```bash
yarn add -D vuepress-plugin-append-date
```

@tab npm

```bash
npm i -D vuepress-plugin-append-date
```

:::

### Usage

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { appendDatePlugin } from "vuepress-plugin-append-date";

export default {
  plugins: [
    appendDatePlugin({
      // your options
    }),
  ],
};
```

@tab JS

```js
// .vuepress/config.js
import { appendDatePlugin } from "vuepress-plugin-append-date";

export default {
  plugins: [
    appendDatePlugin({
      // your options
    }),
  ],
};
```

:::

## Plugin Options

### key

- Type: `string`
- Default: `"date"`

Frontmatter key.

### format

- Type: `"date" | "time" | "full"`
- Default: `"date"`

Format of the date.
