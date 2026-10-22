import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import Field from "./index"

const meta: Meta<typeof Field> = {
  title: "Ui/Form/Field",
  component: Field,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Form field wrapper that can show a label and an error message. Most form elements wrap into this helper by default. Usually not used manually outside the UI kit."
      }
    }
  },
  decorators: [
    (Story) => (
      <div>
        <Story />
      </div>
    )
  ],
  argTypes: {
    label: { control: "text" },
    error: { control: "text" },
    className: { control: "text" },
    isLabelSpaceReserved: {
      control: "boolean"
    },
    inputId: { control: "text" },
    isRequired: {
      control: "boolean"
    },
    children: { control: "text" }
  },
  tags: ["autodocs"]
}

export default meta

type Story = StoryObj<typeof Field>

const ExampleInput = ({ name }: { name: string }) => {
  return (
    <input
      className="w-full border border-solid border-form-border p-2 box-border"
      name={name}
      aria-label="input"
    />
  )
}

export const Default: Story = {
  args: {
    label: "Basic field"
  },
  name: "Basic field",
  parameters: {
    docs: {
      description: {
        story: "Field that form components wrap into by default."
      }
    }
  },
  render: (args) => (
    <Field inputId="input1" {...args}>
      <ExampleInput name="input1" />
    </Field>
  )
}

export const WithError: Story = {
  args: {
    label: "Field with error",
    error: "This field is required."
  },
  name: "Field with error",
  parameters: {
    docs: {
      description: {
        story:
          "When an error is present, it is shown under the field and truncated to one line. The error is absolutely positioned, so leave space for it in the layout."
      }
    }
  },
  render: (args) => (
    <Field inputId="input2" {...args}>
      <ExampleInput name="input2" />
    </Field>
  )
}

export const TruncatedLabel: Story = {
  name: "Truncated label",
  parameters: {
    docs: {
      description: {
        story:
          "If the label or error is too long, it is truncated so it does not overflow the container."
      }
    }
  },
  render: () => (
    <div className="flex gap-2.5 items-center w-full">
      <Field
        label="A very long label that does not fit on one line."
        isLabelSpaceReserved={false}
        inputId="input3"
      >
        <ExampleInput name="input3" />
      </Field>
      <Field
        inputId="input4"
        label="Field with a long error"
        error="A very long error message that does not fit on one line."
      >
        <ExampleInput name="input4" />
      </Field>
    </div>
  )
}

export const ReserveLabelSpace: Story = {
  args: {
    isLabelSpaceReserved: true
  },
  name: "Reserved label space",
  parameters: {
    docs: {
      description: {
        story:
          "Sometimes not every field needs a label. To keep grid alignment, use the prop that reserves label space. All form elements that use Field support this."
      }
    }
  },
  render: (args) => (
    <div className="flex gap-2.5 items-center">
      <Field label="Field with label" isLabelSpaceReserved={false} inputId="input3">
        <ExampleInput name="input3" />
      </Field>
      <Field inputId="input4" {...args}>
        <ExampleInput name="input4" />
      </Field>
    </div>
  )
}
