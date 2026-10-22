// Modals
import AlertModal from "../DefaultModals/AlertModal"
import ConfirmModal from "../DefaultModals/ConfirmModal"

// Types
import type { DefaultModalRegistry } from "./types"

/** Built-in modal registry by default */
export const defaultRegistry: DefaultModalRegistry = {
  alert: AlertModal,
  confirm: ConfirmModal
}

export default defaultRegistry
