import React from "react"
import TextPrimitive from "../Text/primitive"
import { cn } from "../../Utils/cn"
import { titleBaseClassName, titleSizeClassNames } from "./titleClassNames"
import { TitleProps, TitleTagVariant } from "./types"

/**
 * Title display component with heading typography.
 *
 * @param {React.ReactNode} children - Title content
 * @param {string} className - Extra CSS class
 * @param {TitleTagVariant} as - Semantic heading level (h1–h6)
 * @param {TitleTagVariant} size - Visual heading level. When omitted, follows `as`
 * @param {string} color - Text color
 * @param {string} type - Text display type
 * @param {boolean} nowrap - Disable wrapping
 */
const Title = React.memo(
  React.forwardRef<TitleTagVariant, TitleProps>((props, ref) => {
    const { as = "h2", size, className, children, ...rest } = props
    let resolvedSize: TitleTagVariant = as
    if (size) {
      resolvedSize = size
    }

    return (
      <TextPrimitive
        ref={ref}
        as={as}
        size="inherit"
        className={cn(titleBaseClassName, titleSizeClassNames[resolvedSize], className)}
        {...(rest as React.ComponentProps<typeof TextPrimitive>)}
      >
        {children}
      </TextPrimitive>
    )
  })
)

export default Title
