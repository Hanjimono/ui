import type { z } from "zod"

import { validationMessages } from "./messages"

export type ZodIssue = Parameters<NonNullable<z.core.$ZodConfig["customError"]>>[0]

function toNumber(value: number | bigint): number {
  return typeof value === "bigint" ? Number(value) : value
}

function getExpectedTypeLabel(expected: unknown): string {
  if (typeof expected !== "string") {
    return "a valid type"
  }

  return (
    validationMessages.type[expected as keyof typeof validationMessages.type] ?? "a valid type"
  )
}

export function buildRequiredTypeErrorMessage(issue: ZodIssue): string {
  // Zod allows undefined as a field value, which yields a type mismatch error,
  // but we need to show a required-field message instead — so we special-case undefined.
  // This looks awkward, but it is effectively the official way to handle these errors.
  // By default an empty string ("") is not an invalid type for string and will not hit this check;
  // the requiredString primitive covers that case.
  if (issue.input === undefined) {
    return validationMessages.common.required
  }

  return validationMessages.common.invalid_type(getExpectedTypeLabel(issue.expected))
}

function buildInvalidFormatMessage(issue: ZodIssue): string {
  if (issue.code !== "invalid_format") {
    return validationMessages.common.invalid
  }

  switch (issue.format) {
    case "email":
      return validationMessages.string.email
    case "url":
      return validationMessages.string.url
    case "uuid":
      return validationMessages.string.uuid
    case "cuid":
      return validationMessages.string.cuid
    case "datetime":
      return validationMessages.string.datetime
    case "emoji":
      return validationMessages.string.emoji
    case "ip":
      return validationMessages.string.ip
    case "jwt":
      return validationMessages.string.jwt
    case "starts_with":
      return validationMessages.string.starts_with
    case "ends_with":
      return validationMessages.string.ends_with
    case "includes":
      return validationMessages.string.includes
    case "regex":
      return validationMessages.string.regex
    default:
      return validationMessages.common.invalid
  }
}

function buildTooSmallMessage(issue: ZodIssue): string {
  if (issue.code !== "too_small") {
    return validationMessages.common.too_small
  }

  const minimum = toNumber(issue.minimum)

  switch (issue.origin) {
    case "string":
      return validationMessages.string.too_small(minimum)
    case "array":
    case "set":
      return validationMessages.array.too_small(minimum)
    case "number":
    case "int":
      return validationMessages.number.too_small(minimum, issue.inclusive ?? true)
    default:
      return validationMessages.common.too_small
  }
}

function buildTooBigMessage(issue: ZodIssue): string {
  if (issue.code !== "too_big") {
    return validationMessages.common.too_big
  }

  const maximum = toNumber(issue.maximum)

  switch (issue.origin) {
    case "string":
      return validationMessages.string.too_big(maximum)
    case "array":
    case "set":
      return validationMessages.array.too_big(maximum)
    case "number":
    case "int":
      return validationMessages.number.too_big(maximum, issue.inclusive ?? true)
    default:
      return validationMessages.common.too_big
  }
}

/**
 * Global Zod error map.
 * Translates standard Zod errors into English.
 */
export const zodEnErrorMap: NonNullable<z.core.$ZodConfig["customError"]> = (issue) => {
  switch (issue.code) {
    case "invalid_type":
      return buildRequiredTypeErrorMessage(issue)
    case "too_small":
      return buildTooSmallMessage(issue)
    case "too_big":
      return buildTooBigMessage(issue)
    case "invalid_format":
      return buildInvalidFormatMessage(issue)
    case "not_multiple_of":
      return validationMessages.number.multiple_of(issue.divisor)
    case "unrecognized_keys":
      return validationMessages.common.unrecognized_keys
    case "invalid_union":
      return validationMessages.union.invalid
    case "invalid_key":
      return validationMessages.map.invalid_key
    case "invalid_element":
      return validationMessages.map.invalid_element
    case "invalid_value":
      return validationMessages.enum.invalid
    case "custom":
      return validationMessages.common.custom
    default:
      return validationMessages.common.default
  }
}
