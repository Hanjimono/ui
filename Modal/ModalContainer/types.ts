// Types
import type { ModalStackEntry } from "../Core/types"
import type { ModalName } from "../Registry/types"

/** Modal container props */
export interface ModalContainerProps {
  /** Stack of open modals */
  stack: ModalStackEntry<ModalName>[]
  /** Function to close a modal */
  onClose: (id: string) => void
  /** Portal container */
  portalContainer?: HTMLElement | null
  /** Base z-index */
  baseZIndex: number
  /** z-index step */
  zIndexStep: number
}
