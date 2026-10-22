import Button from "../../Action/Button"

import { FormSubmitProps } from "./types"

/** Symbol identifying the component as a form submit button. */
const SUBMIT_BUTTON = Symbol.for("ui.form.submit")

/**
 * FormSubmit renders a button that invokes the provided onSubmit handler.
 *
 * @param {Function} onSubmit - Function called on button click.
 * @param {React.ReactNode} children - Button content.
 * @param {Object} rest - Extra props forwarded to Button.
 *
 * @returns {JSX.Element} Form submit button markup.
 */
function FormSubmit({ onSubmit, children, ...rest }: FormSubmitProps) {
  return (
    <Button onClick={onSubmit} {...rest}>
      {children}
    </Button>
  )
}

// Mark the component as a form submit button.
;(FormSubmit as unknown as Record<symbol, boolean>)[SUBMIT_BUTTON] = true

export default FormSubmit
