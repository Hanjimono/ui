import { arrow, autoPlacement, flip, hide, offset, shift, size } from "@floating-ui/react"
import type { Middleware } from "@floating-ui/react"
import type { FloatingCoreMiddlewareOptions } from "./types"

/**
 * Builds a Floating UI middleware pipeline from project options.
 *
 * @param options - External middleware configuration.
 * @returns Ordered middleware array for `useFloating`.
 */
export function createFloatingMiddleware(options: FloatingCoreMiddlewareOptions): Middleware[] {
  const middleware: Middleware[] = []

  if (typeof options.offset !== "undefined") {
    middleware.push(offset(options.offset))
  }

  if (options.autoPlacement) {
    middleware.push(
      autoPlacement(typeof options.autoPlacement === "boolean" ? undefined : options.autoPlacement)
    )
  }

  if (options.flip) {
    middleware.push(flip(typeof options.flip === "boolean" ? undefined : options.flip))
  }

  if (options.shift) {
    middleware.push(shift(typeof options.shift === "boolean" ? undefined : options.shift))
  }

  if (options.size) {
    middleware.push(size(typeof options.size === "boolean" ? undefined : options.size))
  }

  if (options.hideOnTriggerDisappearance) {
    middleware.push(
      hide(
        typeof options.hideOnTriggerDisappearance === "boolean"
          ? undefined
          : options.hideOnTriggerDisappearance
      )
    )
  }

  if (options.arrow?.element) {
    middleware.push(arrow({ element: options.arrow.element, padding: options.arrow.padding }))
  }

  return middleware
}
