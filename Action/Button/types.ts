import React, { MouseEventHandler } from "react"
import { IconProps } from "../../Presentation/Icon/types"

export type ThemeType = "primary" | "secondary" | "danger" | "success"

export type VariantType = "solid" | "outline" | "text" | "icon"

export type SizeType = "sm" | "md" | "lg"

export type ButtonShadow = "default" | "no-shadow"

export type ButtonElement = HTMLButtonElement | HTMLAnchorElement

/** Button component */
export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  children?: React.ReactNode
  /** Extra CSS classes */
  className?: string
  /** Button color theme (primary, secondary, danger, success) */
  theme?: ThemeType
  /** Button variant (solid fill, outline, text only, icon only) */
  variant?: VariantType
  /** Button size (sm, md, lg) */
  size?: SizeType
  /** Marks the button as disabled and removes click response */
  disabled?: boolean
  /** Click handler */
  onClick?: MouseEventHandler<HTMLElement>
  /** Controls button width
   * wide - full width on mobile and desktop
   * adaptive - full width on mobile, minimal on desktop
   * narrow - minimal width on mobile and desktop
   */
  width?: "wide" | "adaptive" | "narrow"
  /** Shows a loading animation on the button */
  isLoading?: boolean
  /** Link URL. When set, the button behaves like a normal link. */
  link?: string
  /** Target attribute for link buttons */
  target?: string
  /** Shadow mode. When omitted, comes from uiConfig.buttonShadow.
   * default - apply the standard shadow
   * no-shadow - no shadow
   */
  shadow?: ButtonShadow
  /** Name or object for the leading icon */
  icon?: IconProps | string
  /** Name or object for the trailing icon */
  endIcon?: IconProps | string
  /** Button type (button, submit, reset) */
  type?: "button" | "submit" | "reset"
  /** When true, stops click event propagation */
  isNotStopPropagation?: boolean
}

export type ConditionalButtonComponentProps =
  | React.ButtonHTMLAttributes<HTMLButtonElement>
  | React.AnchorHTMLAttributes<HTMLAnchorElement>
