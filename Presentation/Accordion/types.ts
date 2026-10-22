import type { ReactNode } from "react"
import type { IconProps } from "../Icon/types"

/**
 * Internal accordion context value.
 */
export interface AccordionContextValue {
  /** Whether the accordion is open */
  isOpen: boolean
  /** Toggle open/closed state */
  toggle: () => void
}

/**
 * Root accordion component.
 */
export interface AccordionProps {
  children: ReactNode
  /** Extra classes for the root element */
  className?: string
  /** Classes applied to the root when open */
  openClassName?: string
  /** Whether the accordion is open on first render */
  isOpenDefault?: boolean
}

/**
 * Accordion header (trigger).
 */
export interface AccordionTriggerProps {
  children: ReactNode
  /** Extra classes for the trigger */
  className?: string
  /** Classes applied to the trigger when open */
  openClassName?: string
  /** Custom icon props */
  iconProps?: IconProps
  /** Extra classes for the icon */
  iconClassName?: string
  /** Default icon size when iconProps is not provided */
  iconSize?: number
}

/**
 * Accordion content panel with height animation.
 */
export interface AccordionContentProps {
  children: ReactNode
  /** Extra classes for the content wrapper */
  className?: string
  /** Extra classes for the inner content container */
  contentInnerClassName?: string
  /** Minimum content height in px (including when closed) */
  minHeight?: number
  /** max-height animation duration in milliseconds */
  duration?: number
}
