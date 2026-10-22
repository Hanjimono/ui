// Types
import type { ModalOpenOptions, ModalStackApi } from "./types"
import type { ModalName, ModalRegistryMap } from "../Registry/types"

let modalStackApi: ModalStackApi | null = null

/**
 * Registers the stack API from ModalProvider (internal call).
 *
 * @param api - show/close/closeAll/update methods with lifecycle callbacks.
 * @returns Unregister function.
 */
export function registerModalStackApi(api: ModalStackApi | null): () => void {
  modalStackApi = api
  return () => {
    if (modalStackApi === api) {
      modalStackApi = null
    }
  }
}

/**
 * Ensures the stack API is set.
 *
 * @returns Modal stack API.
 */
function ensureStackApi(): ModalStackApi {
  // If the API is not set, throw an error
  if (!modalStackApi) {
    throw new Error(
      "modal API: ModalProvider is not mounted. Wrap the app in <ModalProvider>."
    )
  }
  return modalStackApi
}

/** Counter for generating unique modal ids */
let idCounter = 0

/**
 * Generates a unique stack entry id.
 *
 * @returns Unique modal id.
 */
export function createModalId(): string {
  idCounter += 1
  // Build a unique id in the form "modal-<number>-<timestamp>"
  return `modal-${idCounter}-${Date.now()}`
}

/**
 * Imperative API outside React components (utilities, plain callbacks, legacy code).
 * Prefer `useModal` / `useModalContext` inside components.
 * Delegates to the same ModalStackApi that ModalProvider registers.
 */
export const modal = {
  /**
   * Opens a registry modal by name.
   *
   * @param name - Key in resolvedRegistry.
   * @param props - Modal component props.
   * @param options - Dismiss, role, callback options.
   * @returns Stack entry id.
   */
  show<TName extends ModalName>(
    name: TName,
    props?: ModalRegistryMap[TName],
    options?: ModalOpenOptions
  ): string {
    return ensureStackApi().show(name, props, options)
  },

  /**
   * Closes the top modal or a modal by id.
   *
   * @param id - Optional id; without id — pop the top.
   */
  close(id?: string): void {
    ensureStackApi().close(id)
  },

  /**
   * Closes all modals in the stack.
   */
  closeAll(): void {
    ensureStackApi().closeAll()
  },

  /**
   * Updates props/options of the top or a given modal.
   *
   * @param payload - id, props, options.
   */
  update(payload: { id?: string; props?: unknown; options?: Partial<ModalOpenOptions> }): void {
    ensureStackApi().update(payload)
  }
}

export default modal
