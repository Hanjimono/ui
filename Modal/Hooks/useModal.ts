"use client"

// System
import { useCallback, useState } from "react"

// Core
import { useModalContext } from "../ModalProvider"

// Types
import type { ModalOpenOptions } from "../Core/types"
import type { UseModalHook } from "./types"
import type { ModalName, ModalRegistryMap } from "../Registry/types"

/**
 * Hook for working with registry modals.
 * Opens and closes modals from the registry.
 *
 * @param name - Registry modal key (required).
 * @returns open, close, lastId.
 */
export function useModal<TName extends ModalName>(name: TName): UseModalHook<TName> {
  const { show, close: closeFromContext } = useModalContext()
  const [lastId, setLastId] = useState<string | null>(null)

  const close = useCallback(
    (id?: string) => {
      closeFromContext(id ?? lastId ?? undefined)
      setLastId(null)
    },
    [lastId, closeFromContext]
  )

  const open = useCallback(
    (props?: ModalRegistryMap[TName], options?: ModalOpenOptions) => {
      const id = show(name, props, options)
      setLastId(id)
      return id
    },
    [name, show]
  )

  return {
    open,
    close,
    lastId
  }
}

export default useModal
