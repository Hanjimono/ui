/**
 * UI config types for pet-ui.
 * Form-related variants are imported from Form modules (no cycles: Form does not import uiConfig.types).
 * FloatingPlacement and FloatingArrowRenderOptions come from Floating/Core.
 * IconProps comes from Presentation/Icon.
 */

import type {
  FloatingPlacement,
  FloatingArrowRenderOptions
} from "../Floating/Core/types"
import type { IconProps } from "../Presentation/Icon/types"
import type { InputVariant } from "../Form/Input/types"
import type { ChoiceLabelPosition } from "../Form/Checkbox/types"
import type { RadioGroupDirection } from "../Form/RadioGroup/types"
import type { ButtonShadow } from "../Action/Button/types"

export type TextPropSize = "2xs" | "xs" | "s" | "m" | "l" | "xl" | "2xl" | "3xl"

export type TitleTagVariant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6"

export type { FloatingPlacement, FloatingArrowRenderOptions, IconProps, InputVariant, ChoiceLabelPosition, RadioGroupDirection, ButtonShadow }

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
  /** Button shadow when the shadow prop is omitted */
  buttonShadow: ButtonShadow
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
