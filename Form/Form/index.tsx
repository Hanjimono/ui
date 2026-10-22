"use client"

import { Children, Fragment } from "react"
import { FieldValues, FormProvider, useForm, UseFormProps } from "react-hook-form"
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema"

import FormElementWrapper from "../FormElementWrapper"
import { setupValidation } from "../Validation"
import Responsive from "../../Layout/Responsive"

import { FormProps } from "./types"

setupValidation()

/**
 * Form component based on react-hook-form.
 * Can initialize `useForm` itself or use methods passed from outside.
 *
 * @template FormValues - Form values type.
 *
 * @param {React.ReactNode} children - Form elements, usually fields and buttons.
 * @param {string} className - Extra CSS classes for the `<form>` tag.
 * @param {(name: Path<FormValues>, value: any) => void} onChange - Callback when any form field changes.
 * @param {(values: Partial<FormValues>) => void} onSubmit - Successful form submit callback.
 * @param {(errors: FieldErrors<FormValues>) => void} onInvalidSubmit - Callback on validation errors.
 * @param {boolean} useContext - Whether to wrap content in `FormProvider` for context access.
 * @param {UseFormReturn<FormValues>} methods - External react-hook-form methods when the form is controlled from outside.
 * @param {DefaultValues<FormValues>} defaultValues - Default values when methods are not passed.
 * @param {zod.ZodType<FormValues>} validationSchema - Optional Zod schema for validation.
 * @param {DirectionMap} direction - Direction settings per breakpoint.
 * @param {string} baseFormClassName - Extra CSS classes for the `<form>` tag.
 *
 * @returns {JSX.Element} Form markup.
 */
function Form<FormValues extends FieldValues>({
  children,
  className,
  onChange,
  onSubmit,
  onInvalidSubmit,
  useContext,
  methods,
  defaultValues,
  validationSchema,
  direction,
  baseFormClassName,
  ...rest
}: FormProps<FormValues>) {
  const formOptions: UseFormProps<FormValues> = {
    mode: "onChange",
    defaultValues
  }

  if (validationSchema) {
    // Helper resolver is typed wider (FieldValues) than our generic FormValues.
    formOptions.resolver = standardSchemaResolver(validationSchema as any) as any
  }

  // If methods are not passed, initialize them ourselves.
  // Always call useForm to satisfy the rules of hooks.
  const defaultFormMethods = useForm<FormValues>(formOptions)
  const formMethods = methods ?? defaultFormMethods

  const { handleSubmit, control } = formMethods

  // Wrap each child in a form element wrapper.
  // This automatically picks up all form elements and manages them via react-hook-form.
  const childrenWithWrapper = Children.map(Children.toArray(children), (child) => {
    return (
      <FormElementWrapper
        handleSubmit={handleSubmit}
        onChange={onChange}
        onSubmit={onSubmit}
        onInvalidSubmit={onInvalidSubmit}
        control={control}
      >
        {child}
      </FormElementWrapper>
    )
  })

  // Wrap the form in a form context provider when needed.
  // This allows using the form in deeply nested components.
  const WrapperComponent = useContext ? FormProvider : Fragment
  const wrapperProps = useContext ? (formMethods as any) : {}
  const responsiveDirection = direction ?? { base: "column" }
  return (
    <WrapperComponent<FormValues> {...wrapperProps}>
      <form
        onSubmit={(e) => {
          e.preventDefault()
        }}
        className={baseFormClassName}
      >
        <Responsive className={className} direction={responsiveDirection} {...rest}>
          {childrenWithWrapper}
        </Responsive>
      </form>
    </WrapperComponent>
  )
}

export default Form
