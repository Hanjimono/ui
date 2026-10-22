import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { z } from "zod"

import Form from "@/ui/Form/Form"
import FormSubmit from "@/ui/Form/FormSubmit"
import { Stack } from "@/ui/Layout/Responsive"
import Text from "@/ui/Presentation/Text"
import { createValidationSchema } from "@/ui/Form/Validation"
import Checkbox from "./index"

const meta: Meta<typeof Checkbox> = {
  title: "Ui/Form/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Checkbox for boolean values. Works with manual state (e.g. setState) or through the `Form` component."
      }
    }
  },
  decorators: [
    (Story) => (
      <div className="w-96 p-6">
        <Story />
      </div>
    )
  ],
  tags: ["autodocs"]
}

export default meta

type Story = StoryObj<typeof Checkbox>

export const BasicUsage: Story = {
  name: "External value",
  parameters: {
    docs: {
      description: {
        story:
          "Checkbox does not store its value. Pass `value` and `onChange`. Click the label or indicator to change the value."
      }
    }
  },
  render: () => {
    const [value, setValue] = React.useState(false)

    return (
      <Stack gap="sm">
        <Checkbox
          name="agree"
          label="I agree to the terms"
          value={value}
          onChange={(_name, next) => setValue(!!next)}
        />
        <Text size="s">value: {String(value)}</Text>
      </Stack>
    )
  }
}

export const States: Story = {
  name: "Error, disabled, and mixed state",
  parameters: {
    docs: {
      description: {
        story:
          "Checkbox supports normal use, error display, disabled, and a mixed state when not all list items are selected. Use the `indeterminate` prop for the mixed state."
      }
    }
  },
  render: () => {
    const [plain, setPlain] = React.useState(true)
    const [invalid, setInvalid] = React.useState(false)
    const [mixed, setMixed] = React.useState(false)
    const [isIndeterminate, setIsIndeterminate] = React.useState(true)

    return (
      <Stack gap="md">
        <Checkbox
          name="plain"
          label="Normal"
          value={plain}
          onChange={(_name, next) => setPlain(!!next)}
        />
        <Checkbox
          name="invalid"
          label="Consent required"
          value={invalid}
          error="Please confirm consent"
          onChange={(_name, next) => setInvalid(!!next)}
        />
        <Checkbox name="locked" label="Unavailable" value disabled />
        <Checkbox name="frozen" label="No mouse events" value isNoMouseEvent />
        <Checkbox
          name="mixed"
          label="Partially selected"
          value={mixed}
          indeterminate={isIndeterminate}
          onChange={(_name, next) => {
            setIsIndeterminate(false)
            setMixed(!!next)
          }}
        />
      </Stack>
    )
  }
}

export const LabelPosition: Story = {
  name: "Label side",
  parameters: {
    docs: {
      description: {
        story:
          "The `labelPosition` prop sets the label side. The label can sit before or after the indicator."
      }
    }
  },
  render: () => {
    const [after, setAfter] = React.useState(false)
    const [before, setBefore] = React.useState(true)

    return (
      <Stack gap="md">
        <Text size="s">labelPosition=&quot;end&quot;</Text>
        <Checkbox
          name="after"
          label="Label after indicator"
          labelPosition="end"
          value={after}
          onChange={(_name, next) => setAfter(!!next)}
        />
        <Text size="s">labelPosition=&quot;start&quot;</Text>
        <Checkbox
          name="before"
          label="Label before indicator"
          labelPosition="start"
          value={before}
          onChange={(_name, next) => setBefore(!!next)}
        />
      </Stack>
    )
  }
}

const agreeSchema = () =>
  createValidationSchema({
    agree: z.boolean().refine((checked) => checked, "Consent is required")
  })

export const InsideForm: Story = {
  name: "Inside Form",
  parameters: {
    docs: {
      description: {
        story:
          "Checkbox works inside `Form` like any other element. Pass a `name`. Plan the schema for boolean values only."
      }
    }
  },
  render: () => {
    const schema = agreeSchema()

    return (
      <Form
        gap="md"
        defaultValues={{ agree: false }}
        validationSchema={schema}
        onSubmit={(values) => {
          // eslint-disable-next-line no-alert
          alert(`agree: ${String(values.agree)}`)
        }}
      >
        <Checkbox name="agree" label="I agree to the terms" />
        <FormSubmit>Submit</FormSubmit>
      </Form>
    )
  }
}
