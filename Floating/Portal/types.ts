import type { ReactNode } from "react"

/**
 * Props for the universal Portal component.
 */
export type PortalProps = {
  /** Content to portal into the target container. */
  children: ReactNode
  /** Target DOM container; defaults to `document.body`. */
  container?: HTMLElement | null
}
