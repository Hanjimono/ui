"use client"

// System
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef
} from "react"

// UI
import resolvedUiConfig from "../../Config/uiConfig"
import { createModalStackApi } from "../Core/createModalStackApi"
import { useEscapeHandler } from "../Core/escapeHandler"
import { registerModalStackApi } from "../Core/modalApi"
import { createInitialModalStackState, modalStackReducer } from "../Core/modalStackReducer"
import { restoreFocus } from "../Core/restoreFocus"
import { useScrollLock } from "../Core/scrollLock"

// Types
import type { ModalContextValue, ModalProviderProps } from "./types"
import type { ModalName } from "../Registry/types"

/** Shared config for all props */
const UI_CONFIG = resolvedUiConfig

/**
 * Modal context.
 * Used to access the modal stack and its methods.
 */
const ModalContext = createContext<ModalContextValue | null>(null)

/**
 * Hook to access the modal context.
 * !Important: do not use this hook outside ModalProvider and the ui-kit modal system.
 * To work with modals, use the useModal hook from Modal/Hooks/useModal
 * or stackApi from Modal/Core/createModalStackApi when calling outside the React tree.
 *
 * @returns Modal context.
 * @throws If called outside ModalProvider.
 */
export function useModalContext(): ModalContextValue {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error("useModalContext: component must be inside ModalProvider")
  }
  return context
}

/**
 * Modal provider: stack, scroll lock, imperative API.
 *
 * @param children - App tree.
 * @param lockScroll - Lock body scroll while a modal is open.
 */
export default function ModalProvider({
  children,
  lockScroll = UI_CONFIG.modalLockScroll
}: ModalProviderProps) {
  // Initialize the modal stack
  const [state, dispatch] = useReducer(
    modalStackReducer<ModalName>,
    undefined,
    createInitialModalStackState<ModalName>
  )
  // Ref to the previous stack for focus restoration
  const previousStackRef = useRef(state.stack)
  // Current stack for the API (show/close must not close over stale state)
  const stackRef = useRef(state.stack)
  stackRef.current = state.stack

  // Unified stack API: same methods as global `modal`, plus lifecycle callbacks
  const stackApi = useMemo(
    () =>
      createModalStackApi<ModalName>({
        dispatch,
        getStack: () => stackRef.current
      }),
    [dispatch]
  )

  // Register the API for imperative `modal` outside the React tree
  useEffect(() => {
    return registerModalStackApi(stackApi)
  }, [stackApi])

  // Lock body scroll while a modal is open, if this option is enabled
  useScrollLock(lockScroll && state.stack.length > 0)

  const topEntry = state.stack[state.stack.length - 1]

  // Escape handler to close the top modal in the stack
  const handleEscape = useCallback(() => {
    if (!topEntry) {
      return
    }
    // Check whether Escape dismiss is enabled for the top modal
    const dismissOnEscape = topEntry.options.dismissOnEscape ?? UI_CONFIG.modalDismissOnEscape
    // Check whether close is blocked for the top modal
    const preventClose = topEntry.options.preventClose ?? false
    if (!dismissOnEscape || preventClose) {
      return
    }
    // Close via the shared API (callbacks + pop)
    stackApi.close()
  }, [topEntry, stackApi])

  // Bind the Escape close declared above to the Escape handler
  // via a dedicated hook
  useEscapeHandler({
    active: !!topEntry,
    onEscape: handleEscape
  })

  // Restore focus to the element that should receive it after the modal closes
  useEffect(() => {
    const prevStack = previousStackRef.current
    const nextStack = state.stack

    if (nextStack.length < prevStack.length && UI_CONFIG.modalRestoreFocus) {
      // Find the last modal removed from the stack
      const removed = prevStack.filter((entry) => !nextStack.some((e) => e.id === entry.id))
      const lastRemoved = removed[removed.length - 1]
      if (lastRemoved) {
        // Find the element that should receive focus after the modal closes
        const focusTarget =
          lastRemoved.options.returnFocusTo ?? (lastRemoved.returnFocusEl as Element | null)
        restoreFocus(focusTarget)
      }
    }

    previousStackRef.current = nextStack
  }, [state.stack])

  // Initialize the context value
  // !Important. For methods use the single public API so logic is not scattered
  const contextValue = useMemo<ModalContextValue>(
    () => ({
      stack: state.stack,
      show: stackApi.show,
      close: stackApi.close,
      closeAll: stackApi.closeAll,
      update: stackApi.update
    }),
    [state.stack, stackApi]
  )

  return <ModalContext.Provider value={contextValue}>{children}</ModalContext.Provider>
}
