import type { InputVariant } from "./types"

export const inputRootClassName =
  "relative flex items-center w-full min-h-form-mobile-height max-h-form-mobile-height h-form-mobile-height gap-form-mobile-input-gap py-form-mobile-pad-block px-form-mobile-pad-inline box-border bg-form-bg text-form-text rounded-form font-form-element font-weight-form-element text-form-mobile lg:text-form lg:py-form-pad-block lg:px-form-pad-inline lg:h-form-height lg:min-h-form-height lg:max-h-form-height lg:gap-form-input-gap"

export const inputFocusedClassName = "border-form-border-focused"

export const inputErroredClassName = "border-form-border-errored"

export const inputVariantClassNames = {
  floating: "",
  simple: "border-form border-solid border-form-border",
  underlined: "border-b-form border-solid border-form-border rounded-none border-t-0 border-x-0"
} as const satisfies Record<InputVariant, string>

/** Focused / errored border overrides for underlined variant */
export const inputUnderlinedFocusedClassName = "border-b-form-border-focused"
export const inputUnderlinedErroredClassName = "border-b-form-border-errored"

/** Focused / errored border overrides for simple variant */
export const inputSimpleFocusedClassName = "border-form-border-focused"
export const inputSimpleErroredClassName = "border-form-border-errored"

export const inputBlockedClassName = "pointer-events-none"

export const inputDisabledClassName =
  "bg-form-bg-disabled opacity-80 text-form-placeholder"

export const inputElementClassName =
  "flex-auto min-w-0 h-full bg-transparent border-none outline-none text-inherit text-ellipsis p-0 font-inherit font-weight-inherit text-[length:inherit] placeholder:text-form-placeholder placeholder:select-none"

export const inputNoShrinkClassName = "shrink-0"

export const inputIconErrorClassName = "text-form-border-errored"

export const inputClearButtonClassName = "p-0 text-inherit shrink-0"

export const inputFloatingLabelClassName =
  "absolute top-1/2 left-[1.125em] max-w-[calc(100%-1.75em)] pointer-events-none origin-top-left -translate-y-1/2 overflow-hidden whitespace-nowrap text-ellipsis text-form-placeholder transition-all duration-200 ease-out"

export const inputFloatingLabelUpClassName =
  "top-0 -translate-y-1/2 scale-75 text-form-text"

export const inputFloatingLabelWithIconClassName = "left-[2.5em]"

export const inputFloatingLabelErrorClassName = "text-form-border-errored"

export const inputFloatingFieldsetClassName =
  "absolute inset-0 pointer-events-none overflow-hidden px-[0.75em] border-form border-solid border-form-border rounded-form box-border"

export const inputFloatingFieldsetActiveClassName = "border-form-border-focused"

export const inputFloatingFieldsetErrorClassName = "border-form-border-errored"

export const inputFloatingLegendClassName =
  "invisible h-0 max-w-[0.001rem] overflow-hidden transition-[max-width] duration-200 ease-out p-0"

export const inputFloatingLegendVisibleClassName =
  "max-w-full [&_.floating-legend-text]:inline-block [&_.floating-legend-text]:px-[0.25em] [&_.floating-legend-text]:text-[0.75em] [&_.floating-legend-text]:opacity-0"

export const inputFloatingLegendTextClassName = "floating-legend-text"
