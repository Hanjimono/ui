"use client"

import type { SelectOption } from "./types"

/**
 * Resolves an option title.
 * If `getOptionTitle` is passed, it is called (errors are not caught).
 * Otherwise `option.title` is used. If the title is missing — returns an empty string.
 *
 * @param option - Source option object.
 * @param getOptionTitle - Title resolver.
 * @returns Option title or an empty string.
 */
export function resolveOptionTitle<SelectItem extends SelectOption>(
  option: SelectItem,
  getOptionTitle?: (option: SelectItem) => string
) {
  if (getOptionTitle) {
    const title = getOptionTitle(option)
    return title == null ? "" : String(title)
  }

  const title = option.title
  return title == null ? "" : String(title)
}

/**
 * Resolves an option value.
 * If `getOptionValue` is passed, it is called (errors are not caught).
 * Otherwise `option.value` is used.
 *
 * Important: value is required. If the value is `undefined` — an error is thrown.
 *
 * @param option - Source option object.
 * @param getOptionValue - Value resolver.
 * @returns Option value.
 */
export function resolveOptionValue<SelectItem extends SelectOption, Value>(
  option: SelectItem,
  getOptionValue?: (option: SelectItem) => Value
): Value {
  const resolved = getOptionValue ? getOptionValue(option) : (option.value as Value)

  if (resolved === undefined) {
    throw new Error(
      "Select: could not resolve option value. Pass getOptionValue or a value field."
    )
  }

  return resolved
}

/**
 * Resolves whether an option is unavailable.
 * If `getOptionDisabled` is passed, it is called (errors are not caught).
 * Otherwise `option.disabled` is used.
 *
 * @param option - Source option object.
 * @param getOptionDisabled - Disabled resolver.
 * @returns `true` if the option is unavailable.
 */
export function resolveOptionDisabled<SelectItem extends SelectOption>(
  option: SelectItem,
  getOptionDisabled?: (option: SelectItem) => boolean
) {
  if (getOptionDisabled) return !!getOptionDisabled(option)
  return !!option.disabled
}

/**
 * Finds the index of the selected option by the current `value`.
 *
 * @param options - Source options list.
 * @param value - Currently selected value.
 * @param getOptionValue - Custom value resolver.
 * @returns Selected option index or `undefined` if no match is found.
 */
export function findSelectedOptionIndex<SelectItem extends SelectOption, Value>(
  options: SelectItem[],
  value: Value | undefined,
  getOptionValue?: (option: SelectItem) => Value
) {
  if (value === undefined) return undefined
  const index = options.findIndex((option) =>
    Object.is(resolveOptionValue<SelectItem, Value>(option, getOptionValue), value)
  )
  return index >= 0 ? index : undefined
}

/**
 * Returns the nearest enabled index (skipping disabled), moving in the given direction.
 * If there are no enabled options — returns `undefined`.
 *
 * @param options - Source options list.
 * @param fromIndex - Start index (may be `undefined`).
 * @param direction - Direction: `1` (down) or `-1` (up).
 * @param getOptionDisabled - Custom disabled resolver.
 * @returns Next enabled index or `undefined`.
 */
export function getNextEnabledIndex<SelectItem extends SelectOption>(
  options: SelectItem[],
  fromIndex: number | undefined,
  direction: 1 | -1,
  getOptionDisabled?: (option: SelectItem) => boolean
) {
  if (options.length === 0) return undefined

  const start = fromIndex === undefined ? (direction === 1 ? -1 : options.length) : fromIndex
  for (let i = start + direction; i >= 0 && i < options.length; i += direction) {
    if (!resolveOptionDisabled(options[i], getOptionDisabled)) return i
  }
  return undefined
}

/**
 * Finds the title of the selected option by the current `value`.
 *
 * Important: comparison uses `Object.is`. Each option value is resolved
 * via `resolveOptionValue` (so `undefined` inside an option is treated as an error).
 *
 * @param options - Source options list.
 * @param value - Currently selected value.
 * @param getOptionValue - Custom value resolver.
 * @param getOptionTitle - Custom title resolver.
 * @returns Selected option title or an empty string if no match is found.
 */
export function findSelectedOptionTitle<SelectItem extends SelectOption, Value>(
  options: SelectItem[],
  value: Value | undefined,
  getOptionValue?: (option: SelectItem) => Value,
  getOptionTitle?: (option: SelectItem) => string
) {
  if (value === undefined) return ""

  const found = options.find((option) =>
    Object.is(resolveOptionValue<SelectItem, Value>(option, getOptionValue), value)
  )

  return found ? resolveOptionTitle(found, getOptionTitle) : ""
}
