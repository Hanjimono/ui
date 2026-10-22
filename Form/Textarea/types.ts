import React from "react"
import { InputVariant } from "../Input/types"

/**
 * Base textarea component for multiline text entry.
 */
export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange" | "value"> {
  /** Field name, required for external form handlers. */
  name: string
  /** Called when the value changes. */
  onChange?: (name: string, value?: string) => void
  /** Extra CSS classes for the root container. */
  className?: string
  /** Field title shown above the textarea */
  label?: string
  /**
   * Reserve label space even when the label is missing.
   * Useful for aligning fields in a grid.
   */
  isLabelSpaceReserved?: boolean
  /** Current field value. */
  value?: string
  /** Error text under the field; also affects textarea styles. */
  error?: string
  /** Force the field to be treated as "filled" for floating label animation. */
  isFilled?: boolean
  /** Pin the field title to the top. Only works with the floating variant. */
  isLabelOnTop?: boolean
  /**
   * Field placeholder.
   * With label animation it may be hidden depending on state.
   */
  placeholder?: string
  /**
   * Disable mouse event handling without applying disabled styles.
   * Useful in composite components where the field is only part of the UI.
   */
  isNoMouseEvent?: boolean
  /** Force the field to look focused. */
  focused?: boolean
  /** Disable the field. */
  disabled?: boolean
  /** Focus handler. */
  onFocus?: () => void
  /** Blur handler. */
  onBlur?: () => void
  /**
   * Visual textarea variant.
   * If omitted, the value from config is used.
   */
  variant?: InputVariant
  /** Automatically change field height based on content. */
  autoResize?: boolean
  /** Minimum number of rows for the textarea. */
  minRows?: number
  /** Maximum number of rows for the textarea. */
  maxRows?: number
}
