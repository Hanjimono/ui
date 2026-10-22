import { FieldValues, Path } from "react-hook-form"

/** Primary interface for a form element managed by the form system. */
export interface FormElement<FormValues extends FieldValues> {
  /** Form element name. */
  name: Path<FormValues>
  /** Called when the element value changes. */
  onChange?: (name: Path<FormValues>, value?: any) => void
  /** Called when the clear button is pressed. */
  onClear?: (name: Path<FormValues>) => void
}
