import React from "react"

/** Side of the error text under the field. */
export type FormFieldErrorSide = "left" | "right"

/**
 * Form field wrapper around an input element.
 * Can show a label and an error message.
 */
export interface FormFieldProps {
  /** Children, typically a form input element */
  children?: React.ReactNode
  /** Extra CSS classes for the outer container */
  className?: string
  /** Field label shown above the form element */
  label?: React.ReactNode
  /** Input id for associating with the label (htmlFor) */
  inputId?: string
  /** Error text shown under the form element */
  error?: string
  /** Hide the error text. */
  isErrorTextHidden?: boolean
  /** Side of the error text. Defaults to right. */
  errorSide?: FormFieldErrorSide
  /**
   * When enabled, space for the label is reserved above the field
   * even if label text is missing. Useful for aligning fields in a grid.
   */
  isLabelSpaceReserved?: boolean
  /**
   * When enabled, a * is shown in the label to mark the field as required.
   */
  isRequired?: boolean
}
