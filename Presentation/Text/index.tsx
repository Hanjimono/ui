import React from "react"
import TextPrimitive from "./primitive"
import { TextAsTags, TextColor, TextProps } from "./types"

/**
 * Text display component with preset styles.
 *
 * Built on the text primitive. Use it for basic text look and behavior.
 * For more specific styling prefer custom classes via className.
 *
 * @param {string} as - HTML tag used for the text
 * @param {string} size - Text size
 * @param {string} color - Text color
 * @param {string} className - Extra CSS class
 * @param {string} type - Text display type
 * @param {boolean} nowrap - Disable wrapping
 */
const Text = React.memo(
  React.forwardRef<TextAsTags, TextProps<TextAsTags>>((props, ref) => {
    const { as = "span", size = "s", color = "default" as TextColor, ...rest } = props

    return <TextPrimitive ref={ref} as={as} size={size} color={color} {...rest} />
  })
)

export default Text
