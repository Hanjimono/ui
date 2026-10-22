/** Layer type in the global allocator */
export type LayerType = "modal" | "floating"

/** Z-index step configuration for the layer manager */
export interface LayerConfig {
  /** Base z-index for modal layers */
  modalBaseZIndex: number
  /** Z-index step for modal layers */
  modalZIndexStep: number
  /** Base z-index for floating layers */
  floatingBaseZIndex: number
  /** Z-index step for floating layers above modals */
  floatingAboveModalStep: number
}

/** Allocated layer with a resolved z-index */
export interface AllocatedLayer {
  /** Layer id */
  id: number
  /** Layer type (modal or floating) */
  type: LayerType
  /** Resolved layer z-index */
  zIndex: number
}

/** Layer manager API */
export interface LayerManager {
  /** Allocates a layer of the given type */
  allocate: (type: LayerType) => AllocatedLayer
  /** Releases a layer */
  release: (id: number) => void
  /** Returns the z-index of a layer */
  getLayerZIndex: (id: number) => number | undefined
  /** Returns the z-index of the top modal layer */
  getActiveModalZIndex: () => number | undefined
}
