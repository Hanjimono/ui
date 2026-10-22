import React from "react"
import MdIcon from "./mdIcon"
import FaIcon from "./faIcon"
import CustomIcon from "./customIcon"
import { IconElement, IconProps } from "./types"

/**
 * Icon renders different icon kinds based on the given props.
 * Supports Material Design, Font Awesome, and custom image icons.
 * Custom icons need an image URL and a size.
 * For FA and MD, make sure the matching fonts are loaded in the project.
 * If size is omitted for font icons, the parent element's size is used.
 * Custom icons are expected to set size manually; default is 20px.
 *
 * @param {string} type - Icon type ("md", "fa", or "custom")
 * @param {string} [className] - Extra CSS classes for the icon
 * @param {string} [name] - Icon name (for "md" and "fa")
 * @param {number} [size] - Icon size in px
 * @param {string} [faType] - Font Awesome size type (for example, "lg", "2x", "3x", "4x", "5x", "fw")
 * @param {string} [faStyle] - Font Awesome style (for example, "solid", "regular", "brands")
 * @param {string} [customIconLink] - Custom icon URL (for "custom")
 * @param {string} [alt] - Alternative text for a custom icon (for "custom")
 * @param {string} [ariaLabel] - aria-label for the icon
 * @param {number} [width] - Custom icon width (for "custom")
 * @param {number} [height] - Custom icon height (for "custom")
 */
const Icon = React.forwardRef<IconElement, IconProps>(function Icon(props, ref) {
  switch (props.type) {
    case "md":
      return <MdIcon ref={ref as React.Ref<HTMLSpanElement>} {...props} />
    case "fa":
      return <FaIcon ref={ref as React.Ref<HTMLElement>} {...props} />
    case "custom":
      return <CustomIcon ref={ref as React.Ref<HTMLImageElement>} {...props} />
  }
})

export default Icon
