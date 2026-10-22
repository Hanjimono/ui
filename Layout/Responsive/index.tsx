import { Direction, ScreenResolution } from "../../Config/layoutTypes"
import { cn } from "../../Utils/cn"
import { getGapClasses } from "../gap"
import { DirectionMap, ResponsiveProps } from "./types"

const baseClassName = "box-border flex"

const directionClassNames = {
  base: {
    row: "flex-row",
    column: "flex-col",
    "row-reverse": "flex-row-reverse",
    "column-reverse": "flex-col-reverse"
  },
  sm: {
    row: "sm:flex-row",
    column: "sm:flex-col",
    "row-reverse": "sm:flex-row-reverse",
    "column-reverse": "sm:flex-col-reverse"
  },
  md: {
    row: "md:flex-row",
    column: "md:flex-col",
    "row-reverse": "md:flex-row-reverse",
    "column-reverse": "md:flex-col-reverse"
  },
  lg: {
    row: "lg:flex-row",
    column: "lg:flex-col",
    "row-reverse": "lg:flex-row-reverse",
    "column-reverse": "lg:flex-col-reverse"
  },
  xl: {
    row: "xl:flex-row",
    column: "xl:flex-col",
    "row-reverse": "xl:flex-row-reverse",
    "column-reverse": "xl:flex-col-reverse"
  },
  xxl: {
    row: "xxl:flex-row",
    column: "xxl:flex-col",
    "row-reverse": "xxl:flex-row-reverse",
    "column-reverse": "xxl:flex-col-reverse"
  }
} as const satisfies Record<ScreenResolution, Record<Direction, string>>

/**
 * Adaptive flex block that changes content direction by viewport size.
 * Direction can be set via a map or per-breakpoint props.
 * When the base direction is omitted, defaults to "row".
 *
 * @param className - Extra CSS classes
 * @param children - Child elements
 * @param gap - Gap between flex items
 * @param direction - Direction settings per breakpoint
 * @param base - Direction at the base breakpoint
 * @param sm - Direction from the sm breakpoint up
 * @param md - Direction from the md breakpoint up
 * @param lg - Direction from the lg breakpoint up
 * @param xl - Direction from the xl breakpoint up
 * @param xxl - Direction from the xxl breakpoint up
 */
function Responsive({ className, children, gap, ...rest }: ResponsiveProps) {
  const hasDirectionProp = "direction" in rest
  const gapClasses = getGapClasses(gap)

  let direction: DirectionMap = {
    base: "row"
  }
  if (hasDirectionProp) {
    direction = rest.direction ?? { base: "row" }
  } else {
    direction = {
      base: rest.base || "row",
      sm: rest.sm,
      md: rest.md,
      lg: rest.lg,
      xl: rest.xl,
      xxl: rest.xxl
    }
  }

  const baseDirection = direction.base ?? "row"

  return (
    <div
      className={cn(
        baseClassName,
        directionClassNames.base[baseDirection],
        direction.sm && directionClassNames.sm[direction.sm],
        direction.md && directionClassNames.md[direction.md],
        direction.lg && directionClassNames.lg[direction.lg],
        direction.xl && directionClassNames.xl[direction.xl],
        direction.xxl && directionClassNames.xxl[direction.xxl],
        gapClasses,
        className
      )}
    >
      {children}
    </div>
  )
}

/** Horizontal flex layout helper. */
export function Inline(props: ResponsiveProps) {
  return <Responsive base="row" {...props} />
}

/** Vertical flex layout helper. */
export function Stack(props: ResponsiveProps) {
  return <Responsive base="column" {...props} />
}

export default Responsive
