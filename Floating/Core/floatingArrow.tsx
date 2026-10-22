"use client"

import React, { CSSProperties } from "react"
import { FloatingArrow as FloatingUiArrow, Side } from "@floating-ui/react"
import type { FloatingArrowRenderOptions, FloatingInternalContext } from "./types"

const offsetMap: Map<Side, CSSProperties> = new Map([
  ["top", { transform: "translateY(-1px)" }],
  ["bottom", { transform: "translateY(-1px)" }],
  ["right", { transform: "translateX(-1px)" }],
  ["left", { transform: "translateX(-1px)" }]
])

export type FloatingArrowProps = {
  context: FloatingInternalContext
} & FloatingArrowRenderOptions

/**
 * Internal adapter over `@floating-ui/react` `FloatingArrow`.
 * Extracted into Core so `Popup`-level components do not depend on Floating UI directly.
 *
 * @param context - Internal floating-system context.
 * @returns SVG arrow.
 */
export const FloatingArrow = React.forwardRef<SVGSVGElement, FloatingArrowProps>(
  ({ context, ...options }, ref) => {
    const placement = context.placement.split("-")[0]
    return (
      <FloatingUiArrow
        ref={ref}
        context={context as any}
        style={offsetMap.get(placement as Side)}
        {...options}
      />
    )
  }
)

FloatingArrow.displayName = "FloatingArrow"
