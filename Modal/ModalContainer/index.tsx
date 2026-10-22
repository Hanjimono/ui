"use client"

// UI
import Portal from "../../Floating/Portal"
import ModalStackEntryWrapper from "./ModalStackEntryWrapper"

// Types
import type { ModalContainerProps } from "./types"

/**
 * Renders the full modal stack through Portal and Modal.
 *
 * @param stack - Open modals.
 * @param onClose - Close by id.
 * @param portalContainer - Portal DOM container.
 * @param baseZIndex - Bottom z-index.
 * @param zIndexStep - Step between layers.
 */
export default function ModalContainer({
  stack,
  onClose,
  portalContainer,
  baseZIndex,
  zIndexStep
}: ModalContainerProps) {
  if (stack.length === 0) {
    return null
  }

  const topId = stack[stack.length - 1].id

  return (
    <Portal container={portalContainer}>
      {stack.map((entry, index) => (
        <ModalStackEntryWrapper
          key={entry.id}
          entry={entry}
          index={index}
          topId={topId}
          onClose={onClose}
          baseZIndex={baseZIndex}
          zIndexStep={zIndexStep}
        />
      ))}
    </Portal>
  )
}
