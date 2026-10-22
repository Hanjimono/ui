"use client"

import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react"
import type { HTMLAttributes } from "react"
import { useClick, useDismiss, useFocus, useHover, useInteractions } from "@floating-ui/react"
import { useFloatingCore } from "../Core"
import type {
  FloatingTriggerType,
  PopupState,
  UsePopupOptions,
  UsePopupReturn
} from "./hookTypes"

/**
 * Normalizes the `trigger` value to an array for uniform handling.
 *
 * @param trigger - A single trigger or a list of triggers.
 * @returns Array of triggers.
 */
function resolveTriggers(trigger?: FloatingTriggerType | FloatingTriggerType[]) {
  if (!trigger) {
    return []
  }

  return Array.isArray(trigger) ? trigger : [trigger]
}

/**
 * Main hook for working with popup.
 * Single entry point for popup logic: positioning, interaction hooks,
 * and arrow middleware. Returns `setTriggerRef` and `getTriggerProps`
 * for the trigger element, plus `popupState` for the `Popup` component.
 *
 * The trigger element is wired by the consumer in JSX:
 * ```tsx
 * <button ref={popup.setTriggerRef} {...popup.getTriggerProps()}>
 * ```
 *
 * @param options - Positioning, interaction, and arrow configuration.
 * @returns Ref and props for the trigger element, state for Popup.
 */
export function usePopup(options: UsePopupOptions): UsePopupReturn {
  const arrowRef = useRef<SVGSVGElement | null>(null)

  const isControlled = options.open !== undefined
  const [uncontrolledOpen, setUncontrolledOpen] = useState<boolean>(options.defaultOpen ?? false)
  const open = isControlled ? !!options.open : uncontrolledOpen

  const setOpen = useCallback(
    (next: boolean) => {
      if (isControlled) {
        options.onOpenChange?.(next)
        return
      }
      setUncontrolledOpen(next)
      options.onOpenChange?.(next)
    },
    [isControlled, options]
  )

  const floating = useFloatingCore({
    open,
    onOpenChange: setOpen,
    placement: options.placement,
    strategy: options.strategy,
    autoUpdate: options.autoUpdate,
    offset: options.offset,
    flip: options.flip,
    shift: options.shift,
    size: options.size,
    autoPlacement: options.autoPlacement,
    arrow: options.withArrow ? { element: arrowRef, padding: options.arrowPadding } : undefined,
    hideOnTriggerDisappearance: options.hideOnTriggerDisappearance
  })

  useLayoutEffect(() => {
    if (options.virtualReference) {
      floating.refs.setReference(options.virtualReference)
    }
  }, [floating.refs, options.virtualReference])

  const triggers = useMemo(() => resolveTriggers(options.trigger), [options.trigger])
  const isInteractionsEnabled = !options.isInteractionsDisabled
  const isManual = triggers.includes("manual")

  const click = useClick(floating.context, {
    enabled: isInteractionsEnabled && !isManual && triggers.includes("click")
  })

  const hover = useHover(floating.context, {
    enabled: isInteractionsEnabled && !isManual && triggers.includes("hover"),
    delay: {
      open: options.hoverOpenDelay ?? 0,
      close: options.hoverCloseDelay ?? 0
    }
  })

  const focus = useFocus(floating.context, {
    enabled: isInteractionsEnabled && !isManual && triggers.includes("focus")
  })

  const dismiss = useDismiss(floating.context, {
    enabled: options.isDismissEnabled ?? true,
    outsidePress: options.dismissOnOutsidePress ?? true,
    escapeKey: options.dismissOnEscape ?? true
  })

  const { getReferenceProps, getFloatingProps } = useInteractions([click, hover, focus, dismiss])

  const setTriggerRef = useCallback(
    (node: HTMLElement | null) => {
      floating.refs.setReference(node)
    },
    [floating.refs]
  )

  return {
    open,
    setOpen,
    setTriggerRef,
    getTriggerProps: getReferenceProps as unknown as UsePopupReturn["getTriggerProps"],
    popupState: {
      open,
      isPositioned: floating.isPositioned,
      placement: floating.placement,
      strategy: floating.strategy,
      floatingStyles: floating.floatingStyles,
      setFloatingRef: floating.refs.setFloating,
      getFloatingProps: getFloatingProps as unknown as PopupState["getFloatingProps"],
      withArrow: options.withArrow ?? false,
      arrowRef,
      arrowContext: floating.context,
      hide: floating.middlewareData.hide
    }
  }
}
