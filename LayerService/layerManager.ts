"use client"

import resolvedUiConfig from "../Config/uiConfig"
import { createLayerManager } from "./createLayerManager"
import type { LayerManager } from "./types"

let manager: LayerManager | null = null

/**
 * Global layer manager singleton.
 * Must be used by all overlay systems (Modal, Popup, Tooltip, Select)
 * so z-index is computed consistently.
 *
 * @returns Shared LayerManager instance for the app.
 */
export function getLayerManager(): LayerManager {
  if (manager) {
    return manager
  }

  manager = createLayerManager({
    modalBaseZIndex: resolvedUiConfig.modalBaseZIndex,
    modalZIndexStep: resolvedUiConfig.modalZIndexStep,
    floatingBaseZIndex: 1000,
    floatingAboveModalStep: 1
  })

  return manager
}

export default getLayerManager
