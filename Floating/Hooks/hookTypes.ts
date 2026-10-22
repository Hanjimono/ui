import type { CSSProperties, HTMLAttributes, RefObject } from "react"
import type {
  FloatingAutoUpdateOptions,
  FloatingCoreMiddlewareOptions,
  FloatingHideResult,
  FloatingInternalContext,
  FloatingPlacement,
  FloatingStrategy,
  FloatingVirtualElement
} from "../Core/types"

/**
 * Available open/close trigger types.
 */
export type FloatingTriggerType = "click" | "hover" | "focus" | "manual"

// ─── usePopup ───────────────────────────────────────────────────────

/**
 * Input options for the `usePopup` hook.
 */
export type UsePopupOptions = Omit<FloatingCoreMiddlewareOptions, "arrow"> & {
  /** Controlled popup open state (controlled mode). */
  open?: boolean
  /** Initial open state (uncontrolled mode). */
  defaultOpen?: boolean
  /** Open-state change handler (used in controlled mode and as a notification in uncontrolled). */
  onOpenChange?: (open: boolean) => void
  /** Placement (e.g. "top", "bottom", "left", "right"). */
  placement?: FloatingPlacement
  /** Positioning strategy ("absolute" or "fixed"). */
  strategy?: FloatingStrategy
  /** Auto position recalculation settings. */
  autoUpdate?: boolean | FloatingAutoUpdateOptions
  /** Triggers used to open/close the popup. */
  trigger?: FloatingTriggerType | FloatingTriggerType[]
  /** Hover open delay in milliseconds. */
  hoverOpenDelay?: number
  /** Hover close delay in milliseconds. */
  hoverCloseDelay?: number
  /** Disables showing the popup via the provided trigger list. Useful when managing the popup manually instead of via the configured trigger. */
  isInteractionsDisabled?: boolean
  /** Enables closing the popup on outside click/touch. */
  isDismissEnabled?: boolean
  /** Close on click/touch outside the container. */
  dismissOnOutsidePress?: boolean
  /** Close on Escape key. */
  dismissOnEscape?: boolean
  /** Show arrow (enables arrow middleware). */
  withArrow?: boolean
  /** Arrow padding from popup edges. */
  arrowPadding?: number
  /** Virtual anchor (cursor, selection range, etc.). */
  virtualReference?: FloatingVirtualElement | null
}

/**
 * Popup state passed from `usePopup` to the `Popup` component.
 * Consumers should not access fields directly —
 * the object is passed to `Popup` as a whole.
 */
export type PopupState = {
  /** Current state (open/closed). */
  open: boolean
  /** Whether the position has been calculated and is ready to display. */
  isPositioned: boolean
  /** Final placement (top, bottom, left, etc.) after all calculations. */
  placement: FloatingPlacement
  /** Positioning strategy ("absolute" or "fixed"). */
  strategy: FloatingStrategy
  /** Inline positioning styles for the floating element. */
  floatingStyles: CSSProperties
  /** Callback-ref for the floating element. */
  setFloatingRef: (node: HTMLElement | null) => void
  /** Returns HTML attributes and handlers for the floating element. */
  getFloatingProps: (userProps?: HTMLAttributes<HTMLElement>) => HTMLAttributes<HTMLElement>
  /** Whether an arrow is present. */
  withArrow: boolean
  /** Ref for the SVG arrow (passed to `FloatingArrow`). */
  arrowRef: RefObject<SVGSVGElement | null>
  /** Context for `FloatingArrow` (internal). */
  arrowContext: FloatingInternalContext
  /** `hide` middleware data. */
  hide: FloatingHideResult
}

/**
 * Return value of the `usePopup` hook.
 */
export type UsePopupReturn = {
  /** Current open state. */
  open: boolean
  /** Set open state (works in both controlled and uncontrolled modes). */
  setOpen: (open: boolean) => void
  /** Callback-ref for the trigger element. */
  setTriggerRef: (node: HTMLElement | null) => void
  /**
   * Returns HTML attributes and handlers for the trigger element.
   * Supports merging user props (including event handlers).
   */
  getTriggerProps: (userProps?: HTMLAttributes<HTMLElement>) => HTMLAttributes<HTMLElement>
  /** State to pass to the `Popup` component. */
  popupState: PopupState
}
