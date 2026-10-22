import { z } from "zod"

import { validationMessages } from "./messages"

/**
 * Custom Zod validation primitives.
 * These primitives are simple enough to use as full rules,
 * or as a base for more complex rules.
 */
/** Converts an empty string to undefined. */
const emptyToUndefined = (value: unknown) => (value === "" ? undefined : value)

/** Required non-empty string. */
export const requiredString = (message = validationMessages.common.required) =>
  z.string().min(1, message)

/** Required email. */
export const email = () => requiredString().email(validationMessages.email.invalid)

/** Optional email. */
//TODO: this primitive is incorrect because it is wrapped in preprocess, so it can no longer be customized
// either move it to rules, or fix it so preprocess is not needed
export const optionalEmail = () =>
  z.preprocess(emptyToUndefined, z.string().email(validationMessages.email.invalid).optional())

/** Required password. */
export const password = (minLength = 8) =>
  requiredString().min(minLength, validationMessages.password.too_short(minLength))

export type ValidationPrimitives = {
  requiredString: typeof requiredString
  email: typeof email
  optionalEmail: typeof optionalEmail
  password: typeof password
}

/** Base set of UI-Kit schemas. */
export const validationPrimitives: ValidationPrimitives = {
  requiredString,
  email,
  optionalEmail,
  password
}
