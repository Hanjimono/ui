import type { CSSProperties, ReactNode } from "react"
import type { IconProps } from "../Icon/types"
import type { FloatingPlacement, FloatingArrowRenderOptions } from "../../Floating/Core/types"
import type { FloatingTriggerType, PopupState, UsePopupReturn } from "../../Floating/Hooks/hookTypes"

/** Tooltip trigger icon: Material icon name or `IconProps` object. */
export type TooltipIcon = IconProps | string

/** Props for the tooltip popup primitive (structure + appearance only). */
export interface TooltipPopupProps {
  /** Popup state from `useTooltip`/`usePopup`. */
  state: PopupState
  /** Arrow render options (when enabled). */
  arrowOptions?: FloatingArrowRenderOptions
  /** Render tooltip through a portal. */
  portal?: boolean
  /** Explicit portal container. */
  portalContainer?: HTMLElement | null
  /** DOM id for the tooltip popup, usually from `useTooltipHook` */
  id: string
  /** Tooltip title. Shown at the top, often with distinct styles. */
  title?: ReactNode
  /** Tooltip body text */
  text?: ReactNode
  /** Loading flag. Shows a loader instead of the text. */
  isLoading?: boolean
  /** Extra CSS class for the tooltip popup root. */
  className?: string
  /** Extra CSS class for the tooltip title. */
  titleClassName?: string
  /** Extra CSS class for the tooltip text. */
  textClassName?: string
  /** Loading label shown instead of text when `isLoading=true`. */
  loaderLabel?: string
  /** Extra styles for the tooltip container (forwarded to `Popup`). */
  style?: CSSProperties
}

/** Options for `useTooltipHook` (trigger choice + open-state control). */
export interface UseTooltipHookOptions {
  /**
   * Controlled open state.
   * When set, the hook runs in controlled mode.
   */
  open?: boolean
  /**
   * Initial open state for uncontrolled mode.
   * Ignored in controlled mode.
   */
  defaultOpen?: boolean
  /**
   * Open-state change callback.
   * Required for controlled mode.
   */
  onOpenChange?: (open: boolean) => void

  /** Base placement of the popup relative to the trigger. */
  placement?: FloatingPlacement
  /** Gap between trigger and popup. */
  offset?: number
  /** Enable arrow (arrow middleware). */
  withArrow?: boolean

  /** Enable flip middleware (flip on collisions). */
  flip?: boolean
  /** Enable shift middleware (shift into the viewport). */
  shift?: boolean

  /** Force triggers instead of auto-detection (hover/click). */
  trigger?: FloatingTriggerType[]
  /** Triggers for desktop/hover scenarios. */
  desktopTrigger?: FloatingTriggerType[]
  /** Triggers for mobile/coarse-pointer scenarios. */
  mobileTrigger?: FloatingTriggerType[]

  /** Hover open delay. */
  hoverOpenDelay?: number
  /** Hover close delay. */
  hoverCloseDelay?: number

  /** Enable dismiss on external events. */
  isDismissEnabled?: boolean
  /** Enable dismiss on outside click/touch. */
  dismissOnOutsidePress?: boolean
  /** Enable dismiss on Escape. */
  dismissOnEscape?: boolean
}

/** Return value of `useTooltip`. */
export interface UseTooltipHookReturn {
  /** Current open state. Meaningful in uncontrolled mode. */
  open: boolean
  /** Sets open state. Meaningful in uncontrolled mode. */
  setOpen: (open: boolean) => void
  /** DOM id for the tooltip popup. */
  tooltipId: string
  /** Sets the trigger element ref. */
  setTriggerRef: (node: HTMLElement | null) => void
  /** Returns props for the trigger element. */
  getTriggerProps: UsePopupReturn["getTriggerProps"]
  /** Popup state. */
  popupState: PopupState
}

/** Props for the public `Tooltip` component. */
export interface TooltipProps {
  /** Tooltip title. Shown at the top, often with distinct styles. */
  title?: ReactNode
  /** Tooltip body text */
  text?: ReactNode
  /** Loading flag. Shows a loader instead of the text. */
  isLoading?: boolean
  /**
   * Trigger icon.
   * A string is treated as a Material Icon name (`type="md"`).
   */
  icon?: TooltipIcon
  /** CSS class for the trigger button. */
  className?: string
  /** CSS class for the svg/icon inside the trigger. */
  iconClassName?: string
  /** aria-label for the trigger button. */
  ariaLabel?: string
  /** Base placement of the popup relative to the trigger. */
  placement?: FloatingPlacement
  /** Gap between trigger and popup. */
  offset?: number
  /** Enable arrow (arrow middleware). */
  withArrow?: boolean
  /** Enable flip middleware (flip on collisions). */
  flip?: boolean
  /** Enable shift middleware (shift into the viewport). */
  shift?: boolean
  /** Hover open delay. */
  hoverOpenDelay?: number
  /** Hover close delay. */
  hoverCloseDelay?: number
  /** Controlled open state. */
  open?: boolean
  /** Initial open state for uncontrolled mode. */
  defaultOpen?: boolean
  /** Open-state change callback. */
  onOpenChange?: (open: boolean) => void
  /** Arrow render options for `Popup`. */
  arrowOptions?: FloatingArrowRenderOptions
  /** Extra classes for the tooltip popup root. */
  popupClassName?: string
  /** Extra CSS class for the tooltip title. */
  titleClassName?: string
  /** Extra CSS class for the tooltip text. */
  textClassName?: string
  /** Accessible loader label when isLoading=true. */
  loaderLabel?: string
}
