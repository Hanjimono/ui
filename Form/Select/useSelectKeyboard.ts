"use client"

import React from "react"
import type { UseSelectKeyboardOptions } from "./types"
import type { SelectOption } from "./types"
import { findSelectedOptionIndex, getNextEnabledIndex } from "./utils"

/**
 * Keyboard navigation hook for `Select`.
 * Essentially implements selecting list items with the keyboard.
 *
 * !Important: the input stays `readOnly`; the keyboard is only used to control the popup.
 * This simplifies a future evolution into a “searchable combobox” — input logic will appear separately.
 */
export function useSelectKeyboard<SelectItem extends SelectOption, Value>({
  open,
  setOpen,
  items,
  getOptionDisabled,
  getOptionValue,
  value,
  activeIndex,
  setActiveIndex,
  selectItem,
  openWithFocus,
  onKeyDown,
  disabled,
  isNoMouseEvent
}: UseSelectKeyboardOptions<SelectItem, Value>) {
  // Find the selected option index by the current `value`.
  const selectedIndex = React.useMemo(
    () => findSelectedOptionIndex(items, value, getOptionValue),
    [getOptionValue, items, value]
  )

  // Keyboard event handler.
  const handleKeyDownInternal = React.useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      onKeyDown?.(e)
      if (e.defaultPrevented) return
      if (disabled || isNoMouseEvent) return

      // ArrowDown.
      // Should move focus to the next enabled option.
      // If the list is closed, opens it and focuses the first enabled option.
      if (e.key === "ArrowDown") {
        e.preventDefault()
        if (!open) {
          openWithFocus()
          setActiveIndex(
            selectedIndex ?? getNextEnabledIndex(items, undefined, 1, getOptionDisabled)
          )
          return
        }
        setActiveIndex(getNextEnabledIndex(items, activeIndex, 1, getOptionDisabled))
        return
      }

      // ArrowUp.
      // Should move focus to the previous enabled option.
      // If the list is closed, opens it and focuses the last enabled option.
      if (e.key === "ArrowUp") {
        e.preventDefault()
        if (!open) {
          openWithFocus()
          setActiveIndex(
            selectedIndex ?? getNextEnabledIndex(items, undefined, -1, getOptionDisabled)
          )
          return
        }
        setActiveIndex(getNextEnabledIndex(items, activeIndex, -1, getOptionDisabled))
        return
      }

      // Enter.
      // Should select the active option and close the list.
      // If the list is closed, opens it and focuses the active option.
      if (e.key === "Enter") {
        if (!open) {
          e.preventDefault()
          openWithFocus()
          setActiveIndex(
            selectedIndex ?? getNextEnabledIndex(items, undefined, 1, getOptionDisabled)
          )
          return
        }
        e.preventDefault()
        const idx =
          activeIndex ??
          selectedIndex ??
          getNextEnabledIndex(items, undefined, 1, getOptionDisabled)
        if (idx !== undefined) {
          selectItem(items[idx])
        }
        return
      }

      // Space.
      // Should open the list and focus the first enabled option.
      if (e.key === " " && !open) {
        e.preventDefault()
        openWithFocus()
        setActiveIndex(selectedIndex ?? getNextEnabledIndex(items, undefined, 1, getOptionDisabled))
        return
      }

      // Escape close is also implemented via Floating dismiss.
      // Here we keep a soft fallback if focus remains on the trigger.
      if (e.key === "Escape" && open) {
        e.preventDefault()
        setOpen(false)
        setActiveIndex(undefined)
        return
      }
    },
    [
      activeIndex,
      disabled,
      getOptionDisabled,
      items,
      isNoMouseEvent,
      onKeyDown,
      open,
      openWithFocus,
      selectedIndex,
      selectItem,
      setActiveIndex,
      setOpen
    ]
  )

  return { onKeyDown: handleKeyDownInternal }
}
