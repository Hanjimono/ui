// Types
import type { ReactNode } from "react"

/** Props for the main modal content block */
export interface ModalBodyProps {
  /** Modal content */
  children: ReactNode
  /** Extra section class */
  className?: string
}
