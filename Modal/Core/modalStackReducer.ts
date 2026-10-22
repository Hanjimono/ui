// Types
import type { ModalStackAction, ModalStackEntry, ModalStackState } from "./types"

/**
 * Initial modal stack state.
 */
export function createInitialModalStackState<
  ModalName extends string = string
>(): ModalStackState<ModalName> {
  return { stack: [] }
}

/**
 * Hand-rolled modal stack reducer.
 * Handles the main stack actions: push, pop, popAll, update.
 *
 * @param state - Current state.
 * @param action - Stack action.
 * @returns New stack state.
 */
export function modalStackReducer<TName extends string = string>(
  state: ModalStackState<TName>,
  action: ModalStackAction<TName>
): ModalStackState<TName> {
  switch (action.type) {
    case "push": {
      // push adds a new modal to the stack
      const entry: ModalStackEntry<TName> = {
        id: action.payload.id,
        name: action.payload.name,
        props: action.payload.props,
        options: action.payload.options ?? {},
        returnFocusEl: action.payload.returnFocusEl
      }
      return { stack: [...state.stack, entry] }
    }
    case "pop": {
      // pop removes a modal from the stack. If id is passed, that modal is removed;
      // otherwise the top modal is removed.
      const targetId = action.payload?.id
      if (!targetId) {
        return { stack: state.stack.slice(0, -1) }
      }
      return { stack: state.stack.filter((entry) => entry.id !== targetId) }
    }
    case "popAll":
      // popAll removes all modals from the stack.
      return { stack: [] }
    case "update": {
      // update updates a modal in the stack. If id is passed, that modal is updated;
      // otherwise the top modal is updated.
      const targetId = action.payload.id ?? state.stack[state.stack.length - 1]?.id
      if (!targetId) {
        return state
      }
      return {
        stack: state.stack.map((entry) => {
          if (entry.id !== targetId) {
            return entry
          }
          return {
            ...entry,
            props: action.payload.props ?? entry.props,
            options: { ...entry.options, ...action.payload.options }
          }
        })
      }
    }
    default:
      return state
  }
}
