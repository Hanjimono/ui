import { validationMessages } from "./messages"
import { validationPrimitives, ValidationPrimitives } from "./primitives"

/**
 * Standard Zod validation rules.
 * Broader but more complex rules used in concrete situations.
 */

/**
 * Creates the base set of validation rules.
 */
function createBaseValidationRules<TPrimitives extends ValidationPrimitives>(
  primitives: TPrimitives
) {
  return {
    strongPassword: (minLength = 10) =>
      primitives
        .password(minLength)
        .regex(/[A-Z]/, validationMessages.password.must_contain_uppercase)
        .regex(/[a-z]/, validationMessages.password.must_contain_lowercase)
        .regex(/[0-9]/, validationMessages.password.must_contain_number)
        .regex(/[^A-Za-z0-9]/, validationMessages.password.must_contain_special),
    /**
     * Russian mobile number: 10 subscriber digits, first digit is 9.
     * For an 11-digit string, leading 7 or 8 is treated as country code and stripped.
     */
    strictPhone: () =>
      primitives.requiredString().refine((value) => {
        const digits = value.replace(/\D/g, "")
        const national =
          digits.length >= 11 && (digits.startsWith("7") || digits.startsWith("8"))
            ? digits.slice(1, 11)
            : digits

        return national.length === 10 && national.startsWith("9")
      }, validationMessages.phone.invalid)
  }
}

/** Base set of validation rules. */
export const validationRules = createBaseValidationRules(validationPrimitives)

export type ValidationRules = typeof validationRules
