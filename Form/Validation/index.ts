import { configureZodValidation } from "./configure"
import { z } from "zod"
import { validationMessages } from "./messages"
import { validationPrimitives } from "./primitives"
import { validationRules } from "./rules"

/**
 * Base set of UI-Kit schemas.
 * Use directly for standard cases.
 */
export const validation = {
  messages: validationMessages,
  primitives: validationPrimitives,
  rules: validationRules
}

/**
 * Short alias over `z.object(...)` for declarative form schema assembly.
 */
export function createValidationSchema<TShape extends z.ZodRawShape>(shape: TShape) {
  return z.object(shape)
}

/**
 * Single entry point for Zod system error localization.
 * Call once before creating schemas or when mounting a form.
 */
export function setupValidation() {
  configureZodValidation()
}

export { validationMessages, validationPrimitives, validationRules }
