/**
 * Creates a formatter that truncates a string to the given maximum length.
 *
 * @param length - Maximum string length.
 * @returns Function that accepts a string and returns it truncated to the given length.
 */
export const maxLength =
  (length: number) =>
  (value = "") => {
    const normalizedLength = Number.isFinite(length) ? Math.max(0, Math.trunc(length)) : 0
    return value.slice(0, normalizedLength)
  }

/**
 * Formatter that removes all non-digit characters from a string.
 *
 * @param value - Input string. Defaults to an empty string.
 * @returns String containing only digits.
 */
export const numbers = (value = "") => {
  return value.replace(/\D/g, "")
}

/**
 * Formats a string, keeping only digits, commas, spaces, and dots.
 * All commas are replaced with dots.
 *
 * @param value - Input string. Defaults to an empty string.
 * @returns Formatted string containing only allowed characters.
 */
export const numbersAndCommaAndDot = (value = "") => {
  return value.replace(/[^0-9\,\ \.]/g, "").replace(/,/g, ".")
}

const sanitizeDecimalInput = (value = "") => {
  const normalized = value
    .replace(/\s/g, "")
    .replace(/,/g, ".")
    .replace(/[^\d.]/g, "")
  const separatorIndex = normalized.indexOf(".")

  if (separatorIndex === -1) {
    return normalized
  }

  const integerPart = normalized.slice(0, separatorIndex)
  const fractionalPart = normalized.slice(separatorIndex + 1).replace(/\./g, "")

  return `${integerPart}.${fractionalPart}`
}

const decimalFormatter =
  (maxDecimalDigits: number) =>
  (value = "") => {
    const normalized = sanitizeDecimalInput(value)
    if (!normalized) {
      return ""
    }

    const separatorIndex = normalized.indexOf(".")
    if (separatorIndex === -1) {
      return normalized
    }

    const integerPart = normalized.slice(0, separatorIndex)
    const fractionalPart = normalized.slice(separatorIndex + 1)
    const safeIntegerPart = integerPart || "0"
    const limitedFractionalPart = fractionalPart.slice(0, maxDecimalDigits)

    return `${safeIntegerPart}.${limitedFractionalPart}`
  }

/**
 * Formats a string as a number with at most two decimal places.
 *
 * @param value - Input string. Defaults to an empty string.
 * @returns String with a number and at most two decimal places, or an empty string.
 */
export const twoDecimals = (value = "") => {
  return decimalFormatter(2)(value)
}

/**
 * Formats a string as a number with at most three decimal places.
 *
 * @param value - Input string. Defaults to an empty string.
 * @returns String with a number and at most three decimal places, or an empty string.
 */
export const threeDecimals = (value = "") => {
  return decimalFormatter(3)(value)
}

/**
 * Applies the given formatter to a value.
 *
 * @param formatterName - Formatter name.
 * @param value - Input value.
 * @returns Formatted value.
 */
export const inputFormat = (formatterName: Formatter, value: string) => {
  switch (formatterName) {
    case "numbers":
      return numbers(value)
    case "numbersAndCommaAndDot":
      return numbersAndCommaAndDot(value)
    case "twoDecimals":
      return twoDecimals(value)
    case "threeDecimals":
      return threeDecimals(value)
    default:
      if (formatterName.startsWith("maxLength:")) {
        const length = Number(formatterName.split(":")[1])
        if (!Number.isFinite(length)) {
          return value
        }
        return maxLength(length)(value)
      }
      return value
  }
}

/**
 * Max-length formatter name type.
 * String format is `maxLength:<number>`, where `<number>` is the maximum length.
 */
export type maxLengthFormatterName = `maxLength:${number}`

/**
 * Available input formatter names.
 */
export type Formatter =
  | maxLengthFormatterName
  | "numbers"
  | "numbersAndCommaAndDot"
  | "twoDecimals"
  | "threeDecimals"
