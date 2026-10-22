"use client"

import React, { useCallback } from "react"
import Icon from "../../Presentation/Icon"
import Loader from "../../Presentation/Loader"
import { cn } from "../../Utils/cn"
import {
  buttonBaseClassName,
  buttonDisabledClassName,
  buttonIconClassName,
  buttonLoaderClassName,
  buttonOverlayLoaderClassName,
  buttonShadowClassNames,
  buttonSizeClassNames,
  buttonThemeBorderClassNames,
  buttonVariantThemeClassNames,
  buttonWidthClassNames,
  buttonWithIconClassName
} from "./buttonClassNames"
import { ButtonProps, ConditionalButtonComponentProps, ButtonElement } from "./types"
import { IconProps } from "../../Presentation/Icon/types"
import resolvedUiConfig from "../../Config/uiConfig"

const UI_CONFIG = resolvedUiConfig

/**
 * Button component with themes, variants, and loading states.
 *
 * @param {React.ReactNode} children - Button content
 * @param {string} className - Extra CSS classes
 * @param {string} theme - Button color theme
 * @param {string} variant - Button variant
 * @param {string} size - Button size
 * @param {boolean} disabled - Whether the button is disabled
 * @param {function} onClick - Click handler
 * @param {boolean} isLoading - Whether to show a loader
 * @param {string} [link=""] - Link URL; when set, the button behaves like a link
 * @param {"wide" | "adaptive" | "narrow"} width - Button width mode
 *        wide - full width on mobile and desktop
 *        adaptive - full width on mobile, minimal on desktop
 *        narrow - minimal width on mobile and desktop
 * @param {string} target - Target attribute for link buttons
 * @param {"default" | "no-shadow"} shadow - Shadow mode
 * @param {string} type - Button type (button, submit, reset)
 * @param {IconProps} icon - Leading icon props or name
 * @param {IconProps} endIcon - Trailing icon props or name
 * @param {boolean} isNotStopPropagation - When true, stops click propagation
 *
 * @returns {JSX.Element} Button element
 */
const Button = React.forwardRef<ButtonElement, ButtonProps>(function Button(
  {
    children,
    className,
    theme = "primary",
    variant = "solid",
    size = "md",
    onClick,
    icon,
    endIcon,
    disabled,
    isLoading,
    link,
    width = "adaptive",
    target,
    shadow = UI_CONFIG.buttonShadow,
    type = "button",
    isNotStopPropagation,
    ...rest
  },
  ref
) {
  const calculatedDisabled = disabled || isLoading
  const hasLeadingIconSlot = !!icon && !!children
  const hasTrailingIconSlot = !!endIcon && !!children
  const calculatedClassNames = cn(
    buttonBaseClassName,
    className,
    (hasLeadingIconSlot || hasTrailingIconSlot) && buttonWithIconClassName,
    calculatedDisabled && buttonDisabledClassName,
    shadow === "default" && buttonShadowClassNames[theme],
    buttonThemeBorderClassNames[theme],
    buttonVariantThemeClassNames[variant][theme],
    buttonSizeClassNames[size],
    buttonWidthClassNames[width]
  )
  const calculatedOnClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (isNotStopPropagation) {
        e.stopPropagation()
      }
      onClick?.(e)
    },
    [isNotStopPropagation, onClick]
  )

  let resolvedOnClick: React.MouseEventHandler<HTMLElement> | undefined
  if (!calculatedDisabled) {
    resolvedOnClick = calculatedOnClick
  }

  return (
    <ConditionalButtonComponent
      ref={ref as React.Ref<ButtonElement>}
      className={calculatedClassNames}
      target={target}
      href={link}
      disabled={calculatedDisabled}
      onClick={resolvedOnClick}
      type={type}
      {...rest}
    >
      {!!isLoading && !icon && (
        <div className={buttonOverlayLoaderClassName}>
          <Loader size="xs" variant="inherit" />
        </div>
      )}
      {!!icon && !isLoading && renderIcon(icon, buttonIconClassName)}
      {!!isLoading && !!icon && !endIcon && (
        <div className={buttonLoaderClassName}>
          <Loader size="xs" variant="inherit" />
        </div>
      )}
      {children}
      {!!endIcon && !isLoading && renderIcon(endIcon, buttonIconClassName)}
      {!!isLoading && !!endIcon && (
        <div className={buttonLoaderClassName}>
          <Loader size="xs" variant="inherit" />
        </div>
      )}
    </ConditionalButtonComponent>
  )
})

const ConditionalButtonComponent = React.forwardRef<ButtonElement, ConditionalButtonComponentProps>(
  function ConditionalButtonComponent(props, ref) {
    const { href, target, disabled, type, ...rest } = props as React.ButtonHTMLAttributes<HTMLButtonElement> &
      React.AnchorHTMLAttributes<HTMLAnchorElement> & {
        href?: string
        disabled?: boolean
      }

    if (href) {
      const { ...anchorRest } = rest
      let ariaDisabled: true | undefined
      let tabIndex: number | undefined
      let resolvedHref: string | undefined = href
      let resolvedTarget: string | undefined = target
      let resolvedStyle = anchorRest.style

      if (disabled) {
        ariaDisabled = true
        tabIndex = -1
        resolvedHref = undefined
        resolvedTarget = undefined
        resolvedStyle = { pointerEvents: "none", opacity: 0.5, ...anchorRest.style }
      }

      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={resolvedHref}
          target={resolvedTarget}
          {...anchorRest}
          aria-disabled={ariaDisabled}
          tabIndex={tabIndex}
          style={resolvedStyle}
        />
      )
    }

    let ariaDisabled: true | undefined
    let tabIndex: number | undefined
    if (disabled) {
      ariaDisabled = true
      tabIndex = -1
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={type}
        aria-disabled={ariaDisabled}
        tabIndex={tabIndex}
        {...rest}
      />
    )
  }
)

function renderIcon(icon: IconProps | string, className?: string) {
  if (typeof icon === "string") {
    return <Icon type={"md"} name={icon} className={className} />
  }
  return <Icon {...icon} className={cn(className, icon?.className)} />
}

export default Button
