import type { LocaleConfig } from "@vuepress/core";

import type {
  DisableCommentOptions,
  GiscusOptions,
  TwikooOptions,
  WalineLocaleData,
  WalineOptions,
} from "../shared/index.js";

export interface GiscusPluginOptions extends Partial<GiscusOptions> {
  provider: "Giscus";
}

export interface TwikooPluginOptions extends Partial<TwikooOptions> {
  provider: "Twikoo";
}

export interface WalinePluginOptions
  extends Omit<
    Partial<WalineOptions>,
    "search" | "highlighter" | "imageUploader" | "texRenderer"
  > {
  provider: "Waline";

  /**
   * Whether import meta icons
   *
   * 是否导入 Meta 图标
   *
   * @default true
   */
  metaIcon?: boolean;

  /**
   * Locale config for waline
   */
  locales?: LocaleConfig<WalineLocaleData>;
}

/**
 * 评论选项
 *
 * Comment options
 */
export type CommentPluginOptions =
  | GiscusPluginOptions
  | TwikooPluginOptions
  | WalinePluginOptions
  | DisableCommentOptions;
