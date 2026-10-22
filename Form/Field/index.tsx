"use client"

import React from "react"
import Text from "../../Presentation/Text"
import resolvedUiConfig from "../../Config/uiConfig"
import { FormFieldProps } from "./types"
import { cn } from "../../Utils/cn"
import {
  fieldContentClassName,
  fieldErrorClassName,
  fieldErrorLeftClassName,
  fieldLabelClassName,
  fieldRootClassName
} from "./fieldClassNames"

const UI_CONFIG = resolvedUiConfig

/**
 * Form field component wrapping an input element.
 * Can display a label and an error message.
 *
 * @param {string} className - Extra CSS classes for the container.
 * @param {React.ReactNode} label - Label text (title) for the field.
 * @param {string} inputId - Input element id for associating with the label.
 * @param {string} error - Error text shown under the field.
 * @param {boolean} isErrorTextHidden - Do not show error text under the field.
 * @param {"left" | "right"} errorSide - Side of the error text. Defaults to right.
 * @param {boolean} isLabelSpaceReserved - Reserve label space even when label is omitted.
 * @param {boolean} isRequired - When enabled, a * is shown in the label to mark the field as required.
 *
 * @returns {JSX.Element} Form field component.
 */
const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(function FormField(
  {
    children,
    className,
    label,
    error,
    isErrorTextHidden,
    errorSide = "right",
    isLabelSpaceReserved,
    inputId,
    isRequired
  },
  ref
) {
  const rootClassName = cn(fieldRootClassName, className)
  const errorClassName = cn(fieldErrorClassName, errorSide === "left" && fieldErrorLeftClassName)
  const errorSize = UI_CONFIG.formFieldErrorSize
  const showErrorText = !!error && !isErrorTextHidden
  const showLabel = !!label || !!isLabelSpaceReserved

  return (
    <div ref={ref} className={rootClassName}>
      {showLabel && (
        <label htmlFor={inputId} className={fieldLabelClassName}>
          {!!label && (
            <Text type="truncate" size="inherit">
              {label}
            </Text>
          )}
          {!!label && !!isRequired && (
            <Text color="danger" size="inherit">
              *
            </Text>
          )}
        </label>
      )}
      <div className={fieldContentClassName}>{children}</div>
      {showErrorText && (
        <Text className={errorClassName} type="truncate" size={errorSize} color="danger">
          {error}
        </Text>
      )}
    </div>
  )
})

export default FormField
