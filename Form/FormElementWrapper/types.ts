import type { ResponsiveSettingsDirectionsProps } from "../../Layout/Responsive/types"
import type {
  Control,
  FieldErrors,
  FieldValues,
  Path,
  UseFormHandleSubmit
} from "react-hook-form"
import type React from "react"

/** Base props for various form element wrappers. */
export interface FormElementWrapperBaseProps<FormValues extends FieldValues> {
  /** Child elements. */
  children?: React.ReactNode
  /** Callback when a field value changes. */
  onChange?: (name: Path<FormValues>, value: any) => void
  /** Callback on successful form submit. */
  onSubmit?: (data: FormValues) => void
  /** Callback on failed submit due to validation errors. */
  onInvalidSubmit?: (errors: FieldErrors<FormValues>) => void
}

/**
 * Form element wrapper that adds react-hook-form management.
 */
export interface FormElementWrapperProps<FormValues extends FieldValues>
  extends FormElementWrapperBaseProps<FormValues> {
  /** react-hook-form submit handler. */
  handleSubmit?: UseFormHandleSubmit<FormValues>
  /** `control` object from react-hook-form. */
  control?: Control<FormValues>
}

/** Props for the form element row component. */
export interface FormElementLineProps<FormValues extends FieldValues>
  extends FormElementWrapperProps<FormValues>,
    Omit<ResponsiveSettingsDirectionsProps, "children"> {}

/**
 * Wrapper for a single form element integrated with `useController`.
 */
export interface ControlledFormElementWrapperProps<FormValues extends FieldValues> {
  /** Form field name. */
  name: Path<FormValues>
  /** Child elements. */
  children?: React.ReactNode
  /** `control` object from react-hook-form. */
  control?: Control<FormValues>
  /** Callback when a field value changes. */
  onChange?: (name: Path<FormValues>, value: any) => void
}
