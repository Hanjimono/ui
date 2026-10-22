// Types
import type { ModalContainerProps } from "../ModalContainer/types"

/** Parameters for rendering the modal stack */
export interface ModalOutletProps {
  /** Portal container (defaults to document.body) */
  portalContainer?: ModalContainerProps["portalContainer"]
  /** Base z-index of the bottom modal */
  baseZIndex?: number
}
