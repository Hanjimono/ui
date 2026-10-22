"use client"

import React from "react"
import { resolveOptionDisabled, resolveOptionTitle, resolveOptionValue } from "./utils"
import type { SelectOption, SelectOptionListProps, SelectOptionRowProps } from "./types"
import { cn } from "../../Utils/cn"
import {
  selectListClassName,
  selectOptionActiveClassName,
  selectOptionClassName,
  selectOptionDisabledClassName,
  selectOptionEmptyClassName,
  selectOptionSelectedClassName
} from "./selectClassNames"

/**
 * Select dropdown options list.
 *
 * @param {string} listboxId - listbox container id.
 * @param {string} ariaLabel - field name for accessibility.
 * @param {SelectItem[]} items - select items list.
 * @param {Function} getOptionTitle - title resolver for each item.
 * @param {Function} getOptionValue - value resolver for each item.
 * @param {Function} getOptionDisabled - disabled resolver for each item.
 * @param {Value} value - currently selected value.
 * @param {number | undefined} activeIndex - active option index.
 * @param {Function} setActiveIndex - set active index.
 * @param {Function} selectItem - select an option.
 * @param {number | string} listMaxHeight - maximum list height.
 * @param {string} emptyListText - text shown when the list is empty.
 * @param {Function} renderOption - option renderer.
 */
export function SelectOptionList<SelectItem extends SelectOption, Value>({
  listboxId,
  ariaLabel,
  items,
  getOptionTitle,
  getOptionValue,
  getOptionDisabled,
  value,
  activeIndex,
  setActiveIndex,
  selectItem,
  listMaxHeight,
  emptyListText,
  renderOption
}: SelectOptionListProps<SelectItem, Value>) {
  const optionId = React.useCallback(
    (index: number) => `select-option-${listboxId}-${index}`,
    [listboxId]
  )

  // !Important: do not let the trigger input lose focus before option click is handled.
  const handleOptionMouseDown = React.useCallback((e: React.MouseEvent) => {
    e.preventDefault()
  }, [])

  let listStyle: React.CSSProperties | undefined
  if (listMaxHeight !== undefined) {
    listStyle = { ["--select-list-max-height" as any]: String(listMaxHeight) }
  }

  let emptyText = emptyListText
  if (emptyText === undefined) {
    emptyText = "List is empty"
  }

  return (
    <ul
      id={listboxId}
      role="listbox"
      aria-label={ariaLabel}
      className={selectListClassName}
      style={listStyle}
    >
      {items.length === 0 && (
        <li
          className={cn(selectOptionClassName, selectOptionEmptyClassName)}
          aria-disabled="true"
          role="option"
        >
          {emptyText}
        </li>
      )}
      {items.map((item, index) => (
        <SelectOptionRow
          key={index}
          id={optionId(index)}
          index={index}
          item={item}
          value={value}
          isActive={activeIndex === index}
          getOptionTitle={getOptionTitle}
          getOptionValue={getOptionValue}
          getOptionDisabled={getOptionDisabled}
          selectItem={selectItem}
          renderOption={renderOption}
          onMouseDown={handleOptionMouseDown}
          onMouseMove={() => setActiveIndex(index)}
        />
      ))}
    </ul>
  )
}

/**
 * Single option row in the select dropdown list.
 *
 * @param {string} id - option id.
 * @param {number} index - option index in the list.
 * @param {SelectItem} item - source list item.
 * @param {Value} value - currently selected value.
 * @param {boolean} isActive - whether the option is active.
 * @param {Function} getOptionTitle - option title resolver.
 * @param {Function} getOptionValue - option value resolver.
 * @param {Function} getOptionDisabled - option disabled resolver.
 * @param {Function} selectItem - select an option.
 * @param {Function} renderOption - option renderer.
 * @param {Function} onMouseDown - mousedown handler.
 * @param {Function} onMouseMove - mousemove handler.
 */
function SelectOptionRow<SelectItem extends SelectOption, Value>({
  id,
  index,
  item,
  value,
  isActive,
  getOptionTitle,
  getOptionValue,
  getOptionDisabled,
  selectItem,
  renderOption,
  onMouseDown,
  onMouseMove
}: SelectOptionRowProps<SelectItem, Value>) {
  const title = resolveOptionTitle(item, getOptionTitle)
  const itemValue = resolveOptionValue<SelectItem, Value>(item, getOptionValue)
  const isDisabled = resolveOptionDisabled(item, getOptionDisabled)
  const isSelected = Object.is(itemValue, value)

  let content: React.ReactNode = title
  if (renderOption) {
    content = renderOption({
      index,
      item,
      title,
      value: itemValue,
      isSelected,
      disabled: isDisabled
    })
  }

  return (
    <li
      id={id}
      role="option"
      aria-selected={isSelected}
      aria-disabled={isDisabled || undefined}
      className={cn(
        selectOptionClassName,
        isSelected && selectOptionSelectedClassName,
        isActive && selectOptionActiveClassName,
        isDisabled && selectOptionDisabledClassName
      )}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onClick={() => selectItem(item)}
    >
      {content}
    </li>
  )
}
