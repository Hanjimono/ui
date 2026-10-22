import React from "react"
import type { ChoiceLabelPosition } from "../Checkbox/types"

/** Direction of the options list. */
export type RadioGroupDirection = "column" | "row"

/** A single option in the RadioGroup array. */
export interface RadioGroupOption {
  /** Option value. */
  option: string
  /** Option label. */
  label: React.ReactNode
  /** Disable only this option. */
  disabled?: boolean
}

/**
 * List of radios in a row or column.
 */
export interface RadioGroupProps {
  /** Field name. */
  name: string
  /** Current value of the selected option. */
  value?: string
  /** Called with the selected option value. */
  onChange?: (name: string, value?: string) => void
  /** Options to render together. */
  options: RadioGroupOption[]
  /** List direction. Defaults to `formRadioGroupDirection`. */
  direction?: RadioGroupDirection
  /** Group label above the list. */
  label?: React.ReactNode
  /** One error for the whole group. */
  error?: string
  /** Highlight indicators but do not show error text under the group. */
  isErrorTextHidden?: boolean
  /** Disable all options. */
  disabled?: boolean
  /** Ignore value changes without disabled styles. */
  isNoMouseEvent?: boolean
  /** Label side for each option. */
  labelPosition?: ChoiceLabelPosition
  /** Extra CSS classes for the field. */
  className?: string
}
