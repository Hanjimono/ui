import React from "react"
import { Direction, GapSize, ScreenResolution } from "../../Config/layoutTypes"
import { GapMap } from "../gap"

/** Direction settings per breakpoint */
export type DirectionMap = {
  [K in ScreenResolution]?: Direction
}

/** Shared props for Responsive */
interface ResponsiveBaseProps {
  /** Child elements */
  children: React.ReactNode
  /** Extra CSS classes */
  className?: string
  /** Gap between flex items */
  gap?: GapMap | GapSize
}

/** Directions via individual breakpoint props */
interface ResponsiveBreakpointDirectionsProps extends ResponsiveBaseProps {
  /** Direction at the base breakpoint */
  base?: Direction
  /** Direction from the sm breakpoint up */
  sm?: Direction
  /** Direction from the md breakpoint up */
  md?: Direction
  /** Direction from the lg breakpoint up */
  lg?: Direction
  /** Direction from the xl breakpoint up */
  xl?: Direction
  /** Direction from the xxl breakpoint up */
  xxl?: Direction
}

/** Directions via a single settings object */
export interface ResponsiveSettingsDirectionsProps extends ResponsiveBaseProps {
  /** Direction settings per breakpoint */
  direction: DirectionMap
}

/** Props for the Responsive component */
export type ResponsiveProps =
  | ResponsiveBreakpointDirectionsProps
  | ResponsiveSettingsDirectionsProps
