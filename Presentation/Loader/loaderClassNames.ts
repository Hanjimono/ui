import type { LoaderProps } from "./types"

export const loaderRootClassName = "inline-flex items-center justify-center"

export const loaderVariantClassNames = {
  default: "text-loader-primary",
  alternative: "text-loader-secondary",
  inherit: "text-inherit"
} as const satisfies Record<NonNullable<LoaderProps["variant"]>, string>

export const loaderSpinnerClassName =
  "size-full animate-loader-rotation motion-reduce:animate-none"

export const loaderPathClassName =
  "stroke-current [stroke-linecap:round] [stroke-dasharray:90,150] [stroke-dashoffset:0] stroke-[0.125rem] animate-loader-dash motion-reduce:animate-none"
