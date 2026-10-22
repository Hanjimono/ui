import type { CSSProperties, HTMLAttributes, ReactNode } from "react"
import type { PopupState } from "../Hooks/hookTypes"
import type { FloatingArrowRenderOptions } from "../Core/types"

/**
 * Props for the `Popup` component.
 */
export type PopupProps = {
  /** Popup state from the `usePopup` hook. */
  state: PopupState
  /** Popup content. */
  children: ReactNode
  /**
   * Extra props for the root floating element.
   * Use to set `id`, `role`, `aria-*`, etc.
   */
  floatingProps?: HTMLAttributes<HTMLElement>
  /** Extra CSS class for the root popup container. */
  className?: string
  /** Extra inline styles for the popup container. */
  style?: CSSProperties
  /** Use a portal to render popup content. */
  portal?: boolean
  /** Explicit portal container. */
  portalContainer?: HTMLElement | null
  /** Arrow render options (proxied to the Core arrow adapter). */
  arrowOptions?: FloatingArrowRenderOptions
  /** Keep content in the DOM when the popup is closed and hide it via CSS. */
  keepMounted?: boolean
}
