import React from "react"

export type ContainerVariant = "responsive" | "fluid"

/** Container that constrains content width based on viewport size */
export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  /** Extra CSS classes */
  className?: string
  /** Container type. responsive — fixed adaptive width; fluid — full viewport width */
  type?: ContainerVariant
}
