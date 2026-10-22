"use client"

import React, { useCallback, useEffect, useId, useRef, useState } from "react"
import FormField from "../Field"
import resolvedUiConfig from "../../Config/uiConfig"
import { FloatingFieldset, FloatingLabel } from "../Input"
import { TextareaProps } from "./types"
import { cn } from "../../Utils/cn"
import {
  textareaAutoResizeClassName,
  textareaBlockedClassName,
  textareaDisabledClassName,
  textareaElementClassName,
  textareaErroredClassName,
  textareaFocusedClassName,
  textareaRootClassName,
  textareaSimpleErroredClassName,
  textareaSimpleFocusedClassName,
  textareaUnderlinedErroredClassName,
  textareaUnderlinedFocusedClassName,
  textareaVariantClassNames
} from "./textareaClassNames"

const UI_CONFIG = resolvedUiConfig
/** Symbol identifying the component as a form element. */
const FORM_ELEMENT = Symbol.for("ui.form.element")

/**
 * Universal multiline input field component.
 * TODO: floating variant does not work correctly. Needs more flexible translate tuning. Animation is disabled for now.
 *
 * @param {string} className - Extra CSS classes for the container.
 * @param {string} label - Field label.
 * @param {string} name - Field name and HTML name attribute.
 * @param {string} value - Current value (controlled mode).
 * @param {(name: string, value?: string) => void} onChange - Value change handler.
 * @param {string} error - Error text under the field and error styles.
 * @param {boolean} isFilled - Force the field to be treated as filled (for floating label).
 * @param {boolean} isLabelSpaceReserved - Reserve label space even when missing.
 * @param {boolean} isLabelOnTop - Pin the label above the field even with floating variant.
 * @param {boolean} isNoMouseEvent - Disable mouse event handling without disabled styles.
 * @param {boolean} focused - Force the field to look focused.
 * @param {boolean} disabled - Disable the field.
 * @param {() => void} onFocus - Focus handler.
 * @param {() => void} onBlur - Blur handler.
 * @param {string} placeholder - Placeholder.
 * @param {"floating" | "simple" | "underlined"} variant - Display variant.
 * @param {boolean} autoResize - Automatically change field height based on content.
 * @param {number} minRows - Minimum number of rows.
 * @param {number} maxRows - Maximum number of rows.
 *
 * @returns {JSX.Element} Multiline input field component.
 */
function Textarea({
  className,
  label,
  name,
  value,
  onChange,
  error,
  isFilled,
  isLabelSpaceReserved,
  isLabelOnTop,
  isNoMouseEvent,
  focused,
  disabled,
  onFocus,
  onBlur,
  placeholder,
  variant,
  autoResize,
  minRows = 3,
  maxRows,
  ...rest
}: TextareaProps) {
  // Unique id so the textarea can be associated with the label
  const generatedId = useId()
  const inputId = `textarea-${name}-${generatedId}`
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Field focus state
  const [isFocused, setIsFocused] = useState(false)
  /** Real focus may be forced or come from a focus event. */
  const isActive = isFocused || !!focused
  const hasValue = typeof value === "string" && value.length > 0

  const resolvedVariant = variant || UI_CONFIG.formInputVariant
  const isFloating = resolvedVariant === "floating"
  /** Helper flag for floating label: whether the label should be pinned up. */
  const isLabelUp = isFloating && (hasValue || !!isFilled || isActive || !!isLabelOnTop)

  const handleFocus = useCallback(() => {
    setIsFocused(true)
    onFocus?.()
  }, [onFocus])

  const handleBlur = useCallback(() => {
    setIsFocused(false)
    onBlur?.()
  }, [onBlur])

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (disabled || isNoMouseEvent || !onChange) return
      onChange(name, e.currentTarget.value)
    },
    [disabled, isNoMouseEvent, name, onChange]
  )

  /**
   * With autoResize, sync textarea height to content.
   * Height is clamped by minRows/maxRows when set.
   */
  useEffect(() => {
    const element = textareaRef.current
    if (!element) return

    if (!autoResize) {
      element.style.height = ""
      element.style.overflowY = ""
      return
    }

    const normalizedMinRows = Math.max(1, minRows)
    const normalizedMaxRows = maxRows ? Math.max(normalizedMinRows, maxRows) : undefined
    const computed = window.getComputedStyle(element)
    const lineHeight = Number.parseFloat(computed.lineHeight) || 0
    const paddingTop = Number.parseFloat(computed.paddingTop) || 0
    const paddingBottom = Number.parseFloat(computed.paddingBottom) || 0
    const verticalPadding = paddingTop + paddingBottom

    const minHeight = lineHeight > 0 ? normalizedMinRows * lineHeight + verticalPadding : 0
    const maxHeight =
      lineHeight > 0 && normalizedMaxRows
        ? normalizedMaxRows * lineHeight + verticalPadding
        : undefined

    element.style.height = "auto"
    const contentHeight = element.scrollHeight
    const nextHeight = Math.max(
      minHeight,
      maxHeight ? Math.min(contentHeight, maxHeight) : contentHeight
    )

    element.style.height = `${nextHeight}px`
    element.style.overflowY = maxHeight && contentHeight > maxHeight ? "auto" : "hidden"
  }, [autoResize, value, minRows, maxRows])

  const isUnderlined = resolvedVariant === "underlined"
  const isSimple = resolvedVariant === "simple"

  const rootClassName = cn(
    textareaRootClassName,
    textareaVariantClassNames[resolvedVariant],
    isActive && !isUnderlined && !isFloating && textareaFocusedClassName,
    isActive && isSimple && textareaSimpleFocusedClassName,
    isActive && isUnderlined && textareaUnderlinedFocusedClassName,
    !!error && !isUnderlined && !isFloating && textareaErroredClassName,
    !!error && isSimple && textareaSimpleErroredClassName,
    !!error && isUnderlined && textareaUnderlinedErroredClassName,
    disabled && textareaBlockedClassName,
    disabled && textareaDisabledClassName,
    isNoMouseEvent && textareaBlockedClassName,
    className
  )

  /** Placeholder may be hidden for floating label until the label is up. */
  let placeholderValue = placeholder
  if (isFloating && !isLabelUp) {
    placeholderValue = undefined
  }

  let fieldLabel: string | undefined
  if (!isFloating) {
    fieldLabel = label
  }

  return (
    <FormField
      label={fieldLabel}
      error={error}
      isLabelSpaceReserved={isLabelSpaceReserved}
      inputId={inputId}
    >
      <div className={rootClassName}>
        <textarea
          id={inputId}
          ref={textareaRef}
          name={name}
          value={value ?? ""}
          rows={Math.max(1, minRows)}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          placeholder={placeholderValue}
          aria-invalid={!!error || undefined}
          className={cn(textareaElementClassName, autoResize && textareaAutoResizeClassName)}
          {...rest}
        />

        {isFloating && (
          <FloatingLabel
            label={label}
            inputId={inputId}
            isLabelUp={true}
            hasError={!!error}
            hasLeadingIcon={false}
          />
        )}

        {isFloating && (
          <FloatingFieldset label={label} isActive={isActive} hasError={!!error} isLabelUp={true} />
        )}
      </div>
    </FormField>
  )
}

;(Textarea as unknown as Record<symbol, boolean>)[FORM_ELEMENT] = true

export default Textarea
