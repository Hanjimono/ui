import React from "react"

/** Scroll axis (vertical or horizontal) */
export type ScrollAxis = "top_to_bottom" | "left_to_right"

/** Scroll easing mode; each maps to a function in easeFunctions.ts */
export type EaseMode = "linear" | "easeInOutCubic"

/** Scroll direction */
export type Direction = "down" | "right" | "up" | "left"

/**
 * Props for the Carousel component
 */
export interface CarouselProps {
  /** Carousel title */
  title: string
  /** Icon for the start button (left or up depending on scroll axis) */
  startButtonIcon: string
  /** Icon for the end button (right or down depending on scroll axis) */
  endButtonIcon: string
  /** Extra class for the carousel header */
  headerClassName?: string

  /** Distance to scroll when a button is pressed */
  distance: number
  /** Duration of the scroll animation */
  duration: number
  /** Easing mode; see easeFunctions.ts for implementations */
  easeMode?: EaseMode
  /** Scroll axis (vertical or horizontal) */
  scrollAxis?: ScrollAxis
  /** Initial scroll position */
  initialScroll?: number

  /** Class for the carousel body. Must enable scrolling in the intended direction
   *  (for example overflow-x: scroll).
   */
  bodyClassName?: string
  /** Carousel body children */
  children: React.ReactNode | React.ReactNode[]
}

/**
 * Extended header props for Carousel; includes scroll control callbacks
 */
export interface CarouselHeaderProps {
  /** Carousel title */
  title: string
  /** Icon for the start button (left or up depending on scroll axis) */
  startButtonIcon: string
  /** Icon for the end button (right or down depending on scroll axis) */
  endButtonIcon: string
  /** Extra class for the carousel header */
  headerClassName?: string

  /** Start button handler (left or up depending on scroll axis) */
  startButtonFunction: () => void
  /** End button handler (right or down depending on scroll axis) */
  endButtonFunction: () => void
  /** Hides scroll buttons when true */
  isContentTooShortForScroll: boolean
}

/**
 * Arguments for the scroll helper
 */
export interface ScrollArgs {
  /** Distance to scroll when a button is pressed */
  distance: number
  /** Duration of the scroll animation */
  duration: number
  /** Easing function; see easeFunctions.ts */
  easeFunction?: (x: number) => number
  /** Scroll direction */
  direction: Direction

  /** Element being scrolled */
  parent: HTMLElement | null
  /** Used to stop scrolling and clearInterval */
  intervalRef: React.RefObject<ReturnType<typeof setInterval> | null>
}
