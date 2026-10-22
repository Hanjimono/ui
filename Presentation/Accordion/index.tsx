"use client"

import React, {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  createContext,
  useContext,
  useCallback,
  useMemo
} from "react"
import Button from "../../Action/Button"
import Icon from "../Icon"
import type { IconProps } from "../Icon/types"
import { cn } from "../../Utils/cn"
import type {
  AccordionProps,
  AccordionTriggerProps,
  AccordionContentProps,
  AccordionContextValue
} from "./types"
import {
  accordionContentInnerClassName,
  accordionContentWrapperClassName,
  accordionIconClassName,
  accordionIconOpenClassName,
  accordionRootClassName,
  accordionTriggerShellClassName
} from "./accordionClassNames"

const AccordionContext = createContext<AccordionContextValue | null>(null)

/**
 * Hook for accordion state. Only works inside `Accordion`.
 * Use for custom triggers/content instead of the standard `AccordionTrigger` / `AccordionContent`.
 *
 * @returns {{ isOpen: boolean, toggle: () => void }} current state and toggle
 */
export function useAccordion() {
  const ctx = useContext(AccordionContext)
  if (!ctx) {
    throw new Error("useAccordion must be used inside Accordion")
  }
  return ctx
}

/**
 * Customizable accordion. Holds open state and provides it to children via context.
 *
 * @param children - `AccordionTrigger`, `AccordionContent`, or custom `useAccordion` consumers
 * @param {string} [className] - Extra classes for the root element
 * @param {string} [openClassName] - Classes for the root when open
 * @param {boolean} [isOpenDefault=false] - Whether the accordion is open on first render
 */
export function Accordion({
  children,
  className,
  openClassName,
  isOpenDefault = false
}: AccordionProps) {
  const [isOpen, setIsOpen] = useState(isOpenDefault)

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  const contextValue = useMemo(
    () => ({
      isOpen,
      toggle
    }),
    [isOpen, toggle]
  )

  return (
    <div className={cn(accordionRootClassName, className, isOpen && openClassName)}>
      <AccordionContext.Provider value={contextValue}>{children}</AccordionContext.Provider>
    </div>
  )
}

/**
 * Accordion header (trigger button). Reads `isOpen` / `toggle` from context.
 *
 * @param children - Header content
 * @param {string} [className] - Extra classes for the trigger
 * @param {string} [openClassName] - Classes for the trigger when open
 * @param {IconProps} [iconProps] - Custom icon props
 * @param {string} [iconClassName] - Extra classes for the icon
 * @param {number} [iconSize] - Default icon size
 */
export function AccordionTrigger({
  children,
  className,
  openClassName,
  iconProps,
  iconClassName,
  iconSize
}: AccordionTriggerProps) {
  const { isOpen, toggle } = useAccordion()

  const iconClassNames = cn(
    accordionIconClassName,
    iconProps?.className,
    iconClassName,
    isOpen && accordionIconOpenClassName
  )

  let defaultIconProps: IconProps = {
    type: "md",
    name: "keyboard_arrow_down",
    size: iconSize
  }
  if (iconProps) {
    defaultIconProps = iconProps
  }

  const resolvedIconProps: IconProps = {
    ...defaultIconProps,
    className: iconClassNames
  }

  return (
    <div className={accordionTriggerShellClassName}>
      <Button
        className={cn(className, isOpen && openClassName)}
        onClick={toggle}
        shadow="no-shadow"
        aria-expanded={isOpen}
        type="button"
        width="wide"
        variant="text"
        theme="secondary"
      >
        {children}
        <Icon {...resolvedIconProps} />
      </Button>
    </div>
  )
}

/**
 * Accordion content panel with `max-height` animation and content size observers.
 *
 * @param children - Panel content
 * @param {string} [className] - Outer wrapper classes
 * @param {string} [contentInnerClassName] - Inner container classes
 * @param {number} [minHeight=0] - Minimum height in px (including when closed)
 * @param {number} [duration=300] - max-height animation duration in ms
 */
export function AccordionContent({
  children,
  className,
  contentInnerClassName,
  minHeight = 0,
  duration = 300
}: AccordionContentProps) {
  const { isOpen } = useAccordion()
  const [contentHeight, setContentHeight] = useState(0)
  const innerRef = useRef<HTMLDivElement>(null)

  const updateHeight = useCallback(() => {
    if (!innerRef.current) return
    setContentHeight(innerRef.current.scrollHeight)
  }, [])

  useLayoutEffect(() => {
    updateHeight()
  }, [updateHeight])

  useEffect(() => {
    if (!innerRef.current) return

    const resizeObserver = new ResizeObserver(() => {
      updateHeight()
    })

    const mutationObserver = new MutationObserver(() => {
      updateHeight()
    })

    resizeObserver.observe(innerRef.current)
    mutationObserver.observe(innerRef.current, {
      childList: true,
      subtree: true,
      characterData: true
    })

    return () => {
      resizeObserver.disconnect()
      mutationObserver.disconnect()
    }
  }, [updateHeight])

  let maxHeightPx = minHeight
  if (isOpen) {
    maxHeightPx = Math.max(contentHeight, minHeight)
  }

  return (
    <div
      className={cn(accordionContentWrapperClassName, className)}
      style={{
        maxHeight: `${maxHeightPx}px`,
        overflow: "hidden",
        transition: `max-height ${duration}ms ease`
      }}
    >
      <div ref={innerRef} className={cn(accordionContentInnerClassName, contentInnerClassName)}>
        {children}
      </div>
    </div>
  )
}
