// Registry
import { defaultRegistry } from "./default"
import localRegistry from "./local"

// Types
import type { DefaultModalRegistry, LocalModalRegistry, ModalRegistry } from "./types"

/**
 * Merges the default modal registry with the project's local registry.
 *
 * @param defaults - Built-in registry.
 * @param overrides - Additional project modals.
 * @returns Full component registry.
 */
function mergeRegistry<
  DynamicDefaultModalRegistry extends DefaultModalRegistry,
  DynamicLocalModalRegistry extends LocalModalRegistry
>(
  defaults: DynamicDefaultModalRegistry,
  overrides: DynamicLocalModalRegistry
): DynamicDefaultModalRegistry & DynamicLocalModalRegistry {
  return {
    ...defaults,
    ...overrides
  }
}

/** Final modal registry for ModalProvider and useModal */
export const resolvedRegistry: ModalRegistry = mergeRegistry(
  defaultRegistry,
  localRegistry as LocalModalRegistry
)

export default resolvedRegistry
