"use client"

import { autoUpdate, useFloating } from "@floating-ui/react"
import { useMemo } from "react"
import { createFloatingMiddleware } from "./middleware"
import type {
  FloatingAutoUpdateOptions,
  FloatingCoreOptions,
  FloatingCoreResult
} from "./types"

/**
 * Normalizes auto-update options for the `autoUpdate` API.
 *
 * @param options - Enable flag or detailed settings object.
 * @returns Normalized settings or `undefined`.
 */
function resolveAutoUpdateOptions(options: boolean | FloatingAutoUpdateOptions | undefined) {
  if (!options) {
    return undefined
  }

  return typeof options === "boolean" ? {} : options
}

/**
 * Base hook adapter over `useFloating`.
 * Direct Floating UI calls are concentrated here.
 *
 * @param options - Positioning and middleware configuration.
 * @returns Floating UI result with middleware data.
 */
export function useFloatingCore(options: FloatingCoreOptions): FloatingCoreResult {
  const middleware = useMemo(
    () =>
      createFloatingMiddleware({
        offset: options.offset,
        flip: options.flip,
        shift: options.shift,
        size: options.size,
        autoPlacement: options.autoPlacement,
        arrow: options.arrow,
        hideOnTriggerDisappearance: options.hideOnTriggerDisappearance
      }),
    [
      options.offset,
      options.flip,
      options.shift,
      options.size,
      options.autoPlacement,
      options.arrow
    ]
  )

  const floating = useFloating({
    open: options.open,
    onOpenChange: options.onOpenChange,
    placement: options.placement,
    strategy: options.strategy,
    middleware,
    whileElementsMounted:
      options.autoUpdate === false
        ? undefined
        : (reference, floatingElement, update) =>
            autoUpdate(
              reference,
              floatingElement,
              update,
              resolveAutoUpdateOptions(options.autoUpdate)
            )
  })
  return {
    ...floating,
    middlewareData: floating.middlewareData
  }
}
