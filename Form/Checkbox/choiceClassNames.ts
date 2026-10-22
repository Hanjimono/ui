export const choiceControlClassName =
  "relative inline-flex items-center gap-form-choice-label-gap max-w-full cursor-pointer text-form-text font-form-element font-weight-form-element text-form"

export const choiceLabelStartClassName = "flex-row-reverse"

export const choiceDisabledClassName = "text-form-placeholder opacity-80"

export const choiceNoMouseEventClassName = "pointer-events-none"

export const choiceErroredIndicatorClassName = "[&_.form-choice-indicator]:border-form-border-errored"

export const choiceCheckedClassName =
  "[&_.form-choice-indicator]:bg-form-choice-bg-checked [&_.form-choice-indicator]:border-form-choice-border-checked [&_.form-choice-indicator-check::after]:opacity-100 [&_.form-choice-indicator-disc::after]:opacity-100 [&_.form-choice-input:disabled+.form-choice-indicator]:bg-form-choice-bg-checked [&_.form-choice-input:disabled+.form-choice-indicator]:border-form-choice-border-checked"

export const choiceInputClassName =
  "absolute z-[1] inset-0 w-full h-full m-0 p-0 opacity-0 cursor-pointer disabled:cursor-default focus-visible:outline-none [&:focus-visible+.form-choice-indicator]:outline [&:focus-visible+.form-choice-indicator]:outline-[0.125rem] [&:focus-visible+.form-choice-indicator]:outline-form-border-focused [&:focus-visible+.form-choice-indicator]:outline-offset-[0.125rem] [&:disabled+.form-choice-indicator]:bg-form-bg-disabled [&:disabled+.form-choice-indicator]:border-form-border"

export const choiceIndicatorClassName =
  "form-choice-indicator relative inline-block flex-none box-border size-form-choice-size overflow-hidden text-[length:var(--spacing-form-choice-size)] leading-[0] border-form border-solid border-form-border bg-form-choice-bg after:content-[''] after:absolute after:top-1/2 after:left-1/2 after:block after:leading-[0] after:opacity-0 after:-translate-x-1/2 after:-translate-y-1/2"

export const choiceIndicatorCheckClassName =
  "form-choice-indicator-check rounded-form-choice after:w-[0.24em] after:h-[0.44em] after:border-solid after:border-form-choice-mark after:border-t-0 after:border-l-0 after:border-r-[0.1em] after:border-b-[0.1em] after:[transform:translate(-50%,-50%)_rotate(45deg)_translate(-0.04em,-0.04em)]"

export const choiceIndicatorIndeterminateClassName =
  "bg-form-choice-bg-checked border-form-choice-border-checked after:w-[0.5em] after:h-[0.1em] after:border-0 after:bg-form-choice-mark after:[transform:translate(-50%,-50%)] after:opacity-100"

export const choiceIndicatorDiscClassName =
  "form-choice-indicator-disc rounded-full after:size-[0.6em] after:rounded-full after:bg-form-choice-mark"

export const choiceCaptionClassName = "min-w-0"
