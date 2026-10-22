"use client"

// UI
import resolvedUiConfig from "../../Config/uiConfig"
import ModalContainer from "../ModalContainer"
import { useModalContext } from "../ModalProvider"

// Types
import type { ModalOutletProps } from "./types"

const UI_CONFIG = resolvedUiConfig

/**
 * Modal stack render outlet. Reads the stack from ModalProvider and renders ModalContainer.
 *
 * @param portalContainer - Portal container.
 * @param baseZIndex - Base z-index.
 */
export default function ModalOutlet({
  portalContainer,
  baseZIndex = UI_CONFIG.modalBaseZIndex
}: ModalOutletProps) {
  const { stack, close } = useModalContext()

  return (
    <ModalContainer
      stack={stack}
      onClose={(id) => close(id)}
      portalContainer={portalContainer}
      baseZIndex={baseZIndex}
      zIndexStep={UI_CONFIG.modalZIndexStep}
    />
  )
}
