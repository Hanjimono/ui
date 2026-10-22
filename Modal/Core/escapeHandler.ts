"use client"

// System
import { useEffect } from "react"

// Types
import { UseEscapeHandlerOptions } from "./types"

/**
 * Global Escape handler for the top modal in the stack.
 * Originally meant to close the modal on Escape.
 * Can also be used for any custom callbacks.
 *
 * @param options - Hook options
 */
export function useEscapeHandler(options: UseEscapeHandlerOptions): void {
  const { onEscape, active = true } = options

  useEffect(() => {
    if (!active) {
      return
    }

    // keydown handler for Escape
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") {
        return
      }
      event.preventDefault()
      event.stopPropagation()
      onEscape()
    }

    document.addEventListener("keydown", handleKeyDown, true)
    return () => {
      document.removeEventListener("keydown", handleKeyDown, true)
    }
  }, [active, onEscape])
}
