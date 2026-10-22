import React from "react"
import { CustomIconProps } from "./types"

/**
 * Renders a third-party icon image.
 * If width and height are omitted, `size` is used (defaults to 20px).
 *
 * @param {string} customIconLink - Image URL for a third-party icon
 * @param {string} alt - Alternative text for the image
 * @param {number} [size=20] - Icon size (defaults to 20)
 * @param {number} [width] - Third-party icon width in px
 * @param {number} [height] - Third-party icon height in px
 * @param {string} [ariaLabel] - aria-label for the icon
 * @param {string} [className] - Extra CSS classes for the icon
 */
const CustomIcon = React.forwardRef<HTMLImageElement, CustomIconProps>(function CustomIcon(
  { customIconLink, alt, size = 20, width, height, ariaLabel, className },
  ref
) {
  const resolvedWidth = width ?? height ?? size
  const resolvedHeight = height ?? width ?? size

  return (
    <img
      ref={ref}
      src={customIconLink}
      alt={alt}
      width={resolvedWidth}
      height={resolvedHeight}
      className={className}
      aria-label={ariaLabel}
      aria-hidden={!ariaLabel}
    />
  )
})

export default CustomIcon
