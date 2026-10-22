import type { InputVariant } from "../Input/types"

export const textareaRootClassName =
  "relative flex items-center w-full min-h-form-mobile-height gap-form-mobile-input-gap py-form-mobile-pad-block px-form-mobile-pad-inline box-border bg-form-bg text-form-text rounded-form font-form-element font-weight-form-element text-form-mobile lg:text-form lg:py-form-pad-block lg:px-form-pad-inline lg:min-h-form-height lg:gap-form-input-gap"

export const textareaVariantClassNames = {
  floating: "",
  simple: "border-form border-solid border-form-border",
  underlined: "border-b-form border-solid border-form-border rounded-none border-t-0 border-x-0"
} as const satisfies Record<InputVariant, string>

export const textareaFocusedClassName = "border-form-border-focused"
export const textareaErroredClassName = "border-form-border-errored"
export const textareaUnderlinedFocusedClassName = "border-b-form-border-focused"
export const textareaUnderlinedErroredClassName = "border-b-form-border-errored"
export const textareaSimpleFocusedClassName = "border-form-border-focused"
export const textareaSimpleErroredClassName = "border-form-border-errored"

export const textareaBlockedClassName = "pointer-events-none"

export const textareaDisabledClassName =
  "bg-form-bg-disabled opacity-80 text-form-placeholder"

export const textareaElementClassName =
  "flex-auto w-full min-w-0 bg-transparent border-none outline-none text-inherit p-0 m-0 resize-y font-inherit font-weight-inherit text-[length:inherit] leading-[1.2] placeholder:text-form-placeholder placeholder:select-none"

export const textareaAutoResizeClassName = "resize-none overflow-hidden"
