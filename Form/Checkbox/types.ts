import React from "react"

/** Indicator shape: checkmark for checkbox, disc for radio. */
export type ChoiceIndicator = "check" | "disc"

/** Label direction relative to the indicator. */
export type ChoiceLabelPosition = "start" | "end"

/** Native control type. */
export type ChoiceInputType = "checkbox" | "radio"

/**
 * Shared checkbox / radio primitive.
 * Renders a native input, indicator, and label.
 */
export interface ChoiceControlProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "value" | "type" | "checked" | "name" | "defaultChecked" | "defaultValue"
  > {
  /** Native input type. */
  type: ChoiceInputType
  /** Indicator shape. */
  indicator: ChoiceIndicator
  /** Field name and HTML name attribute. */
  name: string
  /** Whether the control is selected. */
  checked: boolean
  /** Label next to the indicator. */
  label?: React.ReactNode
  /** Label direction. */
  labelPosition?: ChoiceLabelPosition
  /** Enables error styles and aria-invalid. */
  error?: string
  /** Disable the control. */
  disabled?: boolean
  /** Ignore clicks and keyboard without disabled styles. */
  isNoMouseEvent?: boolean
  /** Extra CSS classes for the root container. */
  className?: string
  /** HTML value attribute. For radio this is the option value. */
  inputValue?: string
  /** Mixed state (for checkbox). */
  indeterminate?: boolean
  /** Called when the user changes the control and it is not blocked. */
  onToggle?: () => void
}

/**
 * Checkbox. Field value is always boolean.
 */
export interface CheckboxProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "value" | "type" | "checked" | "name" | "defaultChecked" | "defaultValue"
  > {
  /** Field name and HTML name attribute. */
  name: string
  /** Current value. `true` means checked. */
  value?: boolean
  /** Called with the new boolean. */
  onChange?: (name: string, value?: boolean) => void
  /** Label next to the indicator. */
  label?: React.ReactNode
  /** Label direction. */
  labelPosition?: ChoiceLabelPosition
  /** Error text under the control. */
  error?: string
  /** Highlight the indicator but do not show error text. */
  isErrorTextHidden?: boolean
  /** Ignore value changes without disabled styles. */
  isNoMouseEvent?: boolean
  /** Mixed state. Boolean still goes into the form. */
  indeterminate?: boolean
  /** Extra CSS classes for the root container. */
  className?: string
  /** Disable the checkbox. */
  disabled?: boolean
}
