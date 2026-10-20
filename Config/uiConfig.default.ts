import { UiConfig } from "./uiConfig.types"

export const defaultUiConfig: UiConfig = {
  formFieldErrorSize: "s",
  formInputVariant: "floating",
  formChoiceLabelPosition: "end",
  formRadioGroupDirection: "column",
  tooltipIcon: { type: "md", name: "help", size: 24 },
  tooltipPlacement: "top",
  tooltipOffset: 10,
  tooltipFlip: true,
  tooltipShift: false,
  tooltipHoverOpenDelay: 0,
  tooltipHoverCloseDelay: 0,
  tooltipTitleSize: "s",
  tooltipTextSize: "s",
  tooltipArrowOptions: {
    fill: "#ffffff",
    stroke: "#d0d7de",
    strokeWidth: 1,
    width: 14,
    height: 7
  },
  modalDismissOnEscape: true,
  modalDismissOnOverlayClick: true,
  modalRestoreFocus: true,
  modalBaseZIndex: 1300,
  modalZIndexStep: 10,
  modalLockScroll: true,
  modalHeaderTitleAs: "h4",
  modalHeaderCloseIcon: { type: "md", name: "close", size: 24 }
}

export default defaultUiConfig
