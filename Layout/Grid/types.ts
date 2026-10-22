import React from "react"
import { GapSize, ScreenResolution } from "../../Config/layoutTypes"
import { GapMap } from "../gap"

export type { GapMap }

/** Number of columns in the grid */
export type Columns = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

/** Column size / offset settings per breakpoint */
export type SizeAndOffsetMap = {
  [K in ScreenResolution]?: Columns
}

/** Props for the Grid component */
export interface GridProps {
  /** Child elements */
  children?: React.ReactNode
  /** Extra CSS classes */
  className?: string
  /** Number of columns in the grid */
  columns?: Columns
  /** Whether this node is the grid container */
  isContainer?: boolean
  /** Column span per breakpoint */
  size?: SizeAndOffsetMap
  /** Column offset per breakpoint */
  offset?: SizeAndOffsetMap
  /** Gap between grid items */
  gap?: GapMap | GapSize
  /** Hide horizontal overflow of item content */
  isHideXOverflow?: boolean
}
