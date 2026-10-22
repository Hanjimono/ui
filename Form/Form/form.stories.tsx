import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import Form from "./index"
import FormSubmit from "@/ui/Form/FormSubmit"
import Input from "@/ui/Form/Input"
import { createValidationSchema, validationPrimitives, validationRules } from "@/ui/Form/Validation"
import {
  FormContextElementWrapper,
  FormElementLine,
  FormElementNestedWrapper,
  FormElementWrapper
} from "@/ui/Form/FormElementWrapper"

const meta: Meta<typeof Form> = {
  title: "Ui/Form/Form",
  component: Form,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Form component that covers basic form management without extra wiring."
      }
    }
  },
  decorators: [
    (Story) => (
      <div className="w-[40rem] p-6">
        <Story />
      </div>
    )
  ],
  tags: ["autodocs"]
}

export default meta

type Story = StoryObj<typeof Form>

const emptyToUndefined = (value: unknown) => (value === "" ? undefined : value)

const age18Plus = () =>
  z
    .string()
    .min(1, "Age is required")
    .regex(/^\d+$/, "Age must contain only digits")
    .refine((value) => Number(value) >= 18, "18+ only")

const promoCode = () =>
  z.preprocess(
    emptyToUndefined,
    z
      .string()
      .regex(/^[A-Z0-9]{6}$/, "Code must be 6 characters A-Z or 0-9")
      .optional()
  )

const formDemoSchema = () =>
  createValidationSchema({
    requiredEmail: validationPrimitives.email(),
    age: age18Plus(),
    promoCode: promoCode()
  })

const corporateEmail = () =>
  validationPrimitives
    .email()
    .refine((value) => value.endsWith("@example.com"), "Corporate email only")

const employeeSchema = () =>
  createValidationSchema({
    email: corporateEmail(),
    password: validationRules.strongPassword(10)
  })

export const BasicForm: Story = {
  name: "Basic form",
  parameters: {
    docs: {
      description: {
        story:
          "Built on `react-hook-form`. Children are wrapped in `FormElementWrapper` to wire values, clear, submit, and optional context. Put form elements inside Form and the plumbing runs automatically. The form uses the Responsive layout component."
      }
    }
  },
  render: () => {
    return (
      <Form
        gap="md"
        onSubmit={(values) => {
          // eslint-disable-next-line no-alert
          alert(`Submitted:\n${JSON.stringify(values, null, 2)}`)
        }}
      >
        <Input label="Email" name="email" placeholder="name@example.com" isClearable />
        <FormSubmit>Submit</FormSubmit>
      </Form>
    )
  }
}

export const SubmitButtonDemo: Story = {
  name: "Submit button demo",
  parameters: {
    docs: {
      description: {
        story:
          "Forms submit via `FormSubmit`. Clicking it calls the `onSubmit` passed to Form."
      }
    }
  },
  render: () => {
    return (
      <Form
        gap="md"
        onSubmit={(values) => {
          // eslint-disable-next-line no-alert
          alert(`firstName: ${values.firstName || ""}\nlastName: ${values.lastName || ""}`)
        }}
      >
        <Input label="First name" name="firstName" placeholder="John" isClearable />
        <Input label="Last name" name="lastName" placeholder="Doe" isClearable />
        <FormSubmit>Show values</FormSubmit>
      </Form>
    )
  }
}

export const ValidationDemo: Story = {
  name: "Validation",
  parameters: {
    docs: {
      description: {
        story:
          "Automatic Zod validation via `validationSchema`. On FormSubmit, rules are checked and errors are passed into the matching fields."
      }
    }
  },
  render: () => {
    const schema = formDemoSchema()

    return (
      <Form
        gap="md"
        validationSchema={schema}
        onSubmit={(values) => {
          // eslint-disable-next-line no-alert
          alert(`Validation passed:\n${JSON.stringify(values, null, 2)}`)
        }}
      >
        <Input
          label="Email (required)"
          name="requiredEmail"
          placeholder="name@example.com"
          isClearable
        />
        <Input label="Age (18+)" name="age" placeholder="18" formatter="numbers" isClearable />
        <Input label="Promo code (optional)" name="promoCode" placeholder="ABC123" isClearable />
        <FormSubmit>Validate and submit</FormSubmit>
      </Form>
    )
  }
}

export const ValidationInvalidSubmitDemo: Story = {
  name: "Validation with invalid-submit handler",
  parameters: {
    docs: {
      description: {
        story:
          "Use `onInvalidSubmit` for extra logic when submit fails validation — e.g. a louder message, or when part of the form cannot show field errors."
      }
    }
  },
  render: () => {
    const schema = formDemoSchema()

    return (
      <Form
        gap="md"
        validationSchema={schema}
        onSubmit={(values) => {
          // eslint-disable-next-line no-alert
          alert(`Validation passed:\n${JSON.stringify(values, null, 2)}`)
        }}
        onInvalidSubmit={(errors) => {
          // eslint-disable-next-line no-alert
          alert(`Validation errors — check the fields:\n${JSON.stringify(errors, null, 2)}`)
        }}
      >
        <Input
          label="Email (required)"
          name="requiredEmail"
          placeholder="name@example.com"
          isClearable
        />
        <Input label="Age (18+)" name="age" placeholder="18" formatter="numbers" isClearable />
        <Input label="Promo code (optional)" name="promoCode" placeholder="ABC123" isClearable />
        <FormSubmit>Validate and submit</FormSubmit>
      </Form>
    )
  }
}

export const ValidationExtensibleDemo: Story = {
  name: "Extensible validation (project rules)",
  parameters: {
    docs: {
      description: {
        story:
          "UI-Kit rules can be extended with project rules: attach your own rules as a separate object and build the schema like a regular `z.object`."
      }
    }
  },
  render: () => {
    return (
      <Form
        gap="md"
        validationSchema={employeeSchema()}
        onSubmit={(values) => {
          // eslint-disable-next-line no-alert
          alert(`Extended validation passed:\n${JSON.stringify(values, null, 2)}`)
        }}
      >
        <Input
          label="Corporate email"
          name="email"
          placeholder="user@example.com"
          isClearable
        />
        <Input label="Password" name="password" placeholder="At least 10 characters" isClearable />
        <FormSubmit>Validate</FormSubmit>
      </Form>
    )
  }
}

export const FormElementLineDemo: Story = {
  name: "Two fields in one row (FormElementLine)",
  parameters: {
    docs: {
      description: {
        story:
          "`FormElementLine` places two fields in one row without extra wiring."
      }
    }
  },
  render: () => {
    return (
      <Form
        gap="md"
        onSubmit={(values) => {
          // eslint-disable-next-line no-alert
          alert(`Address:\n${JSON.stringify(values, null, 2)}`)
        }}
      >
        <FormElementLine direction={{ base: "row" }} gap="md">
          <Input label="City" name="city" placeholder="Moscow" isClearable />
          <Input label="Street" name="street" placeholder="Main St" isClearable />
        </FormElementLine>
        <FormSubmit>Submit</FormSubmit>
      </Form>
    )
  }
}

export const NestedWrapperDemo: Story = {
  name: "Wrappers and containers",
  parameters: {
    docs: {
      description: {
        story:
          "For more complex layouts with extra containers (e.g. captions), use `FormElementNestedWrapper`. It recursively finds `FormElementWrapper` and forwards form methods."
      }
    }
  },
  render: () => {
    return (
      <Form
        gap="md"
        onSubmit={(values) => {
          // eslint-disable-next-line no-alert
          alert(`Search: ${values.search || ""}`)
        }}
      >
        <FormElementNestedWrapper>
          <div className="p-4 border border-solid border-[#e6e6e6] rounded-xl">
            <div className="mb-3 font-semibold">Small container</div>
            <div className="mb-3 text-[#555]">
              Text/hints can be anything — the form still reaches the wrappers.
            </div>
            <FormElementWrapper>
              <Input label="Query" name="search" placeholder="e.g. laptop" isClearable />
            </FormElementWrapper>
          </div>
        </FormElementNestedWrapper>
        <FormSubmit>Search</FormSubmit>
      </Form>
    )
  }
}

type DeepValues = {
  query: string
}

function DeepNestedComponent() {
  return (
    <div className="p-4 border border-dashed border-[#d0d0d0] rounded-xl">
      <div className="mb-3 font-semibold">Deep nested component</div>
      <FormContextElementWrapper<DeepValues>>
        <Input
          label="Query"
          name="query"
          placeholder="Form access via context"
          isClearable
        />
      </FormContextElementWrapper>
    </div>
  )
}

export const DeepNestedWithContext: Story = {
  name: "Deep nested with context",
  parameters: {
    docs: {
      description: {
        story:
          "For large forms split into separate components, pass `useContext: true` and wrap fields in `FormContextElementWrapper` to reach form methods from context."
      }
    }
  },
  render: () => {
    return (
      <Form<DeepValues>
        gap="md"
        useContext
        onSubmit={(values) => {
          // eslint-disable-next-line no-alert
          alert(`query: ${values.query || ""}`)
        }}
      >
        <DeepNestedComponent />
        <FormSubmit>Submit</FormSubmit>
      </Form>
    )
  }
}

export const ExternalMethodsDemo: Story = {
  name: "External methods (useForm outside)",
  parameters: {
    docs: {
      description: {
        story:
          "For finer control (watch, reset, custom effects), create `methods = useForm(...)` in the parent and pass them to `Form`. Wrappers keep working the same way."
      }
    }
  },
  render: () => {
    const methods = useForm({
      mode: "onChange",
      defaultValues: { email: "", note: "" }
    })

    const values = methods.watch()

    return (
      <div className="grid gap-4">
        <Form
          gap="md"
          methods={methods}
          onSubmit={(submitted) => {
            // eslint-disable-next-line no-alert
            alert(`Submitted:\n${JSON.stringify(submitted, null, 2)}`)
          }}
        >
          <Input label="Email" name="email" placeholder="name@example.com" isClearable />
          <Input label="Note" name="note" placeholder="Any text" isClearable />
          <FormSubmit>Submit</FormSubmit>
        </Form>

        <div className="text-xs text-[#555]">
          <div className="font-semibold mb-1.5">Current values (watch)</div>
          <pre className="m-0 whitespace-pre-wrap">{JSON.stringify(values, null, 2)}</pre>
        </div>
      </div>
    )
  }
}
