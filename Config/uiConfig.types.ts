/**
 * Self-contained UI config types for pet-ui.
 * After Form / Presentation / Floating are ported, these can be replaced with imports from those modules.
 */

export type TextPropSize = "2xs" | "xs" | "s" | "m" | "l" | "xl" | "2xl" | "3xl"

export type InputVariant = "floating" | "default"

export type ChoiceLabelPosition = "start" | "end"

export type RadioGroupDirection = "row" | "column"

export type TitleTagVariant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6"

export type FloatingPlacement =
  | "top"
  | "top-start"
  | "top-end"
  | "right"
  | "right-start"
  | "right-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "left"
  | "left-start"
  | "left-end"

/** Minimal icon descriptor used by uiConfig defaults */
export type IconProps = {
  type: "md" | "fa" | "custom"
  name?: string
  size?: number
  customIconLink?: string
  alt?: string
  className?: string
  ariaLabel?: string
}

/** Arrow render options for tooltips / popups */
export type FloatingArrowRenderOptions = {
  fill?: string
  stroke?: string
  strokeWidth?: number
  width?: number
  height?: number
}

/** UI configuration */
export interface UiConfig {
  /** Text size for form field errors */
  formFieldErrorSize: TextPropSize
  /** Input field variant */
  formInputVariant: InputVariant
  /** Label position relative to checkbox / radio indicator */
  formChoiceLabelPosition: ChoiceLabelPosition
  /** RadioGroup options direction */
  formRadioGroupDirection: RadioGroupDirection
  /** Tooltip trigger icon */
  tooltipIcon: IconProps
  /** Default tooltip placement relative to trigger */
  tooltipPlacement: FloatingPlacement
  /** Tooltip offset from trigger */
  tooltipOffset: number
  /** Enable flip middleware for tooltip */
  tooltipFlip: boolean
  /** Enable shift middleware for tooltip */
  tooltipShift: boolean
  /** Hover open delay for tooltip (ms) */
  tooltipHoverOpenDelay: number
  /** Hover close delay for tooltip (ms) */
  tooltipHoverCloseDelay: number
  /** Tooltip title text size */
  tooltipTitleSize: TextPropSize
  /** Tooltip body text size */
  tooltipTextSize: TextPropSize
  /** Tooltip arrow render options */
  tooltipArrowOptions: FloatingArrowRenderOptions
  /** Dismiss modal on Escape by default */
  modalDismissOnEscape: boolean
  /** Dismiss modal on overlay click by default */
  modalDismissOnOverlayClick: boolean
  /** Restore focus after modal close */
  modalRestoreFocus: boolean
  /** Base z-index for the bottom modal in the stack */
  modalBaseZIndex: number
  /** Z-index step between stacked modals */
  modalZIndexStep: number
  /** Lock body scroll while Provider has open modals */
  modalLockScroll: boolean
  /** ModalHeader title tag (typography size via h1–h6) */
  modalHeaderTitleAs: TitleTagVariant
  /** ModalHeader close button icon */
  modalHeaderCloseIcon: IconProps
}
