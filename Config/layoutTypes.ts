/** Flex container direction */
export type Direction = "row" | "column" | "row-reverse" | "column-reverse"

/** Screen resolution key for responsive settings */
export type ScreenResolution = "base" | "sm" | "md" | "lg" | "xl" | "xxl"

/** Ordered breakpoint keys for iterating responsive maps */
export const SCREEN_RESOLUTIONS: ScreenResolution[] = ["base", "sm", "md", "lg", "xl", "xxl"]

/** Gap size between layout items */
export type GapSize = "none" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl"
