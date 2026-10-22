// Types
import type { ReactNode } from "react"
import type { ModalRole } from "../Core/types"

/** Props for the modal window primitive */
export interface ModalPrimitiveProps {
  /** Whether the modal is open */
  open: boolean
  /** Close request from UI (overlay, Escape) */
  onRequestClose?: () => void
  /** Dialog content */
  children: ReactNode
  /** Hide the dimming overlay (overlay is on by default) */
  withoutOverlay?: boolean
  /** Extra className for the content block */
  className?: string
  /** Shared z-index for all modal elements */
  zIndex?: number
  /** Whether this is the top modal in the stack (focus trap, pointer-events) */
  isTop?: boolean
  /** Hide from assistive tech (not top of stack) */
  ariaHidden?: boolean
  /** Whether overlay dismiss is enabled */
  dismissOnOverlayClick?: boolean
  /** Whether Escape dismiss is enabled */
  dismissOnEscape?: boolean
  /** Whether close is blocked */
  preventClose?: boolean
  /** ARIA role */
  role?: ModalRole
  /** id for aria-labelledby */
  labelledById?: string
  /** id for aria-describedby */
  describedById?: string
}
