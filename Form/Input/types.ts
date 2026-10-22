import React, { FocusEventHandler, HTMLInputTypeAttribute } from "react"
import type { MaskitoOptions } from "@maskito/core"
import { Formatter } from "./formatters"
import { inputMasks } from "./masks"
import { IconProps } from "../../Presentation/Icon/types"

/**
 * Ready-made mask from `masks.ts`.
 * `options` paint the field; `formatter` may rewrite the string before writing to the form.
 */
export type InputMask = {
  /** Maskito options for mask display. */
  options: MaskitoOptions
  /**
   * Transforms the string from the input into the form value.
   * If omitted, the form receives the string as shown in the input.
   */
  formatter?: (value: string) => string
  /**
   * String shown in an empty focused field.
   * Not written to the form value.
   */
  focusValue?: string
}

/** Key of a ready-made mask from `inputMasks`. */
export type InputMaskName = keyof typeof inputMasks

export type InputVariant = "floating" | "simple" | "underlined"

/**
 * Base input component for text entry.
 */
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  /** Input name, required for external form handlers. */
  name: string
  /** Called when the value changes. */
  onChange?: (name: string, value?: any) => void
  /** Called when the clear button is pressed. */
  onClear?: (name: string) => void
  /**
   * Stop event propagation on the clear button.
   * Enabled by default so composite controls (e.g. Select) can listen for click on the trigger
   * without the clear click opening the popup.
   */
  stopPropagationOnClear?: boolean
  /** Extra CSS classes for the root container. */
  className?: string
  /** Field title shown above the input */
  label?: string
  /**
   * Reserve label space even when the label is missing.
   * Useful for aligning fields in a grid.
   */
  isLabelSpaceReserved?: boolean
  /**
   * Current field value.
   * Used for controlled value management from the parent.
   */
  value?: string | number
  /** Whether to show the clear button. */
  isClearable?: boolean
  /** Leading icon: icon name string or icon settings object. */
  icon?: IconProps | string
  /** Trailing icon: icon name string or icon settings object. */
  endIcon?: IconProps | string
  /** Whether to show a loading indicator. */
  isLoading?: boolean
  /** Error text under the field; also affects input styles. */
  error?: string
  /** Force the field to be treated as "filled" for floating label animation. */
  isFilled?: boolean
  /** Pin the field title to the top (above the input). Only works with the floating label variant. */
  isLabelOnTop?: boolean
  /** HTML input type. Defaults to "text". */
  type?: HTMLInputTypeAttribute
  /**
   * Field placeholder.
   * With label animation it may be hidden depending on state.
   */
  placeholder?: string
  /**
   * Formatting of the entered value.
   * One or more values can be passed.
   * Formatters run on every value change.
   * Do not use together with masks.
   */
  formatter?: Formatter | Formatter[]
  /**
   * Key of a ready-made mask from `masks.ts`.
   */
  mask?: InputMaskName
  /**
   * Direct Maskito options.
   * Lets you implement any mask manually.
   */
  maskitoOptions?: MaskitoOptions | null
  /**
   * Disable mouse event handling without applying disabled styles.
   * Useful in composite components where the input is only part of the UI.
   */
  isNoMouseEvent?: boolean
  /** Force the field to look focused. */
  focused?: boolean
  /** Disable the input. */
  disabled?: boolean
  /** Focus handler. */
  onFocus?: FocusEventHandler<HTMLElement>
  /** Blur handler. */
  onBlur?: FocusEventHandler<HTMLElement>
  /**
   * Visual input variant.
   * If omitted, the value from config is used.
   */
  variant?: InputVariant
}

/**
 * Props for the floating label.
 */
export type FloatingLabelProps = {
  /** Label text. */
  label?: string
  /** Input element id for associating with the label. */
  inputId: string
  /** Whether the label should be pinned to the top. */
  isLabelUp: boolean
  /** Whether the field has an error. */
  hasError: boolean
  /** Whether there is a leading icon. */
  hasLeadingIcon: boolean
  /** Extra CSS class for the label. */
  className?: string
}

/**
 * Props for the border around the input with a floating label.
 */
export type FloatingFieldsetProps = {
  /** Whether the field is active (focused or forced). */
  isActive: boolean
  /** Whether the field has an error. */
  hasError: boolean
  /** Label text. */
  label?: string
  /** Whether the label should be pinned to the top. */
  isLabelUp: boolean
  /** Extra CSS class for the fieldset. */
  className?: string
}
