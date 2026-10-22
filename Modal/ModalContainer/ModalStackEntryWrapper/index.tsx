"use client"

// System
import type { ComponentType } from "react"

// UI
import resolvedUiConfig from "../../../Config/uiConfig"
import Modal from "../../index"
import { resolvedRegistry } from "../../Registry/registry"
import { getLayerManager } from "../../../LayerService/layerManager"

// Types
import type { ModalInjectedProps } from "../../Core/types"
import type { ModalStackEntryWrapperProps } from "./types"
import type { ModalName } from "../../Registry/types"

const UI_CONFIG = resolvedUiConfig

const modalLayerManager = getLayerManager()

/** Registry component at the stack boundary: props already checked in useModal.open */
type RegistryModalComponent = ComponentType<ModalInjectedProps & Record<string, unknown>>

/**
 * Wrapper for a modal in the ModalContainer stack.
 * Acts as a layer between stack logic and a plain UI component.
 *
 * @param entry - Stack entry.
 * @param index - Position in the stack.
 * @param topId - id of the top modal.
 * @param onClose - Close via stackApi.
 * @param baseZIndex - Base z-index.
 * @param zIndexStep - z-index step.
 */
export default function ModalStackEntryWrapper({
  entry,
  index,
  topId,
  onClose,
  baseZIndex,
  zIndexStep
}: ModalStackEntryWrapperProps) {
  const RegistryComponent = resolvedRegistry[
    entry.name as ModalName
  ] as unknown as RegistryModalComponent

  if (!RegistryComponent) {
    return null
  }

  const isTop = entry.id === topId
  // Compute the final z-index for the modal to control display order precisely
  // using the global layer manager
  const resolvedLayerId = entry.layerId ?? modalLayerManager.allocate("modal").id
  const zIndex =
    modalLayerManager.getLayerZIndex(resolvedLayerId) ?? baseZIndex + index * zIndexStep
  // Generate all ids from the modal stack entry data
  const titleId = `${entry.id}-title`
  const descriptionId = `${entry.id}-description`
  // Whether this modal is an alert modal
  const isAlert = entry.name === "alert"
  // Whether the modal should close on overlay click
  const dismissOnOverlayClick =
    entry.options.dismissOnOverlayClick ?? UI_CONFIG.modalDismissOnOverlayClick
  const preventClose = entry.options.preventClose ?? false
  const role = entry.options.role ?? (isAlert ? "alertdialog" : "dialog")
  const withoutOverlay = entry.options.withoutOverlay ?? false

  // Two kinds of props must be passed into the modal:
  // 1. Props supplied when opening the modal
  // Record cast: empty Phase-2 DefaultModalRegistryMap makes ModalRegistryMap values `never`
  const registryProps = (entry.props ?? {}) as Record<string, unknown>

  // 2. Props used inside the modal, defined by the system
  const injectedProps = {
    close: () => onClose(entry.id),
    modalId: entry.id,
    isTop,
    titleId,
    descriptionId
  }

  // Allow a custom modal with its own logic
  // TODO: ideally a third set of props should be passed here — those that go to ModalPrimitive
  if (entry.options.unwrapped) {
    return <RegistryComponent {...registryProps} {...injectedProps} />
  }

  // By default use the standard Modal component
  return (
    <Modal
      open
      onRequestClose={() => onClose(entry.id)}
      isTop={isTop}
      ariaHidden={!isTop}
      zIndex={zIndex}
      withoutOverlay={withoutOverlay}
      dismissOnOverlayClick={dismissOnOverlayClick && isTop}
      dismissOnEscape={false}
      preventClose={preventClose}
      role={role}
      labelledById={titleId}
      describedById={descriptionId}
    >
      <RegistryComponent {...registryProps} {...injectedProps} />
    </Modal>
  )
}
