import React from "react"

/**
 * Clears a timeout if it exists
 * @param timeoutRef - useRef hook that holds a timeout handle
 */
export function clearTimeoutRef(timeoutRef: React.RefObject<ReturnType<typeof setTimeout> | null>) {
  if (timeoutRef.current !== null) {
    clearTimeout(timeoutRef.current)
    timeoutRef.current = null
  }
}

/**
 * Clears an interval if it exists
 * @param intervalRef - useRef hook that holds an interval handle
 */
export function clearIntervalRef(
  intervalRef: React.RefObject<ReturnType<typeof setInterval> | null>
) {
  if (intervalRef.current !== null) {
    clearInterval(intervalRef.current)
    intervalRef.current = null
  }
}
