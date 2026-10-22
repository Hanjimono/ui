import React from "react"
import TextPrimitive from "../Text/primitive"
import { cn } from "../../Utils/cn"
import { linkBaseClassName, linkColorClassNames } from "./linkClassNames"
import type { LinkProps } from "./types"

/**
 * Link component. Follows the same base rules as Text.
 *
 * @param {string} href - Link URL
 * @param {string} className - Extra CSS class
 * @param {string} target - Link target (for example, _blank)
 * @param {LinkColor} color - Link color scheme (link, link-minor, or text)
 * @param {string} type - Text display type
 * @param {boolean} nowrap - Disable wrapping
 */
const Link = React.memo(
  React.forwardRef<HTMLAnchorElement | HTMLSpanElement, LinkProps>((props, ref) => {
    const { color = "link", className, href, target, ...rest } = props

    let tag: "a" | "span" = "span"
    if (href) {
      tag = "a"
    }

    // Link color comes from this component; the text primitive gets color="none"
    return (
      <TextPrimitive
        ref={ref}
        as={tag}
        href={href}
        target={target}
        color="none"
        className={cn(linkBaseClassName, color && linkColorClassNames[color], className)}
        {...(rest as React.ComponentProps<typeof TextPrimitive>)}
      />
    )
  })
)

export default Link
