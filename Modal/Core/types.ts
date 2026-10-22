// Types
import type { ComponentType, ReactNode, RefObject } from "react"

/** Modal role for accessibility */
export type ModalRole = "dialog" | "alertdialog"

/** Options for opening a modal in the stack */
export interface ModalOpenOptions {
  /** Dismiss on Escape */
  dismissOnEscape?: boolean
  /** Dismiss on overlay click */
  dismissOnOverlayClick?: boolean
  /** Block any dismiss */
  preventClose?: boolean
  /** Aria role of the root dialog */
  role?: ModalRole
  /** Element to restore focus to after close */
  returnFocusTo?: HTMLElement | null
  /** Callback when the modal is closed in the stack */
  onClose?: () => void
  /** Hide the dimming overlay (overlay is on by default) */
  withoutOverlay?: boolean
  /**
   * Do not wrap in Modal: the registry component renders Modal/Primitive itself.
   * For rare custom modals.
   */
  unwrapped?: boolean
}

/**
 * Entry in the modal stack
 * TODO: need to verify that modal props are properly typed at the call site
 */
export interface ModalStackEntry<ModalName extends string = string> {
  /** Modal identifier */
  id: string
  /** Modal name */
  name: ModalName
  /** Props for the modal component */
  props: unknown
  /** Display options for the modal */
  options: ModalOpenOptions
  /** Element to restore focus to after close */
  returnFocusEl: Element | null
  /** Layer id for z-index management via LayerService */
  layerId?: number
}

/** Modal stack state */
export type ModalStackState<TName extends string = string> = {
  /** Modal stack */
  stack: ModalStackEntry<TName>[]
}

/** Action against the modal stack
 * TODO: ugly type, need to split it into parts
 */
export type ModalStackAction<TName extends string = string> =
  | {
      type: "push"
      payload: {
        id: string
        name: TName
        props: unknown
        options?: ModalOpenOptions
        returnFocusEl: Element | null
        layerId: number
      }
    }
  | { type: "pop"; payload?: { id?: string } }
  | { type: "popAll" }
  | {
      type: "update"
      payload: { id?: string; props?: unknown; options?: Partial<ModalOpenOptions> }
    }

/** Props the registry passes to every modal component */
export interface ModalInjectedProps {
  /** Close the modal */
  close: () => void
  /** Modal identifier */
  modalId: string
  /** Whether this modal is the top of the stack */
  isTop: boolean
  /** Title id for aria-labelledby */
  titleId?: string
  /** Description id for aria-describedby */
  descriptionId?: string
}

/** Modal component from the registry */
export type ModalRegistryComponent<ModalComponentProps = Record<string, unknown>> = ComponentType<
  ModalComponentProps & ModalInjectedProps
>

/** Content for declarative useModal without a registry */
export type ModalDeclarativeContent = ReactNode | ((props: { close: () => void }) => ReactNode)

/** Dispatch an action against the stack for the imperative API */
export type ModalDispatch<ModalName extends string = string> = (
  action: ModalStackAction<ModalName>
) => void

/** Unified stack management API (imperative modal and React context) */
export interface ModalStackApi {
  /** Open a modal from the registry */
  show: (name: string, props?: unknown, options?: ModalOpenOptions) => string
  /** Close the top modal or a modal by id */
  close: (id?: string) => void
  /** Close all modals */
  closeAll: () => void
  /** Update props/options of the top or a given modal */
  update: (payload: { id?: string; props?: unknown; options?: Partial<ModalOpenOptions> }) => void
}

/**
 * Options for the hook that traps focus inside a modal
 */
export interface UseFocusTrapOptions {
  /** Enable the focus trap */
  active?: boolean
  /** Ref to the element for initial focus */
  initialFocusRef?: RefObject<HTMLElement | null>
}

/**
 * Options for the hook that handles Escape inside a modal
 */
export interface UseEscapeHandlerOptions {
  /** Escape handler */
  onEscape: () => void
  /** Enable the listener */
  active?: boolean
}
