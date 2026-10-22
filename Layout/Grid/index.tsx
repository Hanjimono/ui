import { SCREEN_RESOLUTIONS, ScreenResolution } from "../../Config/layoutTypes"
import { cn } from "../../Utils/cn"
import { getGapClasses } from "../gap"
import {
  columnsClassNames,
  gridBlockClassName,
  gridContainerClassName,
  gridItemClassName,
  offsetClassNames,
  sizeClassNames
} from "./gridClassNames"
import { Columns, GridProps, SizeAndOffsetMap } from "./types"

function mapBreakpointClasses(
  map: SizeAndOffsetMap | undefined,
  classNames: Record<ScreenResolution, Record<Columns, string>>
) {
  if (!map) {
    return undefined
  }
  return SCREEN_RESOLUTIONS.map((bp) => {
    const val = map[bp]
    if (val == null) {
      return null
    }
    return classNames[bp][val]
  })
}

/**
 * Adaptive grid for laying out content.
 * Controls column count, gap, span, and offset per breakpoint.
 *
 * @param children - Child elements
 * @param className - Extra CSS classes
 * @param isContainer - Whether this node is the grid container
 * @param columns - Number of columns in the grid
 * @param size - Column span per breakpoint
 * @param offset - Column offset per breakpoint
 * @param gap - Gap between grid items
 * @param isHideXOverflow - Hide horizontal overflow of item content
 */
function Grid({
  children,
  className,
  isContainer,
  columns = 12,
  size,
  offset,
  gap,
  isHideXOverflow
}: GridProps) {
  const gapClasses = getGapClasses(gap)
  const sizeClasses = mapBreakpointClasses(size, sizeClassNames)
  const offsetClasses = mapBreakpointClasses(offset, offsetClassNames)

  let roleClassName = gridItemClassName
  if (isContainer) {
    roleClassName = cn(gridContainerClassName, columnsClassNames[columns])
  }

  return (
    <div
      className={cn(
        gridBlockClassName,
        roleClassName,
        isHideXOverflow && "overflow-x-hidden",
        gapClasses,
        sizeClasses,
        offsetClasses,
        className
      )}
    >
      {children}
    </div>
  )
}

export { getGapClasses } from "../gap"
export type { GapMap } from "../gap"
export default Grid
