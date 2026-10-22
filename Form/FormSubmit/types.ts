import type React from "react"
import type { ButtonProps } from "../../Action/Button/types"

/** Specialized button for form submit. */
export interface FormSubmitProps extends ButtonProps {
  /**
   * Form submit handler.
   * Usually passed from FormElementWrapper and wrapped in react-hook-form `handleSubmit`.
   */
  onSubmit?: (e: React.BaseSyntheticEvent) => void
}
