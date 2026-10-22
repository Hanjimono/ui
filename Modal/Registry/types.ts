// Types
import type { ModalRegistryComponent } from "../Core/types"
import type { AlertModalProps } from "../DefaultModals/AlertModal/types"
import type { ConfirmModalProps } from "../DefaultModals/ConfirmModal/types"
import type { LocalModalRegistryMap } from "./localTypes"

/** Built-in ui-kit modal props map */
export interface DefaultModalRegistryMap {
  alert: AlertModalProps
  confirm: ConfirmModalProps
}

/** Modal name in the registry */
export type ModalName = Extract<keyof ModalRegistryMap, string>

/** Built-in ui-kit modal registry */
export type DefaultModalRegistry = {
  [K in keyof DefaultModalRegistryMap]: ModalRegistryComponent<DefaultModalRegistryMap[K]>
}

/** Project-local modal registry */
export type LocalModalRegistry = {
  [K in keyof LocalModalRegistryMap]: ModalRegistryComponent<LocalModalRegistryMap[K]>
}

/** Full map of modal names and their props (ui-kit + project) */
export type ModalRegistryMap = DefaultModalRegistryMap & LocalModalRegistryMap

/** Full registry: ui-kit + project-local modals */
export type ModalRegistry = {
  [K in ModalName]: ModalRegistryComponent<ModalRegistryMap[K]>
}
