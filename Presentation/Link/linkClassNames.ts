import { LinkColor } from "./types"

/**
 * Base link look. Exported so host HTML-from-server styles can reuse the same utilities
 * (work-ui exposed SCSS mixins for the same reason).
 */
export const linkBaseClassName =
  "font-text leading-text cursor-pointer no-underline transition-colors duration-300 ease-in-out"

export const linkColorClassNames = {
  link: "text-link hover:text-link-hover",
  "link-minor": "text-link-minor hover:text-link-minor-hover",
  text: "text-text-default"
} as const satisfies Record<LinkColor, string>
