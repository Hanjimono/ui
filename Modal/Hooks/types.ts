// Types
import type { ModalOpenOptions } from "../Core/types"
import type { ModalName, ModalRegistryMap } from "../Registry/types"

/** Result of initializing the modal registry hook */
export interface UseModalHook<CurrentModalName extends ModalName> {
  /** Open a specific modal from the registry. Returns the modal id */
  open: (props?: ModalRegistryMap[CurrentModalName], options?: ModalOpenOptions) => string
  /** Close the last modal opened by this hook, or the modal with the given id */
  close: (id?: string) => void
  /** id of the last modal opened by this hook */
  lastId: string | null
}
