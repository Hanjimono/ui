"use client"

// UI
import resolvedUiConfig from "../Config/uiConfig"
import ModalPrimitive from "./ModalPrimitive"

// Utils
import { cn } from "../Utils/cn"

// Types
import type { ModalProps } from "./types"

const UI_CONFIG = resolvedUiConfig

/**
 * Modal window.
 * Main shell. Handles show/close logic (via ModalPrimitive)
 * and sets the main outer container styles (shadow, radius).
 *
 * @param className - Extra class for the modal window.
 * @param withoutOverlay - Hide overlay.
 * @param dismissOnOverlayClick - Enable close on overlay click.
 * @param dismissOnEscape - Enable close on Escape.
 * @returns Modal window.
 */
export default function Modal({
  className,
  withoutOverlay = false,
  dismissOnOverlayClick = UI_CONFIG.modalDismissOnOverlayClick,
  dismissOnEscape = UI_CONFIG.modalDismissOnEscape,
  ...rest
}: ModalProps) {
  const resolvedModalClassName = cn(
    "rounded-modal bg-modal-content-bg shadow-modal",
    className
  )

  return (
    <ModalPrimitive
      withoutOverlay={withoutOverlay}
      dismissOnOverlayClick={dismissOnOverlayClick}
      dismissOnEscape={dismissOnEscape}
      className={resolvedModalClassName}
      {...rest}
    />
  )
}
