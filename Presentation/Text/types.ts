import React from "react"

/** HTML tags allowed for text primitives */
export type AsTags =
  | "label"
  | "a"
  | "i"
  | "li"
  | "p"
  | "ruby"
  | "small"
  | "span"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"

/** Text size tokens */
export type TextPropSize = "2xs" | "xs" | "s" | "m" | "l" | "xl" | "2xl" | "3xl" | "inherit"

/** Text display behavior */
export type TextPropType = "plain" | "truncate" | "clamp"

/** Color schemes for the text primitive */
export type TextPrimitiveColor = "primary" | "secondary" | "success" | "danger" | "default" | "none"

/** Public Text colors (without internal `none`) */
export type TextColor = Exclude<TextPrimitiveColor, "none">

/** Polymorphic props based on the rendered tag */
type PolymorphicTextProps<T extends AsTags> = { as?: T } & React.ComponentPropsWithoutRef<T>

/** Shared text props */
interface BaseTextProps<TColor extends TextPrimitiveColor = TextPrimitiveColor> {
  /** Text content */
  children?: React.ReactNode
  /** Extra CSS class */
  className?: string
  /** Text size */
  size?: TextPropSize
  /** Text color */
  color?: TColor
  /** Disable wrapping */
  nowrap?: boolean
  /** HTML `for` attribute */
  for?: string
}

/** Props when type is clamp */
interface ClampTextProps<TColor extends TextPrimitiveColor = TextPrimitiveColor>
  extends BaseTextProps<TColor> {
  /** Clamp text to a fixed number of lines */
  type: "clamp"
  /** Line count for clamp (required when type is clamp) */
  clamp: number
}

/** Props for non-clamp types */
interface NonClampTextProps<TColor extends TextPrimitiveColor = TextPrimitiveColor>
  extends BaseTextProps<TColor> {
  /** Display type excluding clamp */
  type?: Exclude<TextPropType, "clamp">
}

/** Full text primitive props (all tags and colors) */
export type TextPrimitiveProps<
  T extends AsTags,
  TColor extends TextPrimitiveColor
> = PolymorphicTextProps<T> & (ClampTextProps<TColor> | NonClampTextProps<TColor>)

/** Tags exposed by public Text (no links or headings) */
export type TextAsTags = Exclude<AsTags, "a" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6">

/** Public Text props */
export type TextProps<T extends TextAsTags = TextAsTags> = TextPrimitiveProps<T, TextColor>
