import { ScreenResolution } from "../../Config/layoutTypes"
import { Columns } from "./types"

export const gridBlockClassName = "box-border flex flex-initial flex-row"

export const gridContainerClassName = "w-full flex-wrap"

/** Matches work-ui item width / offset calc against --grid-cols, --grid-span, --grid-gap, --grid-offset */
export const gridItemClassName = [
  "min-w-0 grow-0",
  "w-[calc(100%*var(--grid-span,1)/var(--grid-cols)-(var(--grid-cols)-var(--grid-span,1))*(var(--grid-gap,0)/var(--grid-cols)))]",
  "ml-[calc(100%*var(--grid-offset,0)/var(--grid-cols)+var(--grid-gap,0rem)*var(--grid-offset,0)/var(--grid-cols))]"
].join(" ")

export const columnsClassNames = {
  1: "[--grid-cols:1]",
  2: "[--grid-cols:2]",
  3: "[--grid-cols:3]",
  4: "[--grid-cols:4]",
  5: "[--grid-cols:5]",
  6: "[--grid-cols:6]",
  7: "[--grid-cols:7]",
  8: "[--grid-cols:8]",
  9: "[--grid-cols:9]",
  10: "[--grid-cols:10]",
  11: "[--grid-cols:11]",
  12: "[--grid-cols:12]"
} as const satisfies Record<Columns, string>

export const sizeClassNames = {
  base: {
    1: "[--grid-span:1]",
    2: "[--grid-span:2]",
    3: "[--grid-span:3]",
    4: "[--grid-span:4]",
    5: "[--grid-span:5]",
    6: "[--grid-span:6]",
    7: "[--grid-span:7]",
    8: "[--grid-span:8]",
    9: "[--grid-span:9]",
    10: "[--grid-span:10]",
    11: "[--grid-span:11]",
    12: "[--grid-span:12]"
  },
  sm: {
    1: "sm:[--grid-span:1]",
    2: "sm:[--grid-span:2]",
    3: "sm:[--grid-span:3]",
    4: "sm:[--grid-span:4]",
    5: "sm:[--grid-span:5]",
    6: "sm:[--grid-span:6]",
    7: "sm:[--grid-span:7]",
    8: "sm:[--grid-span:8]",
    9: "sm:[--grid-span:9]",
    10: "sm:[--grid-span:10]",
    11: "sm:[--grid-span:11]",
    12: "sm:[--grid-span:12]"
  },
  md: {
    1: "md:[--grid-span:1]",
    2: "md:[--grid-span:2]",
    3: "md:[--grid-span:3]",
    4: "md:[--grid-span:4]",
    5: "md:[--grid-span:5]",
    6: "md:[--grid-span:6]",
    7: "md:[--grid-span:7]",
    8: "md:[--grid-span:8]",
    9: "md:[--grid-span:9]",
    10: "md:[--grid-span:10]",
    11: "md:[--grid-span:11]",
    12: "md:[--grid-span:12]"
  },
  lg: {
    1: "lg:[--grid-span:1]",
    2: "lg:[--grid-span:2]",
    3: "lg:[--grid-span:3]",
    4: "lg:[--grid-span:4]",
    5: "lg:[--grid-span:5]",
    6: "lg:[--grid-span:6]",
    7: "lg:[--grid-span:7]",
    8: "lg:[--grid-span:8]",
    9: "lg:[--grid-span:9]",
    10: "lg:[--grid-span:10]",
    11: "lg:[--grid-span:11]",
    12: "lg:[--grid-span:12]"
  },
  xl: {
    1: "xl:[--grid-span:1]",
    2: "xl:[--grid-span:2]",
    3: "xl:[--grid-span:3]",
    4: "xl:[--grid-span:4]",
    5: "xl:[--grid-span:5]",
    6: "xl:[--grid-span:6]",
    7: "xl:[--grid-span:7]",
    8: "xl:[--grid-span:8]",
    9: "xl:[--grid-span:9]",
    10: "xl:[--grid-span:10]",
    11: "xl:[--grid-span:11]",
    12: "xl:[--grid-span:12]"
  },
  xxl: {
    1: "xxl:[--grid-span:1]",
    2: "xxl:[--grid-span:2]",
    3: "xxl:[--grid-span:3]",
    4: "xxl:[--grid-span:4]",
    5: "xxl:[--grid-span:5]",
    6: "xxl:[--grid-span:6]",
    7: "xxl:[--grid-span:7]",
    8: "xxl:[--grid-span:8]",
    9: "xxl:[--grid-span:9]",
    10: "xxl:[--grid-span:10]",
    11: "xxl:[--grid-span:11]",
    12: "xxl:[--grid-span:12]"
  }
} as const satisfies Record<ScreenResolution, Record<Columns, string>>

export const offsetClassNames = {
  base: {
    1: "[--grid-offset:1]",
    2: "[--grid-offset:2]",
    3: "[--grid-offset:3]",
    4: "[--grid-offset:4]",
    5: "[--grid-offset:5]",
    6: "[--grid-offset:6]",
    7: "[--grid-offset:7]",
    8: "[--grid-offset:8]",
    9: "[--grid-offset:9]",
    10: "[--grid-offset:10]",
    11: "[--grid-offset:11]",
    12: "[--grid-offset:12]"
  },
  sm: {
    1: "sm:[--grid-offset:1]",
    2: "sm:[--grid-offset:2]",
    3: "sm:[--grid-offset:3]",
    4: "sm:[--grid-offset:4]",
    5: "sm:[--grid-offset:5]",
    6: "sm:[--grid-offset:6]",
    7: "sm:[--grid-offset:7]",
    8: "sm:[--grid-offset:8]",
    9: "sm:[--grid-offset:9]",
    10: "sm:[--grid-offset:10]",
    11: "sm:[--grid-offset:11]",
    12: "sm:[--grid-offset:12]"
  },
  md: {
    1: "md:[--grid-offset:1]",
    2: "md:[--grid-offset:2]",
    3: "md:[--grid-offset:3]",
    4: "md:[--grid-offset:4]",
    5: "md:[--grid-offset:5]",
    6: "md:[--grid-offset:6]",
    7: "md:[--grid-offset:7]",
    8: "md:[--grid-offset:8]",
    9: "md:[--grid-offset:9]",
    10: "md:[--grid-offset:10]",
    11: "md:[--grid-offset:11]",
    12: "md:[--grid-offset:12]"
  },
  lg: {
    1: "lg:[--grid-offset:1]",
    2: "lg:[--grid-offset:2]",
    3: "lg:[--grid-offset:3]",
    4: "lg:[--grid-offset:4]",
    5: "lg:[--grid-offset:5]",
    6: "lg:[--grid-offset:6]",
    7: "lg:[--grid-offset:7]",
    8: "lg:[--grid-offset:8]",
    9: "lg:[--grid-offset:9]",
    10: "lg:[--grid-offset:10]",
    11: "lg:[--grid-offset:11]",
    12: "lg:[--grid-offset:12]"
  },
  xl: {
    1: "xl:[--grid-offset:1]",
    2: "xl:[--grid-offset:2]",
    3: "xl:[--grid-offset:3]",
    4: "xl:[--grid-offset:4]",
    5: "xl:[--grid-offset:5]",
    6: "xl:[--grid-offset:6]",
    7: "xl:[--grid-offset:7]",
    8: "xl:[--grid-offset:8]",
    9: "xl:[--grid-offset:9]",
    10: "xl:[--grid-offset:10]",
    11: "xl:[--grid-offset:11]",
    12: "xl:[--grid-offset:12]"
  },
  xxl: {
    1: "xxl:[--grid-offset:1]",
    2: "xxl:[--grid-offset:2]",
    3: "xxl:[--grid-offset:3]",
    4: "xxl:[--grid-offset:4]",
    5: "xxl:[--grid-offset:5]",
    6: "xxl:[--grid-offset:6]",
    7: "xxl:[--grid-offset:7]",
    8: "xxl:[--grid-offset:8]",
    9: "xxl:[--grid-offset:9]",
    10: "xxl:[--grid-offset:10]",
    11: "xxl:[--grid-offset:11]",
    12: "xxl:[--grid-offset:12]"
  }
} as const satisfies Record<ScreenResolution, Record<Columns, string>>
