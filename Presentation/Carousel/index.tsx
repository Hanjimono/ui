"use client"

import React, { useRef, useEffect, useState } from "react"
import { CarouselProps, Direction, EaseMode, ScrollArgs, ScrollAxis } from "./types"
import { cn } from "../../Utils/cn"
import { easeInOutCubic, linear } from "./easeFunctions"
import CarouselHeader from "./CarouselHeader"
import { clearIntervalRef } from "../../Helper/clearTime"
import useWindowSize from "../../Hook/useWindowSize"
import { carouselBodyClassName, carouselBodyTooShortClassName } from "./carouselClassNames"

/**
 * Carousel scrolled via external startButton and endButton controls.
 */
export default function Carousel({
  title,
  startButtonIcon,
  endButtonIcon,
  headerClassName,

  distance,
  duration,
  easeMode = "linear",
  scrollAxis = "left_to_right",
  initialScroll = 0,
  bodyClassName = "",
  children
}: CarouselProps) {
  const parentRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const [isContentTooShortForScroll, setIsContentTooShortForScroll] = useState(false)
  const windowSize = useWindowSize(100)

  const startButtonFunction = () =>
    animatedScroll({
      distance: distance,
      parent: parentRef.current,
      duration: duration,
      intervalRef: intervalRef,
      easeFunction: easeFunctionFromMode(easeMode),
      direction: oppositeDirection(directionFromAxis(scrollAxis))
    })

  const endButtonFunction = () =>
    animatedScroll({
      distance: distance,
      parent: parentRef.current,
      duration: duration,
      intervalRef: intervalRef,
      easeFunction: easeFunctionFromMode(easeMode),
      direction: directionFromAxis(scrollAxis)
    })

  useEffect(() => {
    instantScroll(parentRef.current, directionFromAxis(scrollAxis), initialScroll)

    return () => {
      clearIntervalRef(intervalRef)
    }
  }, [])

  useEffect(() => {
    setIsContentTooShortForScroll(checkIsContentTooShortForScroll(parentRef.current))
  }, [windowSize])

  return (
    <div>
      <CarouselHeader
        title={title}
        startButtonIcon={startButtonIcon}
        endButtonIcon={endButtonIcon}
        headerClassName={headerClassName}
        startButtonFunction={startButtonFunction}
        endButtonFunction={endButtonFunction}
        isContentTooShortForScroll={isContentTooShortForScroll}
      />
      <div
        ref={parentRef}
        className={cn(
          bodyClassName,
          carouselBodyClassName,
          isContentTooShortForScroll && carouselBodyTooShortClassName
        )}
      >
        {children}
      </div>
    </div>
  )
}

/**
 * Animated carousel scroll.
 * Scrolls `parent` with the given parameters in `direction`.
 */
function animatedScroll({
  distance,
  duration,
  easeFunction = linear,
  direction,
  parent,
  intervalRef
}: ScrollArgs) {
  if (parent === null) {
    return
  }
  clearIntervalRef(intervalRef)

  /** Interval step for scroll position updates */
  const deltaTime = 0.01
  /** Standard ease functions only accept 0..1; scale to our distance and duration */
  const scaledEaseFunction = createScaledEaseFunction(distance, duration, easeFunction)
  /** Seconds elapsed in the animation */
  let currentTime = 0

  intervalRef.current = setInterval(function () {
    const derivative = getDerivative(currentTime, deltaTime, scaledEaseFunction)
    instantScroll(parent, direction, derivative * deltaTime)

    currentTime += deltaTime
    if (currentTime > duration) {
      clearIntervalRef(intervalRef)
    }
  }, deltaTime * 1000)
}

/**
 * Instantly scrolls an element in the given direction by the given distance
 * @param parent - element being scrolled
 * @param direction - scroll direction
 * @param distance - scroll distance
 */
function instantScroll(parent: HTMLElement | null, direction: Direction, distance: number) {
  if (parent === null) {
    return
  }

  switch (direction) {
    case "up":
      parent.scrollTop -= distance
      break
    case "down":
      parent.scrollTop += distance
      break
    case "right":
      parent.scrollLeft += distance
      break
    case "left":
      parent.scrollLeft -= distance
      break
  }
}

/**
 * Resolves an easing function by name
 * @param easeMode - easing mode name
 */
function easeFunctionFromMode(easeMode: EaseMode) {
  switch (easeMode) {
    case "linear":
      return linear
    case "easeInOutCubic":
      return easeInOutCubic
  }
}

/**
 * Numerical derivative of a function
 * @param x - point at which to evaluate
 * @param deltaX - step size; smaller is more accurate
 * @param func - function to differentiate
 */
function getDerivative(x: number, deltaX: number, func: (x: number) => number) {
  return (func(x + deltaX) - func(x)) / deltaX
}

/**
 * Standard ease functions only accept 0..1.
 * Scales the ease function to the target duration and distance.
 * @param distance - total scroll distance by the end of the animation
 * @param duration - animation duration
 * @param easeFunction - base ease function
 */
function createScaledEaseFunction(
  distance: number,
  duration: number,
  easeFunction: (x: number) => number
) {
  return function (x: number) {
    return easeFunction(x / duration) * distance
  }
}

/**
 * Maps scroll axis to a primary scroll direction
 * @param scrollAxis - scroll axis
 */
function directionFromAxis(scrollAxis: ScrollAxis) {
  if (scrollAxis === "left_to_right") {
    return "right"
  }
  return "down"
}

/**
 * Opposite scroll direction
 * @param direction - original direction
 */
function oppositeDirection(direction: Direction): Direction {
  switch (direction) {
    case "down":
      return "up"
    case "up":
      return "down"
    case "right":
      return "left"
    case "left":
      return "right"
  }
}

/** Whether content is short enough that scrolling is unnecessary */
function checkIsContentTooShortForScroll(parent: HTMLElement | null): boolean {
  if (parent === null) {
    return false
  }

  return parent.scrollWidth <= parent.clientWidth
}
