import type { SizeType, ThemeType, VariantType } from "./types"

export const buttonBaseClassName =
  "inline-flex items-center justify-center relative border-none cursor-pointer no-underline select-none box-border w-fit font-action font-weight-action leading-action transition-[background-color,color,border-color,box-shadow] duration-200 ease-in-out focus-visible:outline-none focus-visible:outline-offset-2"

export const buttonDisabledClassName = "cursor-default opacity-60 pointer-events-none"

export const buttonWithIconClassName = "gap-action-icon-gap"

export const buttonWidthClassNames = {
  wide: "w-stretch",
  adaptive: "w-stretch md:w-fit",
  narrow: "w-fit"
} as const satisfies Record<"wide" | "adaptive" | "narrow", string>

export const buttonSizeClassNames = {
  sm: "text-action-mobile-sm lg:text-action-sm py-action-pad-sm-block px-action-pad-sm-inline rounded-action-sm",
  md: "text-action-mobile-md lg:text-action-md py-action-pad-md-block px-action-pad-md-inline rounded-action-md",
  lg: "text-action-mobile-lg lg:text-action-lg py-action-pad-lg-block px-action-pad-lg-inline rounded-action-lg"
} as const satisfies Record<SizeType, string>

/** Danger/success themes get an explicit border width (matches work-ui). */
export const buttonThemeBorderClassNames = {
  primary: "",
  secondary: "",
  danger: "border-solid border-action",
  success: "border-solid border-action"
} as const satisfies Record<ThemeType, string>

export const buttonVariantThemeClassNames = {
  solid: {
    primary:
      "bg-action-primary border-action-primary text-action-primary-text hover:bg-action-primary-hover hover:border-action-primary-hover",
    secondary:
      "bg-action-secondary border-action-secondary text-action-secondary-text hover:bg-action-secondary-hover hover:border-action-secondary-hover",
    danger:
      "bg-action-danger border-action-danger text-action-danger-text hover:bg-action-danger-hover hover:border-action-danger-hover",
    success:
      "bg-action-success border-action-success text-action-success-text hover:bg-action-success-hover hover:border-action-success-hover"
  },
  outline: {
    primary:
      "bg-transparent border-solid border-action text-action-primary border-action-primary hover:text-action-primary-hover",
    secondary:
      "bg-transparent border-solid border-action text-action-secondary border-action-secondary hover:text-action-secondary-hover",
    danger:
      "bg-transparent border-solid border-action text-action-danger border-action-danger hover:text-action-danger-hover",
    success:
      "bg-transparent border-solid border-action text-action-success border-action-success hover:text-action-success-hover"
  },
  text: {
    primary: "bg-transparent border-transparent text-action-primary-text hover:opacity-70",
    secondary: "bg-transparent border-transparent text-action-secondary-text hover:opacity-70",
    danger: "bg-transparent border-transparent text-action-danger-text hover:opacity-70",
    success: "bg-transparent border-transparent text-action-success-text hover:opacity-70"
  },
  icon: {
    primary: "bg-transparent p-0 border-none text-action-primary",
    secondary: "bg-transparent p-0 border-none text-action-secondary",
    danger: "bg-transparent p-0 border-none text-action-danger",
    success: "bg-transparent p-0 border-none text-action-success"
  }
} as const satisfies Record<VariantType, Record<ThemeType, string>>

export const buttonShadowClassNames = {
  primary:
    "shadow-[var(--color-action-primary-shadow)_var(--spacing-action-shadow-x)_var(--spacing-action-shadow-y)_var(--spacing-action-shadow-blur)]",
  secondary:
    "shadow-[var(--color-action-secondary-shadow)_var(--spacing-action-shadow-x)_var(--spacing-action-shadow-y)_var(--spacing-action-shadow-blur)]",
  danger:
    "shadow-[var(--color-action-danger-shadow)_var(--spacing-action-shadow-x)_var(--spacing-action-shadow-y)_var(--spacing-action-shadow-blur)]",
  success:
    "shadow-[var(--color-action-success-shadow)_var(--spacing-action-shadow-x)_var(--spacing-action-shadow-y)_var(--spacing-action-shadow-blur)]"
} as const satisfies Record<ThemeType, string>

export const buttonOverlayLoaderClassName =
  "absolute inset-0 flex items-center justify-center"

export const buttonIconClassName = "inline-flex"
export const buttonLoaderClassName = "inline-flex"
