"use client"

import React, { useEffect, useRef, useState } from "react"
import { clearTimeoutRef } from "../../Helper/clearTime"
import { WindowSize } from "./types"

/**
 * Hook that returns the viewport size.
 * Keeps the returned size correct after resize.
 * Uses throttle so rerenders are not triggered too often.
 * @param throttleDelay - minimum delay between rerenders in milliseconds;
 * if throttleDelay = 0, throttling is disabled
 */
export default function useWindowSize(throttleDelay: number = 0): WindowSize {
  const clearRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const throttleStateRef = useRef<"can_call" | "on_cooldown" | "will_call_when_cooldown_ends">(
    "can_call"
  )
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0
  })
  /** windowSizeRef delivers the current windowSize into the event listener */
  const windowSizeRef = useRef(windowSize)
  useEffect(() => {
    windowSizeRef.current = windowSize
  }, [windowSize])
  const setWindow = () => {
    const windowSize = windowSizeRef.current
    if (windowSize.width === window.innerWidth && windowSize.height === window.innerHeight) {
      return
    }

    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    })
  }

  useEffect(() => {
    const handleResize = () => {
      if (throttleDelay === 0) {
        setWindow()
      } else {
        handleThrottledResize(throttleDelay, throttleStateRef, clearRef, setWindow)
      }
    }

    window.addEventListener("resize", handleResize)

    handleResize()

    return () => {
      window.removeEventListener("resize", handleResize)
      clearTimeoutRef(clearRef)

      // useRef in Strict Mode is not recreated on remount
      // https://github.com/reactjs/react.dev/issues/6123
      throttleStateRef.current = "can_call"
    }
  }, [])
  return windowSize
}

/**
 * Sets windowSize with throttle
 * @param throttleDelay - throttle delay before running
 * @param throttleStateRef - throttle state saying whether a rerender is allowed
 * @param clearRef - ref used to clear the timeout
 * @param setWindow - function that sets the window size
 */
function handleThrottledResize(
  throttleDelay: number,
  throttleStateRef: React.RefObject<"can_call" | "on_cooldown" | "will_call_when_cooldown_ends">,
  clearRef: React.RefObject<ReturnType<typeof setTimeout> | null>,
  setWindow: () => void
) {
  if (throttleStateRef.current == "on_cooldown") {
    throttleStateRef.current = "will_call_when_cooldown_ends"
    return
  }
  if (throttleStateRef.current == "will_call_when_cooldown_ends") {
    return
  }
  setWindow()

  throttleStateRef.current = "on_cooldown"
  clearRef.current = setTimeout(() => {
    clearTimeoutRef(clearRef)

    if (throttleStateRef.current == "will_call_when_cooldown_ends") {
      setWindow()
    }
    throttleStateRef.current = "can_call"
  }, throttleDelay)
}
