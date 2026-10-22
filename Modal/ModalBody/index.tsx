"use client"

// Utils
import { cn } from "../../Utils/cn"

// Types
import type { ModalBodyProps } from "./types"

/**
 * Main modal body content.
 *
 * @param children - Modal contents.
 * @param className - Extra class.
 */
export default function ModalBody({ children, className }: ModalBodyProps) {
  return (
    <div
      className={cn(
        "p-modal-content-pad",
        "[[data-modal-content]_[data-modal-header]+&]:pt-modal-body-gap",
        className
      )}
      data-modal-body=""
    >
      {children}
    </div>
  )
}
