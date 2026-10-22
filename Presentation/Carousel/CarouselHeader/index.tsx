import React from "react"
import type { CarouselHeaderProps } from "../types"
import { cn } from "../../../Utils/cn"
import Title from "../../Title"
import Button from "../../../Action/Button"
import {
  carouselHeaderButtonsClassName,
  carouselHeaderClassName,
  carouselHeaderTooShortClassName
} from "./carouselHeaderClassNames"

/**
 * Carousel header with scroll control buttons
 */
export default function CarouselHeader({
  title,
  startButtonIcon,
  endButtonIcon,
  headerClassName = "",
  startButtonFunction,
  endButtonFunction,
  isContentTooShortForScroll
}: CarouselHeaderProps) {
  return (
    <div
      className={cn(
        carouselHeaderClassName,
        headerClassName,
        isContentTooShortForScroll && carouselHeaderTooShortClassName
      )}
    >
      <Title as="h2">{title}</Title>
      <div className={carouselHeaderButtonsClassName}>
        <Button theme="secondary" shadow="no-shadow" width="narrow" onClick={startButtonFunction}>
          <img src={startButtonIcon} alt="start-icon" />
        </Button>
        <Button theme="secondary" shadow="no-shadow" width="narrow" onClick={endButtonFunction}>
          <img src={endButtonIcon} alt="end-icon" />
        </Button>
      </div>
    </div>
  )
}
