import { GapSize, SCREEN_RESOLUTIONS, ScreenResolution } from "../Config/layoutTypes"

/** Gap sizes per breakpoint */
export type GapMap = {
  [K in ScreenResolution]?: GapSize
}

/** Sets `gap` and `--grid-gap` (inherited by Grid items for width calc). */
const gapClassNames = {
  base: {
    none: "gap-none [--grid-gap:var(--spacing-none)]",
    xs: "gap-xs [--grid-gap:var(--spacing-xs)]",
    sm: "gap-sm [--grid-gap:var(--spacing-sm)]",
    md: "gap-md [--grid-gap:var(--spacing-md)]",
    lg: "gap-lg [--grid-gap:var(--spacing-lg)]",
    xl: "gap-xl [--grid-gap:var(--spacing-xl)]",
    xxl: "gap-xxl [--grid-gap:var(--spacing-xxl)]"
  },
  sm: {
    none: "sm:gap-none sm:[--grid-gap:var(--spacing-none)]",
    xs: "sm:gap-xs sm:[--grid-gap:var(--spacing-xs)]",
    sm: "sm:gap-sm sm:[--grid-gap:var(--spacing-sm)]",
    md: "sm:gap-md sm:[--grid-gap:var(--spacing-md)]",
    lg: "sm:gap-lg sm:[--grid-gap:var(--spacing-lg)]",
    xl: "sm:gap-xl sm:[--grid-gap:var(--spacing-xl)]",
    xxl: "sm:gap-xxl sm:[--grid-gap:var(--spacing-xxl)]"
  },
  md: {
    none: "md:gap-none md:[--grid-gap:var(--spacing-none)]",
    xs: "md:gap-xs md:[--grid-gap:var(--spacing-xs)]",
    sm: "md:gap-sm md:[--grid-gap:var(--spacing-sm)]",
    md: "md:gap-md md:[--grid-gap:var(--spacing-md)]",
    lg: "md:gap-lg md:[--grid-gap:var(--spacing-lg)]",
    xl: "md:gap-xl md:[--grid-gap:var(--spacing-xl)]",
    xxl: "md:gap-xxl md:[--grid-gap:var(--spacing-xxl)]"
  },
  lg: {
    none: "lg:gap-none lg:[--grid-gap:var(--spacing-none)]",
    xs: "lg:gap-xs lg:[--grid-gap:var(--spacing-xs)]",
    sm: "lg:gap-sm lg:[--grid-gap:var(--spacing-sm)]",
    md: "lg:gap-md lg:[--grid-gap:var(--spacing-md)]",
    lg: "lg:gap-lg lg:[--grid-gap:var(--spacing-lg)]",
    xl: "lg:gap-xl lg:[--grid-gap:var(--spacing-xl)]",
    xxl: "lg:gap-xxl lg:[--grid-gap:var(--spacing-xxl)]"
  },
  xl: {
    none: "xl:gap-none xl:[--grid-gap:var(--spacing-none)]",
    xs: "xl:gap-xs xl:[--grid-gap:var(--spacing-xs)]",
    sm: "xl:gap-sm xl:[--grid-gap:var(--spacing-sm)]",
    md: "xl:gap-md xl:[--grid-gap:var(--spacing-md)]",
    lg: "xl:gap-lg xl:[--grid-gap:var(--spacing-lg)]",
    xl: "xl:gap-xl xl:[--grid-gap:var(--spacing-xl)]",
    xxl: "xl:gap-xxl xl:[--grid-gap:var(--spacing-xxl)]"
  },
  xxl: {
    none: "xxl:gap-none xxl:[--grid-gap:var(--spacing-none)]",
    xs: "xxl:gap-xs xxl:[--grid-gap:var(--spacing-xs)]",
    sm: "xxl:gap-sm xxl:[--grid-gap:var(--spacing-sm)]",
    md: "xxl:gap-md xxl:[--grid-gap:var(--spacing-md)]",
    lg: "xxl:gap-lg xxl:[--grid-gap:var(--spacing-lg)]",
    xl: "xxl:gap-xl xxl:[--grid-gap:var(--spacing-xl)]",
    xxl: "xxl:gap-xxl xxl:[--grid-gap:var(--spacing-xxl)]"
  }
} as const satisfies Record<ScreenResolution, Record<GapSize, string>>

/**
 * Resolve gap prop into Tailwind gap utility classes.
 * Class names are looked up from static literals so the Tailwind scanner can see them.
 */
export function getGapClasses(gap: GapSize | GapMap | undefined) {
  if (gap === undefined) {
    return undefined
  }
  if (typeof gap === "string") {
    return gapClassNames.base[gap]
  }
  return SCREEN_RESOLUTIONS.map((bp) => {
    const val = gap[bp]
    if (val == null) {
      return null
    }
    return gapClassNames[bp][val]
  })
}
