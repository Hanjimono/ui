import type { AllocatedLayer, LayerConfig, LayerManager } from "./types"

/**
 * Counter used to create layer ids.
 */
let globalIdCounter = 0

/**
 * Creates a layer id.
 * @returns Layer id.
 */
function createId(): number {
  globalIdCounter += 1
  return globalIdCounter
}

/**
 * Creates a layer manager.
 * Use it to manage z-index for modal and floating elements so they stack
 * correctly over each other in the right order.
 *
 * @param config - Base z-index values and steps for modal/floating.
 * @returns allocate/release manager.
 */
export function createLayerManager(config: LayerConfig): LayerManager {
  /**
   * Layer store keyed by layer id.
   */
  const layers = new Map<number, AllocatedLayer>()

  /**
   * Returns the top modal layer.
   * @returns Top modal layer, or undefined if there are no modal layers.
   */
  const getTopModal = (): AllocatedLayer | undefined => {
    let top: AllocatedLayer | undefined
    layers.forEach((layer) => {
      if (layer.type !== "modal") {
        return
      }
      if (!top || layer.zIndex > top.zIndex) {
        top = layer
      }
    })
    return top
  }

  /**
   * Returns the top floating layer.
   * @returns Top floating layer, or undefined if there are no floating layers.
   */
  const getTopFloating = (): AllocatedLayer | undefined => {
    let top: AllocatedLayer | undefined
    layers.forEach((layer) => {
      if (layer.type !== "floating") {
        return
      }
      if (!top || layer.zIndex > top.zIndex) {
        top = layer
      }
    })
    return top
  }

  /**
   * Layer manager.
   * @returns allocate/release manager.
   */
  const manager: LayerManager = {
    /**
     * Allocates a layer of the given type.
     * @param type - Layer type.
     * @returns Allocated layer.
     */
    allocate(type) {
      // Create a layer id.
      const id = createId()

      // Modal layers use the base z-index plus a step per open modal.
      if (type === "modal") {
        // Count current modal layers.
        const currentCount = Array.from(layers.values()).filter(
          (layer) => layer.type === "modal"
        ).length

        // Compute z-index for the layer.
        const zIndex = config.modalBaseZIndex + currentCount * config.modalZIndexStep

        // Create the layer.
        const layer: AllocatedLayer = { id, type, zIndex }

        // Store the layer.
        layers.set(id, layer)
        return layer
      }

      // Floating layers are more involved and must account for open modals
      // Get the top modal layer.
      const topModal = getTopModal()
      // Get the top floating layer.
      const topFloating = getTopFloating()

      // Base z-index from config.
      const baseFromConfig = config.floatingBaseZIndex
      // Z-index above the top modal layer.
      const baseFromModal = topModal ? topModal.zIndex + config.floatingAboveModalStep : 0
      // Max of the base candidates.
      const base = Math.max(baseFromConfig, baseFromModal)
      // Next floating z-index so it renders above an open modal when needed.
      const nextFromExisting =
        topFloating && topFloating.zIndex >= base ? topFloating.zIndex + 1 : base

      const layer: AllocatedLayer = {
        id,
        type,
        zIndex: nextFromExisting
      }
      layers.set(id, layer)
      return layer
    },

    /**
     * Releases a layer.
     * @param id - Layer id.
     */
    release(id) {
      layers.delete(id)
    },

    /**
     * Returns the z-index of a layer.
     * @param id - Layer id.
     * @returns Layer z-index, or undefined if no layer with that id exists.
     */
    getLayerZIndex(id) {
      return layers.get(id)?.zIndex
    },

    /**
     * Returns the z-index of the top modal layer.
     * @returns Top modal z-index, or undefined if there are no modal layers.
     */
    getActiveModalZIndex() {
      const topModal = getTopModal()
      return topModal?.zIndex
    }
  }

  return manager
}
