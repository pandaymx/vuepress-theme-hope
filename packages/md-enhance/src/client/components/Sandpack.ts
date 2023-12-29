import { useMutationObserver } from "@vueuse/core";
import type { Sandpack, SandpackPredefinedTemplate } from "sandpack-vue3";
import type { VNode } from "vue";
import { computed, defineComponent, h, onMounted, ref, shallowRef } from "vue";
import { LoadingIcon, deepAssign } from "vuepress-shared/client";

import { useSandpackConfig } from "../helpers/index.js";
import {
  getSandpackCustomSetup,
  getSandpackFiles,
  getSandpackOptions,
} from "../utils/index.js";

import "../styles/sandpack.scss";

export default defineComponent({
  name: "SandPack",

  props: {
    /**
     * Sandpack title
     *
     * 演示标题
     */
    title: {
      type: String,
      default: "",
    },

    /**
     * Sandpack template
     *
     * 演示工程模板
     */
    template: {
      type: String,
      default: null,
    },

    /**
     * Sandpack file data
     *
     * 演示文件数据
     */
    files: { type: String, required: true },

    /**
     * Sandpack options
     *
     * 演示设置
     */
    options: { type: String, default: "{}" },

    /**
     * Sandpack customSetup
     *
     * 自定义设置
     */
    customSetup: { type: String, default: "{}" },

    /**
     * RTL layout
     *
     * RTL 布局
     */
    rtl: { type: Boolean },

    /**
     * Theme
     *
     * 主题
     */
    theme: {
      type: String,
      default: null,
    },
  },

  setup(props) {
    const sandpackConfig = useSandpackConfig();
    const loading = ref(true);
    const component = shallowRef<typeof Sandpack>();

    const template = computed(() =>
      <SandpackPredefinedTemplate>props.template
        ? props.template
        : sandpackConfig.template,
    );

    const sandpackOptions = computed(() =>
      deepAssign({}, sandpackConfig.options, getSandpackOptions(props.options)),
    );

    const sandpackCustomSetup = computed(() =>
      deepAssign(
        {},
        sandpackConfig.customSetup,
        getSandpackCustomSetup(props.customSetup),
      ),
    );

    const setupSandpack = async (): Promise<void> => {
      const { Sandpack } = await import(
        /* webpackChunkName: "sandpack-vue3" */ "sandpack-vue3"
      );

      component.value = Sandpack;
    };

    const theme = ref(props.theme);
    const isDarkmode = ref(false);

    onMounted(async () => {
      await setupSandpack();
      loading.value = false;

      const html = document.documentElement;

      const getDarkmodeStatus = (): boolean =>
        html.classList.contains("dark") ||
        html.getAttribute("data-theme") === "dark";

      isDarkmode.value = getDarkmodeStatus();

      // watch darkmode change
      useMutationObserver(
        html,
        () => {
          isDarkmode.value = getDarkmodeStatus();
        },
        {
          attributeFilter: ["class", "data-theme"],
          attributes: true,
        },
      );
    });

    return (): (VNode | null)[] => [
      h("div", { class: "sandpack-wrapper" }, [
        props.title
          ? h("div", { class: "header" }, decodeURIComponent(props.title))
          : null,
        h(
          "div",
          {
            class: "sandpack-container",
          },
          [
            loading.value
              ? h(LoadingIcon, { class: "preview-loading", height: 192 })
              : null,
            component.value
              ? // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                h(component.value, {
                  template: template.value,
                  files: getSandpackFiles(props.files),
                  options: {
                    ...sandpackOptions.value,
                  },
                  customSetup: {
                    ...sandpackCustomSetup.value,
                  },
                  rtl: props.rtl,
                  theme: theme.value
                    ? theme.value
                    : isDarkmode.value
                      ? "dark"
                      : "light",
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                } as any)
              : null,
          ],
        ),
      ]),
    ];
  },
});
