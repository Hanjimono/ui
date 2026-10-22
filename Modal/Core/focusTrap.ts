"use client"

// System
import { useEffect, type RefObject } from "react"

// Types
import { UseFocusTrapOptions } from "./types"

/**
 * Selector for focusable elements inside a container.
 */
const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

/**
 * Returns focusable elements inside a container.
 *
 * @param container - Root element of the modal panel.
 * @returns Array of focusable HTMLElements.
 */
export function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    (el) => !el.hasAttribute("disabled") && el.tabIndex !== -1
  )
}

/**
 * Hook that traps focus inside a modal.
 * Prevents moving focus to elements outside the modal.
 *
 * @param panelRef - Ref to the modal panel.
 * @param options - Hook options
 */
export function useFocusTrap(
  panelRef: RefObject<HTMLElement | null>,
  options: UseFocusTrapOptions = {}
): void {
  const { active = true, initialFocusRef } = options

  useEffect(() => {
    if (!active) {
      return
    }

    const panel = panelRef.current
    if (!panel) {
      return
    }

    const focusables = getFocusableElements(panel)
    const initialTarget = initialFocusRef?.current ?? focusables[0] ?? panel

    if (initialTarget && typeof initialTarget.focus === "function") {
      initialTarget.focus({ preventScroll: true })
    } else if (typeof panel.focus === "function") {
      panel.tabIndex = -1
      panel.focus({ preventScroll: true })
    }

    // Override Tab key behavior inside the modal
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") {
        return
      }

      const currentFocusables = getFocusableElements(panel)
      if (currentFocusables.length === 0) {
        event.preventDefault()
        return
      }

      const first = currentFocusables[0]
      const last = currentFocusables[currentFocusables.length - 1]
      const activeEl = document.activeElement as HTMLElement | null

      if (event.shiftKey) {
        // Shift + Tab: move focus to the previous element
        if (activeEl === first || !panel.contains(activeEl)) {
          event.preventDefault()
          last.focus()
        }
        return
      }

      if (activeEl === last || !panel.contains(activeEl)) {
        event.preventDefault()
        first.focus()
      }
    }

    /** focusin handler: pull focus back to the first element inside the modal */
    const handleFocusIn = (event: FocusEvent) => {
      const target = event.target as Node | null
      if (!target || panel.contains(target)) {
        return
      }
      const currentFocusables = getFocusableElements(panel)
      const fallback = currentFocusables[0] ?? panel
      if (typeof fallback.focus === "function") {
        fallback.focus({ preventScroll: true })
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("focusin", handleFocusIn)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("focusin", handleFocusIn)
    }
  }, [active, initialFocusRef, panelRef])
}
