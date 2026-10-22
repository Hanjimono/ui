import { TextPrimitiveColor, TextPrimitiveProps } from "../Text/types"

/** Link color schemes */
export type LinkColor = "link" | "link-minor" | "text"

/** Link props match text, but only allow anchor semantics and link colors. */
export type LinkProps = Omit<TextPrimitiveProps<"a", TextPrimitiveColor>, "color" | "as"> & {
  /** Link color */
  color?: LinkColor
}
