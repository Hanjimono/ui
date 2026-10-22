"use client"

import React from "react"
import Popup from "../../Floating/Popup"
import Loader from "../Loader"
import Text from "../Text"
import resolvedUiConfig from "../../Config/uiConfig"
import { cn } from "../../Utils/cn"
import {
  tooltipContentClassName,
  tooltipLoaderClassName,
  tooltipLoaderSpinnerClassName,
  tooltipRootClassName,
  tooltipTextClassName,
  tooltipTitleClassName,
  tooltipTitleContainerClassName
} from "./tooltipClassNames"
import type { TooltipPopupProps } from "./types"

const UI_CONFIG = resolvedUiConfig

/**
 * Visual primitive for a floating tooltip.
 * Used by the base Tooltip component and for custom tooltips.
 * Combine with `useTooltip` for custom triggers while keeping
 * the same look and positioning behaviour.
 *
 * @param {string} id - DOM id for the tooltip popup, usually from `useTooltipHook`
 * @param {ReactNode} title - Tooltip title
 * @param {ReactNode} text - Tooltip body text
 * @param {boolean} isLoading - Show loader instead of text
 * @param {string} className - Extra CSS class for the tooltip root
 * @param {string} titleClassName - Extra CSS class for the title
 * @param {string} textClassName - Extra CSS class for the text
 * @param {string} loaderLabel - Loading label shown when `isLoading=true`
 * @param {CSSProperties} style - Extra styles for the tooltip root
 * @returns {ReactNode} Tooltip popup primitive
 */
function TooltipPopup({
  state,
  arrowOptions,
  portal = true,
  portalContainer,
  id,
  title,
  text,
  isLoading,
  className,
  titleClassName,
  textClassName,
  loaderLabel,
  style
}: TooltipPopupProps) {
  const titleSize = UI_CONFIG.tooltipTitleSize
  const textSize = UI_CONFIG.tooltipTextSize
  const resolvedArrowOptions = arrowOptions ?? resolvedUiConfig.tooltipArrowOptions

  let ariaBusy: true | undefined
  if (isLoading) {
    ariaBusy = true
  }

  return (
    <Popup
      state={state}
      portal={portal}
      portalContainer={portalContainer}
      arrowOptions={resolvedArrowOptions}
      className={cn(tooltipRootClassName, className)}
      style={style}
      floatingProps={{
        id,
        role: "tooltip",
        // `aria-busy` helps assistive tech know content is updating/loading.
        "aria-busy": ariaBusy
      }}
    >
      {!isLoading && !!title && (
        <div className={cn(tooltipTitleContainerClassName, titleClassName)}>
          <Text as="span" size={titleSize} className={tooltipTitleClassName}>
            {title}
          </Text>
        </div>
      )}

      <div className={tooltipContentClassName}>
        {isLoading && (
          <span className={tooltipLoaderClassName}>
            <Loader
              className={tooltipLoaderSpinnerClassName}
              size="xs"
              label={loaderLabel}
            />
          </span>
        )}

        {!isLoading && !!text && (
          <Text as="span" size={textSize} className={cn(tooltipTextClassName, textClassName)}>
            {text}
          </Text>
        )}

        {isLoading && !!loaderLabel && (
          <Text as="span" size={textSize} className={cn(tooltipTextClassName, textClassName)}>
            {loaderLabel}
          </Text>
        )}
      </div>
    </Popup>
  )
}

export default TooltipPopup
