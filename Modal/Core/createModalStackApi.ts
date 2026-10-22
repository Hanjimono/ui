// Core
import { createModalId } from "./modalApi"
import { getActiveElement } from "./restoreFocus"
import type { ModalDispatch, ModalStackApi, ModalStackEntry } from "./types"
import { getLayerManager } from "../../LayerService/layerManager"

/**
 * Invokes modal lifecycle callbacks on close.
 *
 * @param entry - Modal from the stack.
 */
function modalCloseCallbacksLifecycle(entry: ModalStackEntry): void {
  entry.options.onClose?.()
}

/**
 * Creates a unified API for working with the modal stack.
 * All modal actions should go through this API.
 *
 * @param dispatch - Stack reducer dispatch.
 * @param getStack - Current stack (via ref in Provider).
 * @returns show, close, closeAll, update methods.
 */
export function createModalStackApi<ModalName extends string>(params: {
  dispatch: ModalDispatch<ModalName>
  getStack: () => ModalStackEntry<ModalName>[]
}): ModalStackApi {
  const { dispatch, getStack } = params

  const layerManager = getLayerManager()

  return {
    show(name, props, options) {
      const id = createModalId()
      const returnFocusEl =
        options?.returnFocusTo ?? (typeof document !== "undefined" ? getActiveElement() : null)

      const allocatedLayer = layerManager.allocate("modal")

      dispatch({
        type: "push",
        payload: {
          id,
          name: name as ModalName,
          props: props ?? {},
          options,
          returnFocusEl,
          layerId: allocatedLayer.id
        }
      })

      return id
    },

    close(id) {
      const stack = getStack()
      // If id is passed, close that specific modal.
      if (id) {
        const entry = stack.find((item) => item.id === id)
        if (entry) {
          modalCloseCallbacksLifecycle(entry)
          if (entry.layerId !== undefined) {
            layerManager.release(entry.layerId)
          }
        }
        dispatch({ type: "pop", payload: { id } })
        return
      }

      // If id is not passed, close the top modal in the stack.
      const top = stack[stack.length - 1]
      if (top) {
        modalCloseCallbacksLifecycle(top)
        if (top.layerId !== undefined) {
          layerManager.release(top.layerId)
        }
      }
      dispatch({ type: "pop" })
    },

    closeAll() {
      const stack = getStack()
      stack.forEach((entry) => {
        modalCloseCallbacksLifecycle(entry)
        if (entry.layerId !== undefined) {
          layerManager.release(entry.layerId)
        }
      })
      dispatch({ type: "popAll" })
    },

    update(payload) {
      dispatch({ type: "update", payload })
    }
  }
}
