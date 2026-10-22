"use client"

import { useEffect } from "react"

/** Shared scroll-lock counter */
let lockCount = 0
/** Previous body overflow value */
let previousBodyOverflow = ""
/** Previous body padding-right value */
let previousBodyPaddingRight = ""

/**
 * Locks document.body scroll, accounting for scrollbar width.
 */
function lockBodyScroll(): void {
  if (typeof document === "undefined") {
    return
  }

  lockCount += 1
  // If the lock counter is greater than 1, scroll is already locked
  if (lockCount > 1) {
    return
  }

  const body = document.body
  previousBodyOverflow = body.style.overflow
  previousBodyPaddingRight = body.style.paddingRight

  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
  // Hide the scrollbar while preserving padding equal to its width
  body.style.overflow = "hidden"
  if (scrollbarWidth > 0) {
    body.style.paddingRight = `${scrollbarWidth}px`
  }
}

/**
 * Unlocks scroll when the lock counter reaches zero.
 */
function unlockBodyScroll(): void {
  if (typeof document === "undefined") {
    return
  }

  lockCount = Math.max(0, lockCount - 1)
  // If the lock counter is still > 0, other modals still lock scroll
  if (lockCount > 0) {
    return
  }

  const body = document.body
  // Restore previous overflow and padding-right on body
  body.style.overflow = previousBodyOverflow
  body.style.paddingRight = previousBodyPaddingRight
}

/**
 * Hook that locks page scroll while a modal is open.
 * Can be used outside ModalProvider with `lockScroll={false}`.
 *
 * @param active - Enable the lock.
 */
export function useScrollLock(active: boolean): void {
  useEffect(() => {
    if (!active) {
      return
    }

    lockBodyScroll()
    return () => {
      unlockBodyScroll()
    }
  }, [active])
}
