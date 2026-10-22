"use client"

import React, { useCallback } from "react"
import FormField from "../Field"
import resolvedUiConfig from "../../Config/uiConfig"
import ChoiceControl from "./primitive"
import { CheckboxProps } from "./types"

const UI_CONFIG = resolvedUiConfig
/** Symbol identifying the component as a form element. */
const FORM_ELEMENT = Symbol.for("ui.form.element")

/**
 * Checkbox. Works with an external value and as a form field.
 *
 * @param {string} name - Field name and HTML name attribute.
 * @param {boolean} value - Current value. `true` means checked.
 * @param {(name: string, value?: boolean) => void} onChange - Called with the new value.
 * @param {(name: string) => void} onClear - Accepted from the form wrapper and unused.
 * @param {React.ReactNode} label - Label next to the indicator.
 * @param {"start" | "end"} labelPosition - Label side. Defaults from uiConfig.
 * @param {string} error - Error text. Highlights the indicator and is shown under the checkbox.
 * @param {boolean} isErrorTextHidden - Highlight the indicator without error text.
 * @param {boolean} isNoMouseEvent - Ignore value changes without disabled styles.
 * @param {boolean} indeterminate - Mixed state. Boolean still goes into the form.
 * @param {string} className - Extra CSS classes.
 * @param {boolean} disabled - Disable the checkbox.
 *
 * @returns {JSX.Element} Checkbox.
 */
const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  {
    name,
    value,
    onChange,
    label,
    labelPosition,
    error,
    isErrorTextHidden,
    isNoMouseEvent,
    indeterminate,
    className,
    disabled,
    ...rest
  },
  ref
) {
  const resolvedLabelPosition = labelPosition || UI_CONFIG.formChoiceLabelPosition

  const handleToggle = useCallback(() => {
    onChange?.(name, !value)
  }, [name, onChange, value])

  return (
    <FormField error={error} errorSide="left" isErrorTextHidden={isErrorTextHidden}>
      <ChoiceControl
        {...rest}
        ref={ref}
        type="checkbox"
        indicator="check"
        name={name}
        checked={!!value}
        label={label}
        labelPosition={resolvedLabelPosition}
        error={error}
        disabled={disabled}
        isNoMouseEvent={isNoMouseEvent}
        indeterminate={indeterminate}
        className={className}
        onToggle={handleToggle}
      />
    </FormField>
  )
})

// Mark the component as a form element.
;(Checkbox as unknown as Record<symbol, boolean>)[FORM_ELEMENT] = true

export default Checkbox
