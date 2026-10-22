import React from "react"
import type { ChoiceLabelPosition } from "../Checkbox/types"

/**
 * A single radio option. A standalone form field: several radios with the same `name` share one value.
 */
export interface RadioProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "value" | "type" | "checked" | "name" | "defaultChecked" | "defaultValue"
  > {
  /** Field name. Shared by radios of one value group. */
  name: string
  /** Value of this option. Passed to `onChange` when selected. */
  option: string
  /** Current field value. Option is checked when it matches `option`. */
  value?: string
  /** Called with the selected option value. */
  onChange?: (name: string, value?: string) => void
  /** Label next to the indicator. */
  label?: React.ReactNode
  /** Label direction. */
  labelPosition?: ChoiceLabelPosition
  /** Error text for this radio. */
  error?: string
  /** Highlight the indicator but do not show error text under the radio. */
  isErrorTextHidden?: boolean
  /** Ignore value changes without disabled styles. */
  isNoMouseEvent?: boolean
  /** Disable the option. */
  disabled?: boolean
  /** Extra CSS classes for the root container. */
  className?: string
}
