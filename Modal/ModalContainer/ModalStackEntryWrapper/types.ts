// Types
import type { ModalStackEntry } from "../../Core/types"
import type { ModalName } from "../../Registry/types"

/** Props for the stack modal wrapper inside ModalContainer */
export interface ModalStackEntryWrapperProps {
  /** Stack entry */
  entry: ModalStackEntry<ModalName>
  /** Index in the stack (for z-index) */
  index: number
  /** id of the top modal */
  topId: string
  /** Close modal by id (stackApi.close) */
  onClose: (id: string) => void
  /** Base z-index */
  baseZIndex: number
  /** z-index step between layers */
  zIndexStep: number
}
