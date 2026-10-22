import React from "react"
import { cn } from "../../Utils/cn"
import { MDIconProps } from "./types"

/**
 * Renders a Material Design icon.
 *
 * @param {string} name - Material Design icon name @see https://fonts.google.com/icons
 * @param {number} [size] - Icon size in px
 * @param {string} [className] - Extra CSS classes for the icon
 * @param {string} [ariaLabel] - aria-label for the icon
 */
const MdIcon = React.forwardRef<HTMLSpanElement, MDIconProps>(function MdIcon(
  { name, size, className, ariaLabel },
  ref
) {
  // Until the icon font loads, the span holds the ligature name (e.g. "density_medium").
  // Cap the box at 1em so the span does not expand before the font is ready.
  return (
    <span
      ref={ref}
      className={cn(
        "material-symbols-rounded inline-block size-[1em] shrink-0 overflow-hidden leading-none align-middle",
        className
      )}
      style={{ fontSize: size ?? "inherit" }}
      aria-label={ariaLabel}
      aria-hidden={!ariaLabel}
    >
      {name}
    </span>
  )
})

export default MdIcon
