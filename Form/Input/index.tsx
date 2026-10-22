"use client"

import React, { useCallback, useId, useState } from "react"
import { maskitoTransform } from "@maskito/core"
import { useMaskito } from "@maskito/react"
import FormField from "../Field"
import Button from "../../Action/Button"
import Icon from "../../Presentation/Icon"
import { IconProps } from "../../Presentation/Icon/types"
import Loader from "../../Presentation/Loader"
import resolvedUiConfig from "../../Config/uiConfig"
import { inputFormat } from "./formatters"
import { inputMasks } from "./masks"
import { FloatingFieldsetProps, FloatingLabelProps, InputProps } from "./types"
import { cn } from "../../Utils/cn"
import {
  inputBlockedClassName,
  inputClearButtonClassName,
  inputDisabledClassName,
  inputElementClassName,
  inputErroredClassName,
  inputFloatingFieldsetActiveClassName,
  inputFloatingFieldsetClassName,
  inputFloatingFieldsetErrorClassName,
  inputFloatingLabelClassName,
  inputFloatingLabelErrorClassName,
  inputFloatingLabelUpClassName,
  inputFloatingLabelWithIconClassName,
  inputFloatingLegendClassName,
  inputFloatingLegendTextClassName,
  inputFloatingLegendVisibleClassName,
  inputFocusedClassName,
  inputIconErrorClassName,
  inputNoShrinkClassName,
  inputRootClassName,
  inputSimpleErroredClassName,
  inputSimpleFocusedClassName,
  inputUnderlinedErroredClassName,
  inputUnderlinedFocusedClassName,
  inputVariantClassNames
} from "./inputClassNames"

const UI_CONFIG = resolvedUiConfig
/** Symbol identifying the component as a form element. */
const FORM_ELEMENT = Symbol.for("ui.form.element")

/**
 * Universal text input field component.
 *
 * @param {string} className - Extra CSS classes for the container.
 * @param {string} label - Field label.
 * @param {string} name - Field name and HTML name attribute.
 * @param {string | number} value - Current value (controlled mode).
 * @param {(name: string, value: string | undefined) => void} onChange - Value change handler.
 * @param {boolean} isClearable - Show the clear button.
 * @param {(name: string) => void} onClear - Clear button press handler.
 * @param {IconProps | string} icon - Leading icon.
 * @param {IconProps | string} endIcon - Trailing icon.
 * @param {boolean} isLoading - Show a loading indicator.
 * @param {string} error - Error text under the field and error styles.
 * @param {boolean} isFilled - Force the field to be treated as filled (for floating label).
 * @param {boolean} isLabelSpaceReserved - Reserve label space even when missing.
 * @param {boolean} isLabelOnTop - Pin the label above the field even with floating label variant.
 * @param {React.InputHTMLAttributes<HTMLInputElement>["type"]} type - HTML input type.
 * @param {string} placeholder - Placeholder.
 * @param {import("./formatters").Formatter | import("./formatters").Formatter[]} formatter - Value formatter(s). Do not combine with a mask.
 * @param {import("./types").InputMaskName} mask - Ready-made mask key.
 * @param {import("@maskito/core").MaskitoOptions | null} maskitoOptions - Direct Maskito options.
 * @param {boolean} isNoMouseEvent - Disable mouse event handling without disabled styles.
 * @param {boolean} focused - Force the field to look focused.
 * @param {boolean} disabled - Disable the field.
 * @param {() => void} onFocus - Focus handler.
 * @param {() => void} onBlur - Blur handler.
 * @param {"floating" | "simple" | "underlined"} variant - Display variant.
 *
 * @returns {JSX.Element} Input field component.
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    className,
    label,
    name,
    value,
    onChange,
    isClearable,
    onClear,
    stopPropagationOnClear = true,
    icon,
    endIcon,
    isLoading,
    error,
    isFilled,
    isLabelSpaceReserved,
    isLabelOnTop,
    formatter,
    mask,
    maskitoOptions,
    isNoMouseEvent,
    focused,
    disabled,
    onFocus,
    onBlur,
    placeholder,
    variant,
    type,
    ...rest
  },
  ref
) {
  // Wire ref and mask when a mask is provided
  const maskConfig = maskitoOptions === undefined && mask ? (inputMasks[mask] ?? null) : null
  const resolvedMaskitoOptions =
    maskitoOptions !== undefined ? maskitoOptions : (maskConfig?.options ?? null)
  const maskitoRef = useMaskito({ options: resolvedMaskitoOptions })

  // Final ref goes through the maskitoRef callback
  const setInputRef = useCallback(
    (node: HTMLInputElement | null) => {
      maskitoRef(node)
      if (typeof ref === "function") {
        ref(node)
        return
      }
      if (ref) {
        ref.current = node
      }
    },
    [maskitoRef, ref]
  )

  // Unique id so the input can be associated with the label
  const generatedId = useId()
  const inputId = `input-${name}-${generatedId}`

  // Input focus state
  const [isFocused, setIsFocused] = useState(false)
  /** Real focus may be forced or come from a focus event. */
  const isActive = isFocused || !!focused

  const hasValue = value !== undefined && value.toString().length > 0

  const resolvedVariant = variant || UI_CONFIG.formInputVariant
  const isFloating = resolvedVariant === "floating"

  /** Helper flag for floating label: whether the label should be pinned up. */
  const isLabelUp = isFloating && (hasValue || !!isFilled || isActive || !!isLabelOnTop)

  let calculatedIcon = resolveIconProps(icon)
  let calculatedEndIcon = resolveIconProps(endIcon)
  if (error) {
    if (calculatedIcon) {
      calculatedIcon = resolveIconProps("error")
    } else if (calculatedEndIcon) {
      calculatedEndIcon = resolveIconProps("error")
    }
  }

  const showClearButton = !disabled && !!isClearable && !!onClear && !isLoading && hasValue

  const handleFocus = useCallback(
    (e: React.FocusEvent<HTMLElement>) => {
      setIsFocused(true)
      onFocus?.(e)
    },
    [onFocus]
  )

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLElement>) => {
      setIsFocused(false)
      onBlur?.(e)
    },
    [onBlur]
  )

  const handleClear = useCallback(() => {
    if (disabled) return
    onClear?.(name)
  }, [disabled, name, onClear])

  const handleClearPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (!stopPropagationOnClear) return
      // Clear button is an internal control action.
      // Stopping propagation prevents parent onClick (e.g. Select/Popup trigger).
      e.stopPropagation()
    },
    [stopPropagationOnClear]
  )

  const handleClearClick = useCallback(
    (e: React.MouseEvent) => {
      if (stopPropagationOnClear) {
        e.stopPropagation()
      }
      handleClear()
    },
    [handleClear, stopPropagationOnClear]
  )

  /** Input value change handler. */
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      // If the field is disabled in any way, ignore changes
      if (disabled || isNoMouseEvent || !onChange) return

      let changedValue = e.currentTarget.value
      // Apply every formatter from the list on each change
      if (formatter) {
        const formatters = Array.isArray(formatter) ? formatter : [formatter]
        for (const f of formatters) {
          changedValue = inputFormat(f, changedValue)
        }
      }
      if (maskConfig?.formatter) {
        changedValue = maskConfig.formatter(changedValue)
      }
      onChange(name, changedValue)
    },
    [disabled, name, isNoMouseEvent, formatter, maskConfig, onChange]
  )

  const storedValue = value == null ? "" : String(value)
  const showFocusValue = Boolean(isFocused && maskConfig?.focusValue && storedValue === "")
  let inputValue: string | number | undefined = value
  if (showFocusValue) {
    inputValue = maskConfig?.focusValue
  } else if ((maskConfig?.formatter || formatter) && resolvedMaskitoOptions) {
    inputValue = maskitoTransform(storedValue, resolvedMaskitoOptions)
  }

  const isUnderlined = resolvedVariant === "underlined"
  const isSimple = resolvedVariant === "simple"

  const rootClassName = cn(
    inputRootClassName,
    inputVariantClassNames[resolvedVariant],
    isActive && !isUnderlined && !isFloating && inputFocusedClassName,
    isActive && isSimple && inputSimpleFocusedClassName,
    isActive && isUnderlined && inputUnderlinedFocusedClassName,
    !!error && !isUnderlined && !isFloating && inputErroredClassName,
    !!error && isSimple && inputSimpleErroredClassName,
    !!error && isUnderlined && inputUnderlinedErroredClassName,
    (isLoading || disabled) && inputBlockedClassName,
    disabled && inputDisabledClassName,
    isNoMouseEvent && inputBlockedClassName,
    className
  )

  /** Placeholder may be hidden for floating label when the label is not yet up. */
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
        {renderInputIcon(calculatedIcon, inputNoShrinkClassName, !!error)}

        <input
          ref={setInputRef}
          id={inputId}
          type={type}
          name={name}
          value={inputValue ?? ""}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          placeholder={placeholderValue}
          aria-invalid={!!error || undefined}
          className={inputElementClassName}
          {...rest}
        />

        {showClearButton && (
          <Button
            shadow={"no-shadow"}
            onPointerDown={handleClearPointerDown}
            onClick={handleClearClick}
            variant="icon"
            icon={{ type: "md", name: "close" }}
            className={inputClearButtonClassName}
            aria-label="Clear field"
            tabIndex={-1}
            width="narrow"
          />
        )}

        {!!calculatedEndIcon &&
          !isLoading &&
          renderInputIcon(calculatedEndIcon, cn(inputNoShrinkClassName), !!error)}

        {!!isLoading && <Loader size="xs" className={inputNoShrinkClassName} />}

        {isFloating && (
          <FloatingLabel
            label={label}
            inputId={inputId}
            isLabelUp={isLabelUp}
            hasError={!!error}
            hasLeadingIcon={!!calculatedIcon}
          />
        )}

        {isFloating && (
          <FloatingFieldset
            isActive={isActive}
            hasError={!!error}
            label={label}
            isLabelUp={isLabelUp}
          />
        )}
      </div>
    </FormField>
  )
})

/**
 * Helper that renders a leading or trailing icon.
 * Renders nothing when no icon is provided.
 *
 * @param {IconProps | undefined} icon - Leading or trailing icon.
 * @param {string} className - Extra CSS classes for the icon.
 * @param {boolean} hasError - Whether the field has an error.
 *
 * @returns {JSX.Element | null} Icon component.
 */
function renderInputIcon(icon?: IconProps, className?: string, hasError?: boolean) {
  if (!icon) {
    return null
  }

  return (
    <Icon
      {...icon}
      className={cn(className, icon?.className, hasError && inputIconErrorClassName)}
    />
  )
}

/**
 * Floating label component.
 * Shown above the input for the floating label variant.
 *
 * @param {string} label - Label text.
 * @param {string} inputId - Input id for associating with the label.
 * @param {boolean} isLabelUp - Whether the label should be pinned up.
 * @param {boolean} hasError - Whether the field has an error.
 * @param {boolean} hasLeadingIcon - Whether there is a leading icon.
 *
 * @returns {JSX.Element} Floating label component.
 */
export function FloatingLabel({
  label,
  inputId,
  isLabelUp,
  hasError,
  hasLeadingIcon,
  className
}: FloatingLabelProps) {
  if (!label) {
    return null
  }

  const labelClassName = cn(
    inputFloatingLabelClassName,
    isLabelUp && inputFloatingLabelUpClassName,
    hasError && inputFloatingLabelErrorClassName,
    !isLabelUp && hasLeadingIcon && inputFloatingLabelWithIconClassName,
    className
  )

  return (
    <label htmlFor={inputId} className={labelClassName}>
      {label}
    </label>
  )
}

/**
 * Border around the input for the floating label variant.
 * Shown under the input for the floating label variant.
 *
 * @param {boolean} isActive - Whether the field is active (focused or forced).
 * @param {boolean} hasError - Whether the field has an error.
 * @param {string} label - Label text.
 * @param {boolean} isLabelUp - Whether the label should be pinned up.
 *
 * @returns {JSX.Element} Floating fieldset border component.
 */
export function FloatingFieldset({
  isActive,
  hasError,
  label,
  isLabelUp,
  className
}: FloatingFieldsetProps) {
  const fieldsetClassName = cn(
    inputFloatingFieldsetClassName,
    isActive && inputFloatingFieldsetActiveClassName,
    hasError && inputFloatingFieldsetErrorClassName,
    className
  )

  const legendClassName = cn(
    inputFloatingLegendClassName,
    isLabelUp && !!label && inputFloatingLegendVisibleClassName
  )

  return (
    <fieldset className={fieldsetClassName} aria-hidden="true">
      {!!label && (
        <legend className={legendClassName}>
          <span className={inputFloatingLegendTextClassName}>{label}</span>
        </legend>
      )}
    </fieldset>
  )
}

/**
 * Helper that resolves an icon settings object.
 *
 * @param {IconProps | string} icon - Leading or trailing icon.
 *
 * @returns {IconProps | undefined} Icon settings object.
 */
function resolveIconProps(icon?: IconProps | string): IconProps | undefined {
  if (!icon) {
    return undefined
  }
  if (typeof icon === "string") {
    return {
      type: "md",
      name: icon,
      ariaLabel: icon
    }
  }
  return icon
}

// Mark the component as a form element.
;(Input as any)[FORM_ELEMENT] = true

export default Input
