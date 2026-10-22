"use client"

import React from "react"
import Icon from "../Icon"
import resolvedUiConfig from "../../Config/uiConfig"
import { cn } from "../../Utils/cn"
import TooltipPopup from "./primitive"
import { useTooltip } from "./useTooltipHook"
import { tooltipTriggerClassName } from "./tooltipClassNames"
import type { TooltipProps, TooltipIcon } from "./types"
import type { IconProps } from "../Icon/types"

/**
 * Resolves which icon to use for the tooltip trigger.
 * Falls back to the config icon when none is passed.
 * A string uses a Material Icon.
 *
 * @param {TooltipIcon | undefined} icon - Trigger icon
 * @returns {IconProps} Resolved trigger icon
 */
function resolveIcon(icon?: TooltipIcon): IconProps {
  let resolvedIcon = resolvedUiConfig.tooltipIcon
  if (!icon) {
    return resolvedIcon
  }

  if (typeof icon === "string") {
    return { ...resolvedIcon, type: "md", name: icon }
  }

  // Accessibility: aria-label lives on the button; svg/icon stays aria-hidden.
  return { ...icon, ariaLabel: undefined }
}

/**
 * Floating tooltip component.
 * Renders an icon; hovering (or focusing/clicking on mobile) shows the tip.
 * For custom tooltips, use TooltipPopup with useTooltip.
 *
 * @param {ReactNode} title - Tooltip title
 * @param {ReactNode} text - Tooltip body text
 * @param {boolean} isLoading - Show loader instead of text
 * @param {TooltipIcon} icon - Trigger icon
 * @param {string} className - Extra CSS class for the trigger button
 * @param {string} iconClassName - Extra CSS class for the icon inside the trigger
 * @param {string} ariaLabel - aria-label for the trigger button
 * @param {FloatingPlacement} placement - Base placement relative to the trigger
 * @param {number} offset - Gap between trigger and popup
 * @param {boolean} withArrow - Enable arrow middleware
 * @param {boolean} flip - Enable flip middleware
 * @param {boolean} shift - Enable shift middleware
 * @param {number} hoverOpenDelay - Hover open delay
 * @param {number} hoverCloseDelay - Hover close delay
 * @param {boolean} open - Controlled open state
 * @param {boolean} defaultOpen - Initial open state for uncontrolled mode
 * @param {function} onOpenChange - Open-state change callback
 * @param {FloatingArrowRenderOptions} arrowOptions - Arrow render options for `Popup`
 * @param {string} popupClassName - Extra CSS class for the tooltip popup root
 * @param {string} titleClassName - Extra CSS class for the tooltip title
 * @param {string} textClassName - Extra CSS class for the tooltip text
 * @param {string} loaderLabel - Loading label when `isLoading=true`
 * @param {React.Ref<HTMLButtonElement>} ref - Ref to the trigger button
 * @returns {ReactNode} Tooltip component
 */
const Tooltip = React.memo(
  React.forwardRef<HTMLButtonElement, TooltipProps>(function Tooltip(
    {
      title,
      text,
      isLoading,

      icon,
      className,
      iconClassName,
      ariaLabel,

      placement,
      offset,
      withArrow,
      flip,
      shift,

      hoverOpenDelay,
      hoverCloseDelay,

      open,
      defaultOpen,
      onOpenChange,

      arrowOptions,
      popupClassName,
      titleClassName,
      textClassName,

      loaderLabel
    },
    ref
  ) {
    const tooltip = useTooltip({
      open,
      defaultOpen,
      onOpenChange,

      placement: placement ?? resolvedUiConfig.tooltipPlacement,
      offset: offset ?? resolvedUiConfig.tooltipOffset,
      withArrow: withArrow ?? true,
      flip: flip ?? resolvedUiConfig.tooltipFlip,
      shift: shift ?? resolvedUiConfig.tooltipShift,

      desktopTrigger: ["hover", "focus"],
      mobileTrigger: ["click", "focus"],

      hoverOpenDelay: hoverOpenDelay ?? resolvedUiConfig.tooltipHoverOpenDelay,
      hoverCloseDelay: hoverCloseDelay ?? resolvedUiConfig.tooltipHoverCloseDelay,
      isDismissEnabled: true,
      dismissOnOutsidePress: true,
      dismissOnEscape: true
    })

    // Accessibility: if ariaLabel is omitted, derive from title/text.
    let computedAriaLabel = "Help"
    if (ariaLabel) {
      computedAriaLabel = ariaLabel
    } else if (typeof title === "string") {
      computedAriaLabel = title
    } else if (typeof text === "string") {
      computedAriaLabel = text
    }

    const resolvedIcon = resolveIcon(icon)

    // Merge internal trigger ref logic with the forwarded ref.
    const setRefs = React.useCallback(
      (node: HTMLButtonElement | null) => {
        tooltip.setTriggerRef(node)
        if (!ref) return
        if (typeof ref === "function") {
          ref(node)
          return
        }
        ;(ref as React.MutableRefObject<HTMLButtonElement | null>).current = node
      },
      [ref, tooltip]
    )

    const triggerProps = tooltip.getTriggerProps()

    let describedBy: string | undefined
    if (tooltip.open) {
      describedBy = tooltip.tooltipId
    }

    return (
      <>
        <button
          {...triggerProps}
          ref={setRefs}
          type="button"
          className={cn(tooltipTriggerClassName, className)}
          aria-label={computedAriaLabel}
          aria-expanded={tooltip.open}
          aria-haspopup="true"
          aria-describedby={describedBy}
        >
          <Icon {...resolvedIcon} className={cn(resolvedIcon.className, iconClassName)} />
        </button>
        <TooltipPopup
          state={tooltip.popupState}
          arrowOptions={arrowOptions}
          portal
          id={tooltip.tooltipId}
          title={title}
          text={text}
          isLoading={isLoading}
          loaderLabel={loaderLabel}
          className={popupClassName}
          titleClassName={titleClassName}
          textClassName={textClassName}
        />
      </>
    )
  })
)

export default Tooltip
