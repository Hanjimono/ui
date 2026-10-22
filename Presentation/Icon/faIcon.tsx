import React from "react"
import { cn } from "../../Utils/cn"
import { FAIconProps } from "./types"

/**
 * Renders a Font Awesome icon.
 *
 * @param {string} name - Font Awesome icon name @see https://fontawesome.com/icons
 * @param {number} [size] - Icon size in px
 * @param {string} [faStyle="solid"] - Icon style (defaults to solid)
 * @param {string} [faType] - Font Awesome size type (for example, "lg", "2x", "3x", "4x", "5x", "fw")
 * @param {string} [ariaLabel] - aria-label for the icon
 * @param {string} [className] - Extra CSS classes for the icon
 */
const FaIcon = React.forwardRef<HTMLElement, FAIconProps>(function FaIcon(
  { name, size, faStyle = "solid", faType, ariaLabel, className },
  ref
) {
  const classes = cn("fa", `fa-${faStyle}`, `fa-${name}`, faType && `fa-${faType}`, className)

  return (
    <i
      ref={ref}
      className={classes}
      style={{ fontSize: size ?? "inherit" }}
      aria-label={ariaLabel}
      aria-hidden={!ariaLabel}
    />
  )
})

export default FaIcon
