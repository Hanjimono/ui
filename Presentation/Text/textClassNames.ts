import { TextPrimitiveColor, TextPropSize, TextPropType } from "./types"

export const textBaseClassName = "font-text leading-text"

export const sizeClassNames = {
  inherit: "[font-size:inherit]",
  "2xs": "text-ui-mobile-2xs lg:text-ui-2xs",
  xs: "text-ui-mobile-xs lg:text-ui-xs",
  s: "text-ui-mobile-s lg:text-ui-s",
  m: "text-ui-mobile-m lg:text-ui-m",
  l: "text-ui-mobile-l lg:text-ui-l",
  xl: "text-ui-mobile-xl lg:text-ui-xl",
  "2xl": "text-ui-mobile-2xl lg:text-ui-2xl",
  "3xl": "text-ui-mobile-3xl lg:text-ui-3xl"
} as const satisfies Record<TextPropSize, string>

export const colorClassNames = {
  default: "text-text-default",
  primary: "text-text-primary",
  secondary: "text-text-secondary",
  success: "text-text-success",
  danger: "text-text-danger"
} as const satisfies Record<Exclude<TextPrimitiveColor, "none">, string>

export const typeClassNames = {
  plain: undefined,
  truncate: "truncate",
  clamp: "overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-box-orient:vertical]"
} as const satisfies Record<TextPropType, string | undefined>
