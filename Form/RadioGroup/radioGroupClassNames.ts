import type { RadioGroupDirection } from "./types"

export const radioGroupOptionsClassName = "flex gap-form-choice-group-gap"

export const radioGroupDirectionClassNames = {
  column: "flex-col items-start",
  row: "flex-row flex-wrap items-center [&>*]:w-auto [&>*]:flex-none"
} as const satisfies Record<RadioGroupDirection, string>
