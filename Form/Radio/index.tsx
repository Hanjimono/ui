"use client"

import React, { useCallback } from "react"
import FormField from "../Field"
import resolvedUiConfig from "../../Config/uiConfig"
import ChoiceControl from "../Checkbox/primitive"
import { RadioProps } from "./types"

const UI_CONFIG = resolvedUiConfig
/** Symbol identifying the component as a form element. */
const FORM_ELEMENT = Symbol.for("ui.form.element")

/**
 * Radio. Several radios with the same `name` describe one value.
 *
 * @param {string} name - Field name shared by related options.
 * @param {string} option - Value of this option.
 * @param {string} value - Current field value.
 * @param {(name: string, value?: string) => void} onChange - Called with `option` when selected.
 * @param {React.ReactNode} label - Label next to the indicator.
 * @param {"start" | "end"} labelPosition - Label side. Defaults from uiConfig.
 * @param {string} error - Error text. Highlights the indicator and is shown under the radio.
 * @param {boolean} isErrorTextHidden - Highlight the indicator without error text.
 * @param {boolean} isNoMouseEvent - Ignore value changes without disabled styles.
 * @param {boolean} disabled - Disable the option.
 * @param {string} className - Extra CSS classes.
 *
 * @returns {JSX.Element} Radio.
 */
const Radio = React.forwardRef<HTMLInputElement, RadioProps>(function Radio(
  {
    name,
    option,
    value,
    onChange,
    label,
    labelPosition,
    error,
    isErrorTextHidden,
    isNoMouseEvent,
    disabled,
    className,
    ...rest
  },
  ref
) {
  const resolvedLabelPosition = labelPosition || UI_CONFIG.formChoiceLabelPosition

  const handleToggle = useCallback(() => {
    onChange?.(name, option)
  }, [name, onChange, option])

  return (
    <FormField error={error} errorSide="left" isErrorTextHidden={isErrorTextHidden}>
      <ChoiceControl
        {...rest}
        ref={ref}
        type="radio"
        indicator="disc"
        name={name}
        inputValue={option}
        checked={value === option}
        label={label}
        labelPosition={resolvedLabelPosition}
        error={error}
        disabled={disabled}
        isNoMouseEvent={isNoMouseEvent}
        className={className}
        onToggle={handleToggle}
      />
    </FormField>
  )
})

// Mark the component as a form element.
;(Radio as unknown as Record<symbol, boolean>)[FORM_ELEMENT] = true

export default Radio
