import React from "react"
import { cn } from "../../Utils/cn"
import { colorClassNames, sizeClassNames, textBaseClassName, typeClassNames } from "./textClassNames"
import { AsTags, TextPrimitiveColor, TextPrimitiveProps, TextPropType } from "./types"

/**
 * Base text primitive with the full set of supported tags and colors.
 * Used as the foundation for Text, Title, Link, and similar components.
 *
 * Concrete components can narrow the allowed tags while still rendering through this layer.
 *
 * @param {string} as - HTML tag used for the text
 * @param {string} size - Text size
 * @param {string} color - Text color
 * @param {string} className - Extra CSS class
 * @param {string} type - Text display type
 * @param {boolean} nowrap - Disable wrapping
 */
const TextPrimitive = React.memo(
  React.forwardRef<AsTags, TextPrimitiveProps<AsTags, TextPrimitiveColor>>((props, ref) => {
    const {
      as = "span",
      size = "s",
      color = "default",
      className,
      style,
      children,
      type,
      nowrap,
      ...rest
    } = props

    const Tag = as as React.ElementType

    let clampValue: number | undefined
    if ((type as TextPropType | undefined) === "clamp") {
      clampValue = (props as { clamp?: number }).clamp
    }

    let computedStyle = style as React.CSSProperties | undefined
    if (clampValue != null) {
      computedStyle = { ...style, WebkitLineClamp: clampValue }
    }

    let colorClassName: string | undefined
    if (color && color !== "none") {
      colorClassName = colorClassNames[color]
    }

    return (
      <Tag
        ref={ref}
        style={computedStyle}
        className={cn(
          textBaseClassName,
          size && sizeClassNames[size],
          colorClassName,
          type && typeClassNames[type],
          nowrap && "whitespace-nowrap",
          className
        )}
        {...rest}
      >
        {children}
      </Tag>
    )
  })
)

export default TextPrimitive
