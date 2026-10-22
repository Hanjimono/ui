import type {
  AutoPlacementOptions,
  FlipOptions,
  FloatingContext,
  FloatingArrowProps,
  MiddlewareData,
  OffsetOptions,
  Placement,
  ShiftOptions,
  SizeOptions,
  Strategy,
  UseFloatingReturn,
  VirtualElement,
  HideOptions
} from "@floating-ui/react"
import type { RefObject } from "react"

// ─── Public type aliases ────────────────────────────────────────────
// Consumers of the Floating system should import these types
// instead of using types from `@floating-ui/react` directly.
// If Floating UI is dropped later, consider backward compatibility and verify
// that the new types work correctly with values from the old types.
// TODO: consider custom types with partial feature support, mapping them
// to floating-ui types in code — then dropping floating-ui would only require
// functional compatibility, not type compatibility.
// But there is no time now to build a complex adapter layer mapping our
// properties onto floating-ui properties

export type FloatingPlacement = Placement
export type FloatingStrategy = Strategy
export type FloatingOffsetOptions = OffsetOptions
export type FloatingFlipOptions = FlipOptions
export type FloatingShiftOptions = ShiftOptions
export type FloatingSizeOptions = SizeOptions
export type FloatingAutoPlacementOptions = AutoPlacementOptions
export type FloatingVirtualElement = VirtualElement
export type FloatingHideOptions = HideOptions
export type FloatingHideResult = MiddlewareData["hide"]

/**
 * Internal Floating UI context.
 * Used only between hooks and components of the Floating system.
 */
export type FloatingInternalContext = FloatingContext

/**
 * Public arrow render options.
 * Consumers pass them to `Popup` via the `arrowOptions` prop.
 *
 * Important: `context` and `ref` are managed inside the Floating system.
 */
export type FloatingArrowRenderOptions = Omit<FloatingArrowProps, "context" | "ref">

// ─── Domain types ───────────────────────────────────────────────────

/**
 * Callback for floating element open-state changes.
 *
 * @param open - Whether the floating element is open.
 */
export type FloatingOpenChangeHandler = (open: boolean) => void

/**
 * Configuration for automatic position recalculation via `autoUpdate`.
 */
export type FloatingAutoUpdateOptions = {
  /** Recalculate position on ancestor scroll. */
  ancestorScroll?: boolean
  /** Recalculate position when ancestors resize. */
  ancestorResize?: boolean
  /** Recalculate position when elements resize. */
  elementResize?: boolean
  /** Recalculate position on layout shift. */
  layoutShift?: boolean
  /** Use per-animation-frame updates. */
  animationFrame?: boolean
}

/**
 * Configuration for the middleware responsible for rendering the arrow.
 */
export type FloatingArrowOptions = {
  /** DOM element or ref to the arrow element. */
  element: Element | RefObject<Element | null> | null
  /** Inner padding from the edges of the floating container. */
  padding?: number
}

/**
 * Middleware options for the positioning core.
 */
export type FloatingCoreMiddlewareOptions = {
  /** Configuration for the `offset` middleware. */
  offset?: number | FloatingOffsetOptions
  /** Configuration for the `flip` middleware. */
  flip?: boolean | FloatingFlipOptions
  /** Configuration for the `shift` middleware. */
  shift?: boolean | FloatingShiftOptions
  /** Configuration for the `size` middleware. */
  size?: boolean | FloatingSizeOptions
  /** Configuration for the `autoPlacement` middleware. */
  autoPlacement?: boolean | FloatingAutoPlacementOptions
  /** Configuration for the `arrow` middleware. */
  arrow?: FloatingArrowOptions
  /** Configuration for the `hide` middleware. */
  hideOnTriggerDisappearance?: boolean | FloatingHideOptions
}

/**
 * Full set of options for starting the Floating UI core.
 */
export type FloatingCoreOptions = FloatingCoreMiddlewareOptions & {
  /** Controlled open state. */
  open?: boolean
  /** Open-state change handler. */
  onOpenChange?: FloatingOpenChangeHandler
  /** Base placement of the container. */
  placement?: FloatingPlacement
  /** Positioning strategy (`absolute` or `fixed`). */
  strategy?: FloatingStrategy
  /** Controls automatic position recalculation. */
  autoUpdate?: boolean | FloatingAutoUpdateOptions
}

/**
 * Result of the positioning core.
 */
export type FloatingCoreResult = UseFloatingReturn & {
  /** Middleware data, e.g. `arrow`, `shift`, `size`. */
  middlewareData: MiddlewareData
}

/**
 * Type of the reference element (DOM or virtual anchor).
 */
export type FloatingReference = Element | FloatingVirtualElement | null

/**
 * Type of a virtual anchor element for cursor/selection-range, etc.
 */
export type FloatingVirtualAnchor = FloatingVirtualElement
