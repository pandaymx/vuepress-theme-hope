---
title: Sandpack Playground
icon: code
category:
  - Markdown
tag:
  - Markdown
  - Playground
---

The plugin provides you sandpack playground support with `sandpack-vue3` package.

<!-- more -->

::: tip

You should only use this if you are heavily depending on interactive Sandpack Playground.

:::

## Settings

Install `sandpack-vue3` in your project:

::: code-tabs#shell

@tab pnpm

```bash
pnpm add -D sandpack-vue3
```

@tab yarn

```bash
yarn add -D sandpack-vue3
```

@tab npm

```bash
npm i -D sandpack-vue3
```

:::

Then enabling via:

::: code-tabs#config

@tab TS

```ts {10}
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        // enable sandpack playground
        sandpack: true,
      },
    },
  }),
});
```

@tab JS

```js {9}
// .vuepress/config.js
import { mdEnhance } from "vuepress-plugin-md-enhance";

export default {
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        // enable sandpack playground
        sandpack: true,
      },
    },
  }),
};
```

:::

## Usage

To use sandpack playground, you should use a container named `sandpack#template`.

In it, you can use 3 directives:

- `@file FullPathFile` then a code block to add files, you can also set the file options, for example: `@file FullPathFile {active readOnly hidden}`
- `@options` then a javascript block to customize "options"
- `@setup` then a javascript block to customize "customSetup"

You can see the below demos to see more details.

You can import and call `defineSandpackConfig` in client config file to customize `sandpack-vue3`:

```ts
// .vuepress/client.ts
import { defineClientConfig } from "@vuepress/client";
import { defineSandpackConfig } from "vuepress-plugin-md-enhance/client";

defineSandpackConfig({
  // sandpack config here
});

export default defineClientConfig({
  // ...
});
```

## Demo

:::: md-demo Vue Demo

::: sandpack#vue Vue Demo

@file /src/App.vue

```vue
<script setup>
import { ref } from "vue";

const msg = ref("Hello Playground!");
</script>

<template>
  <h1>{{ msg }}</h1>
  <input v-model="msg" />
</template>
```

:::

::::

:::: md-demo Vue Demo with customized settings

::: sandpack#vue Vue Demo with customized settings

@file /src/App.vue

```vue
<script setup>
import { ref } from "vue";
import Comp from "./Comp.vue";

const msg = ref("Hello Playground!");
</script>

<template>
  <h1>{{ msg }}</h1>
  <input v-model="msg" />
  <Comp />
</template>
```

@file /src/Comp.vue

```vue
<script setup>
import { useBattery } from "@vueuse/core";
import { ref } from "vue";

const { charging, level } = useBattery();
</script>

<template>
  <h1>Battery status</h1>
  <p>Charging: {{ charging }}</p>
  <p>Level: {{ level * 100 }}%</p>
</template>
```

@options

```js
{
  activeFile: "/src/Comp.vue",
}
```

@setup

```js
{
  dependencies: {
    "@vueuse/core": "latest",
    "@vueuse/shared": "latest",
    "vue-demi": "latest",
  }
}
```

:::

::::

:::: md-demo Vue Demo with file options

::: sandpack#vue Vue Demo with file options

@file /src/App.vue {readOnly}

```vue
<script setup>
import { ref } from "vue";
import Comp from "./Comp.vue";

const msg = ref("Hello Playground!");
</script>

<template>
  <h1>{{ msg }}</h1>
  <input v-model="msg" />
  <Comp />
</template>
```

@file /src/Comp.vue {active}

```vue
<script setup>
import { useBattery } from "@vueuse/core";
import { ref } from "vue";

const { charging, level } = useBattery();
</script>

<template>
  <h1>Battery status</h1>
  <p>Charging: {{ charging }}</p>
  <p>Level: {{ level * 100 }}%</p>
</template>
```

@setup

```js
{
  dependencies: {
    "@vueuse/core": "latest",
    "@vueuse/shared": "latest",
    "vue-demi": "latest",
  }
}
```

:::

::::

:::: md-demo React demo

::: sandpack#react React demo {rtl theme=dark}

@file /App.js

```js
export default function App() {
  return <h1>Hello world</h1>;
}
```

:::

::::