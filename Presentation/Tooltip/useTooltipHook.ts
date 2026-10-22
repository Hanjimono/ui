"use client"

import { useCallback, useEffect, useId, useMemo, useState } from "react"
import { usePopup } from "../../Floating/Hooks/exports"
import type { UseTooltipHookOptions, UseTooltipHookReturn } from "./types"
import type { FloatingTriggerType } from "../../Floating/Hooks/hookTypes"

/**
 * Detects a coarse pointer (e.g. mobile touch).
 * Used to choose which triggers open the tooltip.
 * @returns {boolean} Whether the pointer is coarse
 */
function useCoarsePointer(): boolean {
  const [isCoarse, setIsCoarse] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return

    // If hover is unavailable and the pointer is coarse, treat as mobile.
    const query = "(hover: none) and (pointer: coarse)"
    const mediaQueryList = window.matchMedia(query)

    const update = () => setIsCoarse(mediaQueryList.matches)
    update()

    // Safari < 14 support
    if (typeof mediaQueryList.addEventListener === "function") {
      mediaQueryList.addEventListener("change", update)
      return () => mediaQueryList.removeEventListener("change", update)
    }

    mediaQueryList.addListener(update)
    return () => mediaQueryList.removeListener(update)
  }, [])

  return isCoarse
}

/**
 * Resolves which triggers open the tooltip.
 * @param {boolean} isCoarse - Whether the pointer is coarse
 * @param {FloatingTriggerType[]} trigger - Forced triggers instead of auto-detection
 * @param {FloatingTriggerType[]} desktopTrigger - Desktop/hover triggers
 * @param {FloatingTriggerType[]} mobileTrigger - Mobile/coarse-pointer triggers
 * @returns {FloatingTriggerType[]} Triggers to use
 */
function resolveTriggers(
  isCoarse: boolean,
  trigger: FloatingTriggerType[] | undefined,
  desktopTrigger: FloatingTriggerType[],
  mobileTrigger: FloatingTriggerType[]
) {
  if (trigger) return trigger
  if (isCoarse) return mobileTrigger
  return desktopTrigger
}

/**
 * Tooltip hook built on the Floating system for automatic positioning.
 * Use for custom, more complex tooltips.
 * For a standard tooltip, use the Tooltip component.
 *
 * When no explicit trigger is set, opens on hover/focus; on mobile, falls back to click.
 * Supports controlled/uncontrolled open via `open`/`defaultOpen`/`onOpenChange`.
 * @param {boolean} open - Controlled open state
 * @param {boolean} defaultOpen - Initial open state for uncontrolled mode
 * @param {function} onOpenChange - Open-state change callback
 * @param {string} placement - Base placement relative to the trigger
 * @param {number} offset - Gap between trigger and popup
 * @param {boolean} withArrow - Enable arrow middleware
 * @param {boolean} flip - Enable flip middleware
 * @param {boolean} shift - Enable shift middleware
 * @param {FloatingTriggerType[]} trigger - Forced triggers instead of auto-detection
 * @param {FloatingTriggerType[]} desktopTrigger - Desktop/hover triggers
 * @param {FloatingTriggerType[]} mobileTrigger - Mobile/coarse-pointer triggers
 * @param {number} hoverOpenDelay - Hover open delay
 * @param {number} hoverCloseDelay - Hover close delay
 * @param {boolean} isDismissEnabled - Enable dismiss on external events
 * @param {boolean} dismissOnOutsidePress - Enable dismiss on outside click/touch
 * @param {boolean} dismissOnEscape - Enable dismiss on Escape
 * @returns {UseTooltipHookReturn} Tooltip control helpers
 */
function useTooltip({
  open: openProp,
  defaultOpen = false,
  onOpenChange,

  placement = "top",
  offset = 10,
  withArrow = true,

  flip = true,
  shift = false,

  trigger,
  desktopTrigger = ["hover", "focus"],
  mobileTrigger = ["click", "focus"],

  hoverOpenDelay,
  hoverCloseDelay,

  isDismissEnabled = true,
  dismissOnOutsidePress = true,
  dismissOnEscape = true
}: UseTooltipHookOptions): UseTooltipHookReturn {
  const tooltipId = useId()
  const isCoarse = useCoarsePointer()

  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen)
  const isControlled = openProp !== undefined
  let open = uncontrolledOpen
  if (isControlled) {
    open = openProp
  }

  const setOpen = useCallback(
    (next: boolean) => {
      if (isControlled) {
        onOpenChange?.(next)
        return
      }
      setUncontrolledOpen(next)
    },
    [isControlled, onOpenChange]
  )

  const resolvedTrigger = useMemo(
    () => resolveTriggers(isCoarse, trigger, desktopTrigger, mobileTrigger),
    [desktopTrigger, isCoarse, mobileTrigger, trigger]
  )

  const popup = usePopup({
    open,
    onOpenChange: setOpen,

    placement,
    offset,

    trigger: resolvedTrigger,
    hoverOpenDelay,
    hoverCloseDelay,

    isDismissEnabled,
    dismissOnOutsidePress,
    dismissOnEscape,

    withArrow,
    flip,
    shift,
    // Arrow look is controlled via `arrowOptions` on `Popup`.
    // Here we only enable middleware via `withArrow`.
    arrowPadding: 6
  })

  return {
    open,
    setOpen,
    tooltipId,

    setTriggerRef: popup.setTriggerRef,
    getTriggerProps: popup.getTriggerProps,
    popupState: popup.popupState
  }
}

export { useTooltip }
