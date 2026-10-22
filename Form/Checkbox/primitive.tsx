"use client"

import React, { useCallback, useId, useLayoutEffect, useRef } from "react"
import Text from "../../Presentation/Text"
import resolvedUiConfig from "../../Config/uiConfig"
import { ChoiceControlProps } from "./types"
import { cn } from "../../Utils/cn"
import {
  choiceCaptionClassName,
  choiceCheckedClassName,
  choiceControlClassName,
  choiceDisabledClassName,
  choiceErroredIndicatorClassName,
  choiceIndicatorCheckClassName,
  choiceIndicatorClassName,
  choiceIndicatorDiscClassName,
  choiceIndicatorIndeterminateClassName,
  choiceInputClassName,
  choiceLabelStartClassName,
  choiceNoMouseEventClassName
} from "./choiceClassNames"

const UI_CONFIG = resolvedUiConfig

/**
 * Native checkbox or radio with indicator and label.
 *
 * @param {string} type - Native input type.
 * @param {string} indicator - Indicator shape: check or disc.
 * @param {string} name - Field name.
 * @param {boolean} checked - Whether the control is selected.
 * @param {React.ReactNode} label - Label next to the indicator.
 * @param {string} labelPosition - Label direction.
 * @param {string} error - Enables error styles and aria-invalid.
 * @param {boolean} disabled - Disable the control.
 * @param {boolean} isNoMouseEvent - Ignore mouse presses.
 * @param {string} className - Extra CSS classes.
 * @param {string} inputValue - HTML value attribute. For radio this is the option value.
 * @param {boolean} indeterminate - Mixed checkbox state.
 * @param {() => void} onToggle - Called on change.
 *
 * @returns {JSX.Element} Control with a native input.
 */
const ChoiceControl = React.forwardRef<HTMLInputElement, ChoiceControlProps>(function ChoiceControl(
  {
    type,
    indicator,
    name,
    checked,
    label,
    labelPosition,
    error,
    disabled,
    isNoMouseEvent,
    className,
    inputValue,
    indeterminate,
    onToggle,
    onFocus,
    onBlur,
    ...rest
  },
  ref
) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const generatedId = useId()
  const inputId = `choice-${name}-${generatedId}`
  const resolvedLabelPosition = labelPosition || UI_CONFIG.formChoiceLabelPosition
  let tabIndex: number | undefined
  if (isNoMouseEvent) {
    tabIndex = -1
  }
  let ariaChecked: "mixed" | undefined
  if (type === "checkbox" && indeterminate) {
    ariaChecked = "mixed"
  }

  const handleChange = () => {
    if (disabled || isNoMouseEvent) return
    onToggle?.()
  }

  // ref is needed to set checked and indeterminate in the DOM correctly; because the outer ref
  // may be a function, in that case we still keep our own node for the internal ref
  const setInputRef = useCallback(
    (node: HTMLInputElement | null) => {
      inputRef.current = node
      if (typeof ref === "function") {
        ref(node)
        return
      }
      if (ref) {
        ref.current = node
      }
    },
    [ref]
  )

  // With radio inputs sharing one name the browser may toggle the group and overwrite the checked property,
  // so we set checked and indeterminate in the DOM manually from props
  useLayoutEffect(() => {
    const node = inputRef.current
    if (!node) return
    node.indeterminate = type === "checkbox" && !!indeterminate
    if (node.checked !== checked) {
      node.checked = checked
    }
  }, [checked, indeterminate, type])

  let indicatorShapeClassName = choiceIndicatorCheckClassName
  if (indicator === "disc") {
    indicatorShapeClassName = choiceIndicatorDiscClassName
  }

  const controlClassName = cn(
    choiceControlClassName,
    resolvedLabelPosition === "start" && choiceLabelStartClassName,
    !!error && choiceErroredIndicatorClassName,
    disabled && choiceDisabledClassName,
    isNoMouseEvent && choiceNoMouseEventClassName,
    checked && choiceCheckedClassName,
    className
  )

  const indicatorClassName = cn(
    choiceIndicatorClassName,
    indicatorShapeClassName,
    indeterminate && choiceIndicatorIndeterminateClassName
  )

  return (
    <label className={controlClassName} htmlFor={inputId}>
      <input
        {...rest}
        ref={setInputRef}
        id={inputId}
        className={cn("form-choice-input", choiceInputClassName)}
        type={type}
        name={name}
        value={inputValue}
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
        onFocus={onFocus}
        onBlur={onBlur}
        aria-invalid={!!error || undefined}
        aria-checked={ariaChecked}
        tabIndex={tabIndex}
      />
      <span className={indicatorClassName} aria-hidden="true" />
      {!!label && (
        <Text className={choiceCaptionClassName} size="inherit">
          {label}
        </Text>
      )}
    </label>
  )
})

export default ChoiceControl
