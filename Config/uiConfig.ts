import { defaultUiConfig } from "./uiConfig.default"
import localUiConfig from "./uiConfig.local"
import { UiConfig } from "./uiConfig.types"

/**
 * Merges default UI config with the host-project local overrides.
 *
 * @param defaults - Default UI configuration
 * @param overrides - Local UI configuration from the host project
 */
function mergeUiConfig(defaults: UiConfig, overrides?: Partial<UiConfig>): UiConfig {
  if (!overrides) {
    return defaults
  }

  return {
    ...defaults,
    ...overrides
  }
}

/**
 * Resolved UI configuration.
 * Used for default values that affect component appearance and behaviour.
 */
export const resolvedUiConfig: UiConfig = mergeUiConfig(defaultUiConfig, localUiConfig)

export default resolvedUiConfig
