export const validationMessages = {
  common: {
    required: "This field is required",
    invalid: "Invalid value",
    too_small: "Value is too small",
    too_big: "Value is too large",
    not_multiple_of: "Value must be a multiple of the specified number",
    invalid_literal: "Invalid literal value",
    custom: "Invalid value",
    default: "Invalid value",
    unrecognized_keys: "Unrecognized fields detected",
    invalid_type: (type: string) => `Value must be ${type}`
  },
  type: {
    string: "a string",
    number: "a number",
    int: "an integer",
    boolean: "a boolean",
    bigint: "a bigint",
    symbol: "a symbol",
    undefined: "undefined",
    null: "null",
    never: "never",
    void: "void",
    date: "a date",
    array: "an array",
    object: "an object",
    tuple: "a tuple",
    record: "a record",
    map: "a map",
    set: "a set",
    file: "a file",
    nonoptional: "a non-empty value",
    nan: "a number",
    function: "a function"
  },
  string: {
    invalid_type: "Value must be a string",
    too_small: (min: number) => `Minimum length is ${min} characters`,
    too_big: (max: number) => `Maximum length is ${max} characters`,
    nonempty: "Field must not be empty",
    invalid_enum_value: "Value must be one of the allowed options",
    regex: "Value does not match the required format",
    email: "Enter a valid email",
    url: "Enter a valid URL",
    uuid: "Enter a valid UUID",
    cuid: "Enter a valid CUID",
    datetime: "Enter a valid date and time",
    emoji: "Value must be an emoji",
    ip: "Enter a valid IP address",
    jwt: "Enter a valid JWT",
    includes: "Value does not contain the required substring",
    starts_with: "Value must start with the specified substring",
    ends_with: "Value must end with the specified substring"
  },
  number: {
    invalid_type: "Value must be a number",
    not_finite: "Value must be a finite number",
    too_small: (min: number, inclusive: boolean) =>
      inclusive
        ? `Value must be greater than or equal to ${min}`
        : `Value must be strictly greater than ${min}`,
    too_big: (max: number, inclusive: boolean) =>
      inclusive
        ? `Value must be less than or equal to ${max}`
        : `Value must be strictly less than ${max}`,
    integer: "Value must be an integer",
    multiple_of: (multipleOf: number) => `Value must be a multiple of ${multipleOf}`
  },
  boolean: {
    invalid_type: "Value must be a boolean"
  },
  date: {
    invalid_type: "Value must be a date",
    invalid: "Enter a valid date"
  },
  array: {
    invalid_type: "Value must be an array",
    too_small: (min: number) =>
      min === 1 ? "Select at least one value" : `Minimum number of items is ${min}`,
    too_big: (max: number) => `Maximum number of items is ${max}`
  },
  object: {
    invalid_type: "Value must be an object",
    missing: "Required fields are missing"
  },
  union: {
    invalid: "Value does not match any of the allowed options"
  },
  map: {
    invalid_key: "Invalid key",
    invalid_element: "Invalid collection element"
  },
  literal: {
    invalid: "Value does not match the allowed literal"
  },
  enum: {
    invalid: "Value must be one of the allowed options"
  },
  email: {
    required: "Enter an email",
    invalid: "Enter a valid email"
  },
  password: {
    required: "Enter a password",
    too_short: (min: number) => `Minimum password length is ${min} characters`,
    must_contain_uppercase: "Password must contain at least one uppercase letter",
    must_contain_lowercase: "Password must contain at least one lowercase letter",
    must_contain_number: "Password must contain at least one digit",
    must_contain_special: "Password must contain at least one special character"
  },
  phone: {
    invalid: "Enter a valid phone number"
  }
} as const

export type ValidationMessages = typeof validationMessages
