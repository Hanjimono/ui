"use client"

import React from "react"
import TextPrimitive from "../../Presentation/Text/primitive"
import { cn } from "../../Utils/cn"
import type { LinkProps } from "../../Presentation/Link/types"
import { linkBaseClassName, linkColorClassNames } from "../../Presentation/Link/linkClassNames"

/**
 * Button that looks like a link. Follows the same base rules as Text.
 * Reuses link class names and types from the Link component.
 *
 * @param {string} className - Extra CSS class
 * @param {LinkColor} color - Color scheme (link, link-minor, or text)
 * @param {string} type - Text display type
 * @param {boolean} nowrap - Disable wrapping
 */
const LinkLikeButton = React.memo(
  React.forwardRef<HTMLSpanElement, LinkProps>((props, ref) => {
    const { color = "link", className, ...rest } = props

    // Link color comes from this component; the text primitive gets color="none"
    return (
      <button className={cn("bg-transparent border-none m-0 p-0", className)} type="button">
        <TextPrimitive
          ref={ref}
          as={"span"}
          color="none"
          className={cn(linkBaseClassName, color && linkColorClassNames[color])}
          {...(rest as React.ComponentProps<typeof TextPrimitive>)}
        />
      </button>
    )
  })
)

export default LinkLikeButton
