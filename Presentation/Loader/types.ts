/** Allowed preset sizes for the loader */
export type LoaderSize = "xs" | "sm" | "md" | "lg" | "xl"

/** Loader component props */
export interface LoaderProps {
  /** Loader size */
  size?: LoaderSize | number
  /** Loader color variant */
  variant?: "default" | "alternative" | "inherit"
  /** Extra CSS class for the loader */
  className?: string
  /** Accessible label for screen readers */
  label?: string
}
