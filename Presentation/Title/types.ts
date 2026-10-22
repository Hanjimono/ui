import { TextColor, TextPrimitiveProps } from "../Text/types"

/** HTML tags allowed for titles */
export type TitleTagVariant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6"

/** Title props match text, with a narrowed tag list and a separate visual size. */
export interface TitleProps
  extends Omit<TextPrimitiveProps<TitleTagVariant, TextColor>, "size" | "as"> {
  as?: TitleTagVariant
  /** Visual title level. When omitted, size follows `as`. */
  size?: TitleTagVariant
}
