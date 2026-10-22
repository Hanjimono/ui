import { cn } from "../../Utils/cn"
import { LoaderProps } from "./types"
import { calculatedSizeSettings } from "./settings"
import {
  loaderPathClassName,
  loaderRootClassName,
  loaderSpinnerClassName,
  loaderVariantClassNames
} from "./loaderClassNames"

/**
 * Loader shows a loading indicator with configurable size and color.
 *
 * @param {string | number} [size="sm"] - Loader size. Preset string ("sm", "md", "lg") or a number in pixels.
 * @param {string} [variant="default"] - Loader variant: "default", "alternative", or "inherit" (parent text color).
 * @param {string} [className] - Extra CSS class for the loader.
 * @param {string} [label="Loading"] - Accessible label for screen readers.
 */
function Loader({ size = "sm", variant = "default", className, label = "Loading" }: LoaderProps) {
  let resolvedSize: string
  if (typeof size === "number") {
    resolvedSize = `${size}px`
  } else {
    resolvedSize = calculatedSizeSettings[size]
  }

  return (
    <span
      className={cn(loaderRootClassName, loaderVariantClassNames[variant], className)}
      style={{ width: resolvedSize, height: resolvedSize }}
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <svg className={loaderSpinnerClassName} viewBox="0 0 50 50" aria-hidden="true">
        <circle className={loaderPathClassName} cx="25" cy="25" r="20" fill="none" strokeWidth="4" />
      </svg>
    </span>
  )
}

export default Loader
