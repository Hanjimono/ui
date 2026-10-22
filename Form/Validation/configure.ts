import { z } from "zod"

import { zodEnErrorMap } from "./zodErrorMap"

let isConfigured = false

/**
 * Enables English localization for standard Zod errors.
 * Repeated calls are safe and do not reconfigure Zod.
 */
export function configureZodValidation() {
  if (isConfigured) {
    return
  }

  z.config({
    customError: zodEnErrorMap
  })

  isConfigured = true
}
