"use client"

import React, { useId } from "react"
import FormField from "../Field"
import Radio from "../Radio"
import resolvedUiConfig from "../../Config/uiConfig"
import { RadioGroupProps } from "./types"
import { cn } from "../../Utils/cn"
import { radioGroupDirectionClassNames, radioGroupOptionsClassName } from "./radioGroupClassNames"

const UI_CONFIG = resolvedUiConfig
/** Symbol identifying the component as a form element. */
const FORM_ELEMENT = Symbol.for("ui.form.element")

/**
 * List of radios in a row or column.
 *
 * @param {string} name - Field name.
 * @param {string} value - Current value, `option` of the selected option.
 * @param {(name: string, value?: string) => void} onChange - Called with the selected option value.
 * @param {(name: string) => void} onClear - Accepted from the form wrapper and unused.
 * @param {RadioGroupOption[]} options - Options to render.
 * @param {"column" | "row"} direction - List direction. Defaults from uiConfig.
 * @param {React.ReactNode} label - Group label.
 * @param {string} error - One error for the group.
 * @param {boolean} isErrorTextHidden - Highlight indicators but do not show error text under the group.
 * @param {boolean} disabled - Disable all options.
 * @param {boolean} isNoMouseEvent - Ignore value changes.
 * @param {"start" | "end"} labelPosition - Label side for each option.
 * @param {string} className - Extra CSS classes for the field.
 *
 * @returns {JSX.Element} Radio group.
 */
function RadioGroup({
  name,
  value,
  onChange,
  options,
  direction,
  label,
  error,
  isErrorTextHidden,
  disabled,
  isNoMouseEvent,
  labelPosition,
  className
}: RadioGroupProps) {
  const generatedId = useId()
  const groupId = `radio-group-${name}-${generatedId}`
  const resolvedDirection = direction || UI_CONFIG.formRadioGroupDirection
  const optionsClassName = cn(
    radioGroupOptionsClassName,
    radioGroupDirectionClassNames[resolvedDirection]
  )

  return (
    <FormField
      className={className}
      label={label}
      error={error}
      errorSide="left"
      isErrorTextHidden={isErrorTextHidden}
      inputId={groupId}
    >
      <div
        id={groupId}
        role="radiogroup"
        className={optionsClassName}
        aria-invalid={!!error || undefined}
      >
        {options.map((item) => (
          <Radio
            key={item.option}
            name={name}
            option={item.option}
            label={item.label}
            value={value}
            onChange={onChange}
            disabled={!!disabled || !!item.disabled}
            isNoMouseEvent={isNoMouseEvent}
            labelPosition={labelPosition}
            error={error}
            isErrorTextHidden
          />
        ))}
      </div>
    </FormField>
  )
}

// Mark the component as a form element.
;(RadioGroup as unknown as Record<symbol, boolean>)[FORM_ELEMENT] = true

export default RadioGroup
