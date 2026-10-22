import { FieldErrors, FieldValues, Path, useController, useFormContext } from "react-hook-form"

import React, {
  Children,
  ComponentType,
  cloneElement,
  isValidElement,
  useMemo
} from "react"

import { useFormattedError, useFormattedValue } from "../Hooks"
import { FormElement } from "../types"
import {
  ControlledFormElementWrapperProps,
  FormElementLineProps,
  FormElementWrapperBaseProps,
  FormElementWrapperProps
} from "./types"
import { FormSubmitProps } from "../FormSubmit/types"
import { Inline } from "../../Layout/Responsive"

const FORM_ELEMENT = Symbol.for("ui.form.element")

const SUBMIT_BUTTON = Symbol.for("ui.form.submit")

const FORM_ELEMENT_WRAPPER = Symbol.for("ui.form.elementWrapper")

const FORM_NESTED_WRAPPER = Symbol.for("ui.form.nestedWrapper")

const FORM_ELEMENT_LINE = Symbol.for("ui.form.elementLine")

type FormElementComponentType = ComponentType<any> & {
  [FORM_ELEMENT]?: boolean
}

type SubmitButtonComponentType = ComponentType<any> & {
  [SUBMIT_BUTTON]?: boolean
}

type FormWrapperComponentType = ComponentType<any> & {
  [FORM_ELEMENT_WRAPPER]?: boolean
  [FORM_NESTED_WRAPPER]?: boolean
  [FORM_ELEMENT_LINE]?: boolean
}

/**
 * Normalizes form values before submit:
 * removes empty strings, `undefined`, and empty arrays.
 */
function normalizeFormValues<FormValues extends FieldValues>(
  data: FormValues
): Partial<FormValues> {
  return Object.entries(data).reduce((acc, [key, value]) => {
    if (value !== "" && value !== undefined && !(Array.isArray(value) && value.length === 0)) {
      acc[key as keyof FormValues] = value
    }

    return acc
  }, {} as Partial<FormValues>)
}

/**
 * Wrapper around form elements that adds:
 * - forwarding onChange/onClear into fields;
 * - management via react-hook-form;
 * - handling successful and failed form submit;
 * - support for nested wrappers.
 *
 * Usually used automatically inside the Form component.
 *
 * @template FormValues - Form values type.
 */
export function FormElementWrapper<FormValues extends FieldValues>({
  children,
  handleSubmit,
  onChange,
  onSubmit,
  onInvalidSubmit,
  control
}: FormElementWrapperProps<FormValues>) {
  // Goal: instead of the passed children list, insert our wrappers for each form element.
  // Submit handler: calls the provided onSubmit after normalizing data.
  const handleFormSubmit = (data: FormValues) => {
    if (onSubmit) {
      const formattedData = normalizeFormValues<FormValues>(data)
      onSubmit(formattedData as FormValues)
    }
  }

  // Invalid submit handler: calls the provided onInvalidSubmit.
  const handleInvalidSubmit = (errors: FieldErrors<FormValues>) => {
    if (onInvalidSubmit) {
      onInvalidSubmit(errors)
    }
  }

  // Render each child and wrap it in our wrappers.
  const childrenWithProps = Children.map(children, (child) => {
    // If the child is not an element, return it as-is.
    if (!isValidElement(child)) return child

    // If the child is a form element, wrap it so we can control its values.
    if (
      isValidElement<FormElement<FormValues>>(child) &&
      (child.type as FormElementComponentType)[FORM_ELEMENT]
    ) {
      const name = child.props.name
      if (!control) {
        return child
      }
      return (
        <ControlledFormElementWrapper<FormValues>
          key={name}
          name={name}
          control={control}
          onChange={onChange}
        >
          {child}
        </ControlledFormElementWrapper>
      )
    }

    // If the child is a submit button, pass it form submit props.
    if (
      isValidElement<FormSubmitProps>(child) &&
      (child.type as SubmitButtonComponentType)[SUBMIT_BUTTON] &&
      handleSubmit
    ) {
      return cloneElement(child, {
        onSubmit: handleSubmit(
          (data) => handleFormSubmit(data as FormValues),
          (errors) => handleInvalidSubmit(errors as FieldErrors<FormValues>)
        )
      })
    }
    // If the child is already a form element wrapper, pass helper form-control props.
    const wrapperType = child.type as FormWrapperComponentType
    if (
      isValidElement<FormElementWrapperProps<FormValues>>(child) &&
      (wrapperType[FORM_NESTED_WRAPPER] || wrapperType[FORM_ELEMENT_LINE])
    ) {
      return cloneElement(child, {
        handleSubmit,
        onChange,
        onSubmit,
        onInvalidSubmit,
        control
      })
    }

    return child
  })

  return <>{childrenWithProps}</>
}

/**
 * Form element wrapper that works via `useFormContext`.
 * Convenient for deeply nested scenarios without direct access to form methods.
 */
export function FormContextElementWrapper<FormValues extends FieldValues>({
  children,
  onChange,
  onSubmit,
  onInvalidSubmit
}: FormElementWrapperBaseProps<FormValues>) {
  const { handleSubmit, control } = useFormContext<FormValues>()

  return (
    <FormElementWrapper<FormValues>
      handleSubmit={handleSubmit}
      onChange={onChange}
      onSubmit={onSubmit}
      onInvalidSubmit={onInvalidSubmit}
      control={control}
    >
      {children}
    </FormElementWrapper>
  )
}

/**
 * Helper wrapper for nested FormElementWrappers.
 * Recursively finds FormElementWrapper in the tree and forwards form-control props.
 */
export function FormElementNestedWrapper<FormValues extends FieldValues>({
  children,
  ...rest
}: FormElementWrapperProps<FormValues>) {
  const childrenWithProps = useMemo(() => {
    const recursivelyCloneChildren = (nestedChildren: React.ReactNode): React.ReactNode => {
      return Children.map(nestedChildren, (child) => {
        if (isValidElement(child)) {
          if ((child.type as FormWrapperComponentType)[FORM_ELEMENT_WRAPPER]) {
            return cloneElement(child, {
              ...rest
            })
          }

          const element = child as React.ReactElement<any>

          if (element.props && element.props.children) {
            return cloneElement(element, {
              children: recursivelyCloneChildren(element.props.children)
            })
          }
        }
        return child
      })
    }

    return recursivelyCloneChildren(children)
  }, [children, rest])

  return <>{childrenWithProps}</>
}

/**
 * Wrapper for a row of form elements.
 * Renders FormElementWrapper inside a horizontal container.
 */
export function FormElementLine<FormValues extends FieldValues>({
  children,
  ...rest
}: FormElementLineProps<FormValues>) {
  return (
    <Inline {...rest}>
      <FormElementWrapper {...rest}>{children}</FormElementWrapper>
    </Inline>
  )
}

/**
 * Wrapper for a single form element integrated with `useController`.
 * Passes onChange and onClear into the child, plus value and error from form state.
 */
export function ControlledFormElementWrapper<FormValues extends FieldValues>({
  children,
  control,
  name,
  onChange
}: ControlledFormElementWrapperProps<FormValues>) {
  const { field, fieldState } = useController<FormValues>({
    name,
    control
  })

  const value = useFormattedValue(field)
  const error = useFormattedError(name, fieldState)

  const handleChange = (name: Path<FormValues>, value: any) => {
    field.onChange(value)
    onChange?.(name, value)
  }

  const handleClear = () => {
    handleChange(name, "")
  }

  const childrenWithProps: React.ReactNode = Children.map(children, (child): React.ReactNode => {
    if (isValidElement<FormElement<FormValues>>(child) && child.props.name) {
      return cloneElement(child as React.ReactElement<any>, {
        value,
        error,
        onChange: handleChange,
        onClear: handleClear
      })
    }
    return child
  })

  return <>{childrenWithProps}</>
}

;(FormElementWrapper as FormWrapperComponentType)[FORM_ELEMENT_WRAPPER] = true
;(FormElementNestedWrapper as FormWrapperComponentType)[FORM_NESTED_WRAPPER] = true
;(FormElementLine as FormWrapperComponentType)[FORM_ELEMENT_LINE] = true

export default FormElementWrapper
