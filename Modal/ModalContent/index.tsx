"use client"

// Utils
import { cn } from "../../Utils/cn"

// Types
import type { ModalContentProps } from "./types"

/**
 * Main layout wrapper for all modal content.
 * Every ordinary modal should be wrapped in this component.
 *
 * @param children - Modal sections.
 * @param className - Extra class.
 * @returns Root content layout container.
 */
export default function ModalContent({ children, className }: ModalContentProps) {
  return (
    <div className={cn("flex flex-col w-full", className)} data-modal-content="">
      {children}
    </div>
  )
}
