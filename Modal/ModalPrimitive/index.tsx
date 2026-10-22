"use client"

// System
import { useCallback, useRef, type CSSProperties, type PointerEvent, type ReactNode } from "react"

// Core
import { useEscapeHandler } from "../Core/escapeHandler"
import { useFocusTrap } from "../Core/focusTrap"

// Utils
import { cn } from "../../Utils/cn"

// Types
import type { ModalPrimitiveProps } from "./types"

/**
 * Modal window primitive. Implements the base business logic of the modal wrapper.
 * DOM skeleton, focus trap, dismiss, a11y.
 * Prefer not to use it directly. Needed as a base for building custom modal windows.
 *
 * @param open - Whether the modal is open.
 * @param onRequestClose - Close request from UI (overlay, Escape).
 * @param children - Dialog content.
 * @param withoutOverlay - Hide the dimming background (overlay is on by default).
 * @param className - Extra class for the dialog container.
 * @param zIndex - Layer z-index.
 * @param isTop - Top modal in the stack.
 * @param ariaHidden - aria-hidden for non-top modals.
 * @param dismissOnOverlayClick - Close on background click.
 * @param dismissOnEscape - Close on Escape.
 * @param preventClose - Block close.
 * @param role - dialog or alertdialog.
 * @param labelledById - title id for aria-labelledby.
 * @param describedById - description id for aria-describedby.
 * @returns Modal layer or null.
 */
export default function ModalPrimitive({
  open,
  onRequestClose,
  children,
  withoutOverlay = false,
  className,
  zIndex,
  isTop = true,
  ariaHidden = false,
  dismissOnOverlayClick = true,
  dismissOnEscape = true,
  preventClose = false,
  role = "dialog",
  labelledById,
  describedById
}: ModalPrimitiveProps) {
  const modalBlockRef = useRef<HTMLDivElement>(null)

  useFocusTrap(modalBlockRef, {
    active: open && isTop
  })

  const handleRequestClose = useCallback(() => {
    if (preventClose) {
      return
    }
    onRequestClose?.()
  }, [onRequestClose, preventClose])

  useEscapeHandler({
    active: open && isTop && dismissOnEscape,
    onEscape: handleRequestClose
  })

  /** Background click handler. */
  const handleOverlayPointerDown = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (!dismissOnOverlayClick) {
        return
      }
      if (event.target !== event.currentTarget) {
        return
      }
      handleRequestClose()
    },
    [dismissOnOverlayClick, handleRequestClose]
  )

  if (!open) {
    return null
  }

  const resolvedModalWrapperClass = cn(
    "fixed inset-0 flex items-center justify-center p-md pointer-events-auto",
    !isTop && "pointer-events-none"
  )

  const resolvedModalOverlayClass = cn(
    "fixed inset-0 bg-modal-overlay",
    !isTop && "pointer-events-none"
  )

  const resolvedModalBlockClass = cn("relative z-[1] outline-none", className)

  let wrapperStyle: CSSProperties | undefined
  if (zIndex !== undefined) {
    wrapperStyle = { zIndex }
  }

  let overlayNode: ReactNode = null
  if (!withoutOverlay) {
    overlayNode = (
      <div
        className={resolvedModalOverlayClass}
        onPointerDown={handleOverlayPointerDown}
        data-modal-overlay=""
        aria-hidden="true"
      />
    )
  }

  let ariaHiddenValue: boolean | undefined
  if (ariaHidden) {
    ariaHiddenValue = true
  }

  return (
    <div
      className={resolvedModalWrapperClass}
      style={wrapperStyle}
      data-modal-modalWrapper=""
    >
      {overlayNode}
      <div
        ref={modalBlockRef}
        role={role}
        aria-modal="true"
        aria-hidden={ariaHiddenValue}
        aria-labelledby={labelledById}
        aria-describedby={describedById}
        className={resolvedModalBlockClass}
        tabIndex={-1}
        data-modal-modalBlock=""
      >
        {children}
      </div>
    </div>
  )
}
