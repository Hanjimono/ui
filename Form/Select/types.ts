import type React from "react"
import type { InputProps } from "../Input/types"
import type { IconProps } from "../../Presentation/Icon/types"
import type { FloatingPlacement } from "../../Floating/Core/types"

export type SelectVariant = InputProps["variant"]

/**
 * Base select item type.
 * The component accepts an array of objects and does not impose their structure.
 */
export type SelectOption = Record<string, unknown>

export type SelectItemTitleResolver<SelectItem> = (item: SelectItem) => string
export type SelectItemValueResolver<SelectItem, Value> = (item: SelectItem) => Value
export type SelectItemDisabledResolver<SelectItem> = (item: SelectItem) => boolean

export type SelectRenderOptionContext<SelectItem = unknown, Value = any> = {
  /** Option index in the list. */
  index: number
  /** Source item (option object or element of the `items` array). */
  item: SelectItem
  /** Option title. */
  title: string
  /** Option value. */
  value: Value
  /** Whether the option is selected. */
  isSelected: boolean
  /** Whether the option is unavailable. */
  disabled: boolean
}

/**
 * Props for the Select options list (listbox).
 */
export type SelectOptionListProps<SelectItem = unknown, Value = any> = {
  /** listbox container id. */
  listboxId: string
  /** Field name for accessibility (fallback). */
  ariaLabel: string
  /** Source items list. */
  items: SelectItem[]
  /** Custom option title resolver. */
  getOptionTitle?: SelectItemTitleResolver<SelectItem>
  /** Custom option value resolver. */
  getOptionValue?: SelectItemValueResolver<SelectItem, Value>
  /** Custom option disabled resolver. */
  getOptionDisabled?: SelectItemDisabledResolver<SelectItem>
  /** Current value. */
  value: Value | undefined
  /** Active option index for keyboard navigation. */
  activeIndex?: number
  /** Set the active option. */
  setActiveIndex: (next: number | undefined) => void
  /** Select an option. */
  selectItem: (item: SelectItem) => void
  /** Maximum list height. */
  listMaxHeight?: number | string
  /** Text when the list is empty. */
  emptyListText?: string
  /** Custom option row renderer. */
  renderOption?: (ctx: SelectRenderOptionContext<SelectItem, Value>) => React.ReactNode
}

/**
 * Props for a single option row in the Select list (role="option").
 */
export type SelectOptionRowProps<SelectItem = unknown, Value = any> = {
  /** Item index in the list. */
  index: number
  /** DOM id of the option element (for aria links when needed). */
  id: string
  /** Source list item. */
  item: SelectItem
  /** Currently selected value. */
  value: Value | undefined
  /** Whether the option is active (keyboard navigation). */
  isActive: boolean
  /** Custom option title resolver. */
  getOptionTitle?: SelectItemTitleResolver<SelectItem>
  /** Custom option value resolver. */
  getOptionValue?: SelectItemValueResolver<SelectItem, Value>
  /** Custom option disabled resolver. */
  getOptionDisabled?: SelectItemDisabledResolver<SelectItem>
  /** Select an option. */
  selectItem: (item: SelectItem) => void
  /** Custom option row renderer. */
  renderOption?: (ctx: SelectRenderOptionContext<SelectItem, Value>) => React.ReactNode
  /** mousedown handler (to prevent trigger blur). */
  onMouseDown: React.MouseEventHandler
  /** mouse move handler (to highlight the active option). */
  onMouseMove: React.MouseEventHandler
}

/**
 * Options for the Select keyboard navigation hook.
 */
export type UseSelectKeyboardOptions<SelectItem = unknown, Value = any> = {
  /** Whether the list is open. */
  open: boolean
  /** Set open state. */
  setOpen: (next: boolean) => void
  /** Source items list. */
  items: SelectItem[]
  /** Custom option disabled resolver. */
  getOptionDisabled?: SelectItemDisabledResolver<SelectItem>
  /** Custom option value resolver. */
  getOptionValue?: SelectItemValueResolver<SelectItem, Value>
  /** Currently selected value. */
  value: Value | undefined
  /** Active option index. */
  activeIndex?: number
  /** Set the active index. */
  setActiveIndex: (next: number | undefined) => void
  /** Select an option. */
  selectItem: (item: SelectItem) => void
  /** Open the list and prepare the active index. */
  openWithFocus: () => void
  /** External onKeyDown handler (if passed to Input). */
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>
  /** Whether the field is blocked. */
  disabled?: boolean
  /** Whether mouse/keyboard events are disabled without disabled styles. */
  isNoMouseEvent?: boolean
}

/**
 * Base select props (shared by both option modes).
 */
export type SelectPropsBase<Value = any> = Omit<
  InputProps,
  "value" | "onChange" | "endIcon" | "type" | "formatter"
> & {
  /**
   * Options list.
   * If omitted — treated as an empty list.
   */
  options?: SelectOption[]

  /**
   * Current select value (controlled mode).
   * Value must match `option.value` or `getOptionValue(option)`.
   */
  value?: Value
  /**
   * Default value (uncontrolled mode).
   * Used when `value` is not passed.
   */
  defaultValue?: Value
  /**
   * Value change callback.
   * Signature is compatible with the Form system (`onChange(name, value)`).
   */
  onChange?: (name: string, value: Value | undefined) => void
  /**
   * Clear callback. If omitted, clear calls `onChange(name, undefined)`.
   */
  onClear?: (name: string) => void

  /**
   * Trailing icon. If omitted, an up/down arrow is shown depending on state.
   */
  endIcon?: IconProps | string

  /** Popup placement relative to the trigger. */
  placement?: FloatingPlacement
  /** Offset between trigger and popup. */
  offset?: number
  /** Enable flip on collisions. */
  flip?: boolean
  /** Enable shift into the visible area. */
  shift?: boolean
  /** Render popup via Portal. */
  portal?: boolean
  /** Portal container. */
  portalContainer?: HTMLElement | null
  /** Extra CSS class for the popup container. */
  popupClassName?: string

  /**
   * Custom option renderer.
   * Use for complex markup inside a list row.
   */
  renderOption?: (ctx: SelectRenderOptionContext<any, Value>) => React.ReactNode
  /**
   * Maximum height of the options list.
   * By default controlled by styles.
   */
  listMaxHeight?: number | string

  /** Text shown when the list is empty. */
  emptyListText?: string
}

/**
 * Props for the `Select` component.
 */
export type SelectProps<
  SelectItem extends SelectOption = SelectOption,
  Value = any
> = SelectPropsBase<Value> & {
  /** Custom option title resolver. */
  getOptionTitle?: SelectItemTitleResolver<SelectItem>
  /** Custom option value resolver. */
  getOptionValue?: SelectItemValueResolver<SelectItem, Value>
  /** Custom option disabled resolver. */
  getOptionDisabled?: SelectItemDisabledResolver<SelectItem>
}
