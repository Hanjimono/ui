import { useMemo } from "react"
import { ControllerFieldState, ControllerRenderProps, FieldValues, Path } from "react-hook-form"

/**
 * Hook that returns a formatted value from a field or a provided value.
 *
 * @template FormValues - Form values type.
 * @param {ControllerRenderProps<FormValues>} [field] - RHF field to read the value from.
 * @param {string | number | string[] | number[] | boolean} [value] - Value to format.
 * @returns {string | number | string[] | number[] | boolean} - Formatted value.
 */
export function useFormattedValue<FormValues extends FieldValues>(
  field?: ControllerRenderProps<FormValues>,
  value?: string | number | string[] | number[] | boolean
) {
  return useMemo(() => {
    return value !== undefined ? value : field && field.value
  }, [value, field])
}

/**
 * Hook that returns a formatted error message from a field or a provided message.
 *
 * @template FormValues - Form values type.
 * @param {Path<FormValues>} name - Form field name.
 * @param {ControllerFieldState} [fieldState] - RHF field state, including errors.
 * @param {string} [error] - Optional error message that overrides form error state.
 * @returns {string | undefined} - Formatted error message, or undefined if none.
 */
export function useFormattedError<FormValues extends FieldValues>(
  name: Path<FormValues>,
  fieldState?: ControllerFieldState,
  error?: string
) {
  return useMemo(() => {
    return error || fieldState?.error?.message?.toString()
  }, [error, fieldState, name])
}
