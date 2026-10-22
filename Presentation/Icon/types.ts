export type IconType = "md" | "fa" | "custom"

type FaIconType = "lg" | "2x" | "3x" | "4x" | "5x" | "fw"

interface BaseIconProps {
  /** Icon type */
  type: IconType
  /** Icon size in px */
  size?: number
  /** Extra CSS classes */
  className?: string
  /** aria-label for the icon */
  ariaLabel?: string
}

export interface MDIconProps extends BaseIconProps {
  /** Icon type */
  type: "md"
  /** Material icon name @see https://fonts.google.com/icons */
  name: string
}

export interface FAIconProps extends BaseIconProps {
  /** Icon type */
  type: "fa"
  /** Font Awesome icon name @see https://fontawesome.com/icons */
  name: string
  /** Font Awesome size subtype */
  faType?: FaIconType
  /** Font Awesome style */
  faStyle?: "solid" | "regular" | "brands"
}

export interface CustomIconProps extends BaseIconProps {
  /** Icon type */
  type: "custom"
  /** Image URL for a third-party icon */
  customIconLink: string
  /** alt text for the image */
  alt: string
  /** Third-party icon width in px */
  width?: number
  /** Third-party icon height in px */
  height?: number
}

/**
 * Component that covers all icon variants. Material and Font Awesome icons require `name`.
 * Custom icons require an image URL and size.
 */
export type IconProps = MDIconProps | FAIconProps | CustomIconProps

export type IconElement = HTMLSpanElement | HTMLElement | HTMLImageElement
