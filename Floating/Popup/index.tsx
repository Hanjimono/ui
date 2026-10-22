"use client"

import React, { useLayoutEffect, useMemo, useState } from "react"
import { FloatingArrow } from "../Core"
import Portal from "../Portal"
import type { PopupProps } from "./types"
import { cn } from "../../Utils/cn"
import { getLayerManager } from "../../LayerService/layerManager"

/**
 * Popup layout primitive. Responsible solely for rendering
 * the floating element and an optional arrow. All positioning
 * and interaction logic lives in the `usePopup` hook,
 * whose result is passed via the `state` prop.
 *
 * @param state - Popup state from `usePopup`.
 * @param children - Popup content.
 * @param className - Extra CSS classes.
 * @param style - Extra inline styles.
 * @param portal - Whether to use Portal.
 * @param portalContainer - Custom portal container.
 * @param arrowOptions - Arrow render options.
 * @param keepMounted - Keep content in the DOM when closed and hide via CSS.
 * @returns Popup content in the current tree or through Portal.
 */
function Popup({
  state,
  children,
  floatingProps,
  className,
  style,
  portal = true,
  portalContainer,
  arrowOptions,
  keepMounted = false
}: PopupProps) {
  const shouldMount = state.open || keepMounted

  // For correct z-index of the floating element, use the global layer manager
  const layerManager = useMemo(() => getLayerManager(), [])
  // Storage for the floating element's layer id
  const [layerId, setLayerId] = useState<number | null>(null)
  useLayoutEffect(() => {
    if (!shouldMount) {
      return
    }

    // If no layer is allocated for the floating element, allocate one
    const { id } = layerManager.allocate("floating")
    setLayerId(id)

    return () => {
      // Release the floating element's layer on unmount
      layerManager.release(id)
      setLayerId(null)
    }
  }, [shouldMount, layerManager])

  if (!shouldMount) {
    return null
  }

  const isClosed = keepMounted && !state.open
  const zIndex = layerId !== null && !isClosed ? layerManager.getLayerZIndex(layerId) : undefined

  // Wait for positioning only without keepMounted: with a permanent
  // mount, visibility:hidden blocks Floating UI coordinate calculation.
  const isWaitingForPosition = state.open && !keepMounted && !state.isPositioned
  const isVisibilityHidden = isWaitingForPosition || !!state.hide?.referenceHidden

  const content = (
    <div
      {...state.getFloatingProps(floatingProps)}
      ref={state.setFloatingRef}
      className={cn("absolute max-w-max", isClosed && "invisible pointer-events-none", className)}
      aria-hidden={isClosed ? true : floatingProps?.["aria-hidden"]}
      style={{
        ...state.floatingStyles,
        ...style,
        zIndex,
        visibility: isVisibilityHidden ? "hidden" : style?.visibility
      }}
      data-placement={state.placement}
    >
      {state.withArrow && (
        <FloatingArrow ref={state.arrowRef} context={state.arrowContext} {...arrowOptions} />
      )}
      {children}
    </div>
  )

  if (!portal) {
    return content
  }

  return <Portal container={portalContainer}>{content}</Portal>
}

export default Popup
