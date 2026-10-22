import { TitleTagVariant } from "./types"

export const titleBaseClassName = "font-title [font-weight:var(--font-weight-title)]"

export const titleSizeClassNames = {
  h1: "text-heading-mobile-1 lg:text-heading-1",
  h2: "text-heading-mobile-2 lg:text-heading-2",
  h3: "text-heading-mobile-3 lg:text-heading-3",
  h4: "text-heading-mobile-4 lg:text-heading-4",
  h5: "text-heading-mobile-5 lg:text-heading-5",
  h6: "text-heading-mobile-6 lg:text-heading-6"
} as const satisfies Record<TitleTagVariant, string>
