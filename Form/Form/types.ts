import type { DirectionMap, ResponsiveSettingsDirectionsProps } from "../../Layout/Responsive/types"
import type { DefaultValues, FieldErrors, FieldValues, Path, UseFormReturn } from "react-hook-form"
import type * as zod from "zod"
import type React from "react"

/**
 * Base form component.
 * Responsible for initializing and managing form state via react-hook-form.
 * Can work with its own `useForm` init or with methods passed from outside.
 */
export interface FormProps<FormValues extends FieldValues>
  extends Omit<ResponsiveSettingsDirectionsProps, "children" | "direction"> {
  /** Default values for form fields. */
  defaultValues?: DefaultValues<FormValues>
  /** Direction settings per breakpoint */
  direction?: DirectionMap
  /**
   * External react-hook-form instance.
   * When passed, the component will not call `useForm` on its own for control —
   * though `useForm` is still invoked to satisfy the rules of hooks.
   */
  methods?: UseFormReturn<FormValues>
  /** Child elements, usually form fields and controls. */
  children: React.ReactNode
  /** Extra CSS classes for the `<form>` tag. */
  className?: string
  /** Extra CSS classes for the `<form>` tag. */
  baseFormClassName?: string
  /** Handler for any form field change. */
  onChange?: (name: Path<FormValues>, value: any) => void
  /**
   * Successful form submit handler.
   * Empty strings, `undefined`, and empty arrays are already cleaned from the values object.
   */
  onSubmit?: (values: Partial<FormValues>) => void
  /** Failed submit handler on validation errors. */
  onInvalidSubmit?: (errors: FieldErrors<FormValues>) => void
  /**
   * When `true`, wraps the form in `FormProvider`
   * so nested components can use `useFormContext`.
   */
  useContext?: boolean
  /**
   * Optional Zod validation schema.
   * When passed, used via `standardSchemaResolver`.
   */
  validationSchema?: zod.ZodType<FormValues>
}
