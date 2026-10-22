// Types
import type { ReactNode } from "react"
import type { ModalStackApi, ModalStackEntry } from "../Core/types"
import type { ModalName } from "../Registry/types"

/** ModalProvider context value: reactive stack + the same API as `modal` */
export interface ModalContextValue extends ModalStackApi {
  /** Modal stack */
  stack: ModalStackEntry<ModalName>[]
}

/** ModalProvider props */
export interface ModalProviderProps {
  /** App child tree */
  children: ReactNode
  /** Lock body scroll (default from uiConfig) */
  lockScroll?: boolean
}
