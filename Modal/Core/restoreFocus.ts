/**
 * Gets the currently active element.
 *
 * @returns The focused element, or null.
 */
export function getActiveElement(): Element | null {
  if (typeof document === "undefined") {
    return null
  }
  return document.activeElement
}

/**
 * Restores focus to an element if it is still in the DOM and can receive focus.
 *
 * @param element - Previously saved element.
 */
export function restoreFocus(element: Element | null | undefined): void {
  if (!element || typeof document === "undefined") {
    return
  }

  if (!document.contains(element)) {
    return
  }

  const focusable = element as HTMLElement
  if (typeof focusable.focus === "function") {
    focusable.focus({ preventScroll: true })
  }
}
