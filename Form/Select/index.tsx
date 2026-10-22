"use client"

import React from "react"
import Input from "../Input"
import Popup from "../../Floating/Popup"
import { usePopup } from "../../Floating/Hooks/exports"
import type { IconProps } from "../../Presentation/Icon/types"
import { SelectOptionList } from "./selectOptionList"
import { useSelectKeyboard } from "./useSelectKeyboard"
import { findSelectedOptionTitle, resolveOptionDisabled, resolveOptionValue } from "./utils"
import type { SelectOption, SelectProps } from "./types"
import { cn } from "../../Utils/cn"
import { selectPopupClassName, selectTriggerClassName } from "./selectClassNames"

/** Symbol identifying the component as a form element. */
const FORM_ELEMENT = Symbol.for("ui.form.element")

/**
 * Universal dropdown select component.
 *
 * @param {string} className - Extra CSS classes for the container.
 * @param {string} label - Field label.
 * @param {string} name - Field name and HTML name attribute.
 * @param {import("./types").SelectOption[] | undefined} options - Options list. If omitted — treated as empty.
 * @param {any} value - Current value (controlled mode).
 * @param {any} defaultValue - Initial value (uncontrolled mode).
 * @param {(name: string, value: any | undefined) => void} onChange - Value selection handler.
 * @param {boolean} isClearable - Show the clear button.
 * @param {(name: string) => void} onClear - Clear value handler.
 * @param {IconProps | string} icon - Leading icon.
 * @param {IconProps | string} endIcon - Trailing icon (defaults to up/down arrow).
 * @param {boolean} isLoading - Show loading indicator and block interaction.
 * @param {string} error - Error text under the field and error styles.
 * @param {boolean} isFilled - Force the field to be treated as filled (for floating label).
 * @param {boolean} isLabelSpaceReserved - Reserve label space even when missing.
 * @param {boolean} isLabelOnTop - Pin the label above the field even with floating label variant.
 * @param {boolean} isNoMouseEvent - Disable event handling without disabled styles.
 * @param {boolean} focused - Force the field to look focused.
 * @param {boolean} disabled - Disable the field.
 * @param {(e: React.FocusEvent<HTMLElement>) => void} onFocus - Focus handler.
 * @param {(e: React.FocusEvent<HTMLElement>) => void} onBlur - Blur handler.
 * @param {string} placeholder - Placeholder.
 * @param {"floating" | "simple" | "underlined"} variant - Display variant (proxied to `Input`).
 * @param {import("../../Floating/Core/types").FloatingPlacement} placement - Popup placement relative to the trigger.
 * @param {number} offset - Offset between trigger and popup.
 * @param {boolean} flip - Enable flip middleware.
 * @param {boolean} shift - Enable shift middleware.
 * @param {boolean} portal - Render popup via Portal.
 * @param {HTMLElement | null} portalContainer - Portal container.
 * @param {string} popupClassName - Extra CSS class for the popup container.
 * @param {number | string} listMaxHeight - Maximum height of the options list.
 * @param {string} emptyListText - Text shown when the list is empty.
 * @param {(item: unknown) => string} getOptionTitle - How to get the option title from an object.
 * @param {(item: unknown) => any} getOptionValue - How to get the option value from an object.
 * @param {(item: unknown) => boolean} getOptionDisabled - How to determine option unavailability.
 * @param {(ctx) => React.ReactNode} renderOption - Custom option row renderer.
 *
 * @returns {JSX.Element} Select component.
 */
function SelectInner<TItem extends SelectOption, Value>(
  props: SelectProps<TItem, Value>,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  const {
    name,
    options,
    value: valueProp,
    defaultValue,
    onChange,
    onClear,
    isClearable,
    endIcon,
    placement = "bottom-start",
    offset = 6,
    flip = true,
    shift = true,
    portal = true,
    portalContainer,
    popupClassName,
    listMaxHeight,
    emptyListText,
    renderOption,
    disabled,
    isLoading,
    isNoMouseEvent,
    label,
    onClick,
    onKeyDown,
    ...inputProps
  } = props

  const inputStyle = inputProps.style
  const isInteractionBlocked = !!disabled || !!isLoading

  const listboxId = React.useId()
  const triggerRef = React.useRef<HTMLDivElement | null>(null)
  const inputRef = React.useRef<HTMLInputElement | null>(null)

  const isControlled = valueProp !== undefined
  const [uncontrolledValue, setUncontrolledValue] = React.useState<Value | undefined>(defaultValue)
  const value = isControlled ? valueProp : uncontrolledValue

  const items = React.useMemo(() => (options ?? []) as TItem[], [options])
  const [activeIndex, setActiveIndex] = React.useState<number | undefined>(undefined)

  const selectedTitle = React.useMemo(() => {
    return findSelectedOptionTitle(items, value, props.getOptionValue, props.getOptionTitle)
  }, [items, props.getOptionTitle, props.getOptionValue, value])

  const popup = usePopup({
    placement,
    offset,
    flip,
    shift,
    size: {
      apply: ({ rects, elements }) => {
        Object.assign(elements.floating.style, {
          width: `${rects.reference.width}px`
        })
      }
    },
    trigger: "click",
    isInteractionsDisabled: isInteractionBlocked || !!isNoMouseEvent,
    isDismissEnabled: true,
    dismissOnOutsidePress: true,
    dismissOnEscape: true,
    withArrow: false
  })

  const setTriggerRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      triggerRef.current = node
      popup.setTriggerRef(node)
    },
    [popup]
  )

  /** Input ref resolver */
  const setInputRefs = React.useCallback(
    (node: HTMLInputElement | null) => {
      inputRef.current = node
      if (!ref) return
      if (typeof ref === "function") {
        ref(node)
        return
      }
      ;(ref as React.MutableRefObject<HTMLInputElement | null>).current = node
    },
    [ref]
  )

  /** Trailing icon resolver */
  const computedEndIcon: IconProps | string =
    endIcon ??
    ({
      type: "md",
      name: popup.open ? "keyboard_arrow_up" : "keyboard_arrow_down"
    } satisfies IconProps)

  /** Helper to open the popup via keyboard */
  const openWithFocus = React.useCallback(() => {
    if (isInteractionBlocked || !!isNoMouseEvent) return
    popup.setOpen(true)
  }, [isInteractionBlocked, isNoMouseEvent, popup])

  /** Clear active index when the popup closes */
  React.useEffect(() => {
    if (!popup.open) setActiveIndex(undefined)
  }, [popup.open])

  /** Final value depending on control mode */
  const commitValue = React.useCallback(
    (nextValue: Value | undefined) => {
      if (!isControlled) setUncontrolledValue(nextValue)
      onChange?.(name, nextValue)
    },
    [isControlled, name, onChange]
  )

  const handleClearValue = React.useCallback(() => {
    if (disabled || isNoMouseEvent || isLoading) return
    if (onClear) onClear(name)
    else commitValue(undefined)
    popup.setOpen(false)
    inputRef.current?.focus()
  }, [commitValue, disabled, isLoading, isNoMouseEvent, name, onClear, popup])

  /** Select an option correctly with control mode and passed resolvers */
  const selectItem = React.useCallback(
    (item: TItem) => {
      if (resolveOptionDisabled(item, props.getOptionDisabled)) return
      commitValue(resolveOptionValue<TItem, Value>(item, props.getOptionValue))
      popup.setOpen(false)
      setActiveIndex(undefined)
      inputRef.current?.focus()
    },
    [commitValue, popup, props.getOptionDisabled, props.getOptionValue]
  )

  /** Keyboard control hook */
  const keyboard = useSelectKeyboard({
    open: popup.open,
    setOpen: popup.setOpen,
    items,
    getOptionDisabled: props.getOptionDisabled,
    getOptionValue: props.getOptionValue,
    value,
    activeIndex,
    setActiveIndex,
    selectItem,
    openWithFocus,
    onKeyDown,
    disabled,
    isNoMouseEvent
  })

  const isFilledResolved = inputProps.isFilled ?? value !== undefined
  let activeDescendantId: string | undefined
  if (popup.open && activeIndex !== undefined) {
    activeDescendantId = `select-option-${listboxId}-${activeIndex}`
  }

  let listAriaLabel = "Options list"
  if (typeof label === "string") {
    listAriaLabel = label
  }

  let cursorStyle: React.CSSProperties["cursor"] = "pointer"
  if (isInteractionBlocked) {
    cursorStyle = "not-allowed"
  }

  return (
    <>
      <div
        className={selectTriggerClassName}
        ref={setTriggerRef}
        {...popup.getTriggerProps({
          onClick: (e) => onClick?.(e as any)
        })}
      >
        <Input
          label={label}
          {...inputProps}
          ref={setInputRefs}
          name={name}
          value={selectedTitle}
          endIcon={computedEndIcon}
          disabled={isInteractionBlocked}
          isLoading={isLoading}
          isNoMouseEvent={isNoMouseEvent}
          isClearable={isClearable}
          onClear={handleClearValue}
          isFilled={isFilledResolved}
          readOnly
          inputMode="none"
          autoComplete="off"
          style={{
            ...inputStyle,
            cursor: cursorStyle,
            caretColor: "transparent"
          }}
          role="combobox"
          aria-haspopup="listbox"
          aria-controls={listboxId}
          aria-expanded={popup.open}
          aria-autocomplete="none"
          aria-activedescendant={activeDescendantId}
          onKeyDown={keyboard.onKeyDown}
        />
      </div>

      <Popup
        state={popup.popupState}
        portal={portal}
        portalContainer={portalContainer}
        className={cn(selectPopupClassName, popupClassName)}
        floatingProps={{ role: "presentation" }}
      >
        <SelectOptionList
          listboxId={listboxId}
          ariaLabel={listAriaLabel}
          items={items}
          getOptionTitle={props.getOptionTitle}
          getOptionValue={props.getOptionValue}
          getOptionDisabled={props.getOptionDisabled}
          value={value}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          selectItem={selectItem}
          listMaxHeight={listMaxHeight}
          emptyListText={emptyListText}
          renderOption={renderOption}
        />
      </Popup>
    </>
  )
}

interface SelectComponent {
  <TItem extends SelectOption = SelectOption, Value = any>(
    props: SelectProps<TItem, Value> & React.RefAttributes<HTMLInputElement>
  ): React.ReactElement
}

const Select = React.forwardRef(SelectInner) as unknown as SelectComponent

// Mark the component as a form element.
;(Select as any)[FORM_ELEMENT] = true

export default Select
