import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { z } from "zod"

import Form from "@/ui/Form/Form"
import FormSubmit from "@/ui/Form/FormSubmit"
import { Stack } from "@/ui/Layout/Responsive"
import Text from "@/ui/Presentation/Text"
import { createValidationSchema } from "@/ui/Form/Validation"
import RadioGroup from "./index"

const deliveryOptions = [
  { option: "courier", label: "Courier" },
  { option: "pickup", label: "Pickup" },
  { option: "post", label: "Mail", disabled: true }
]

const meta: Meta<typeof RadioGroup> = {
  title: "Ui/Form/RadioGroup",
  component: RadioGroup,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Simplest way to use Radio in a form. Pass an options array and get a radio list as a row or column."
      }
    }
  },
  decorators: [
    (Story) => (
      <div className="w-[28rem] p-6">
        <Story />
      </div>
    )
  ],
  tags: ["autodocs"]
}

export default meta

type Story = StoryObj<typeof RadioGroup>

export const BasicUsage: Story = {
  name: "Options array",
  parameters: {
    docs: {
      description: {
        story:
          "Pass `options`, `name`, `value`, and `onChange`. Default direction comes from config."
      }
    }
  },
  render: () => {
    const [value, setValue] = React.useState("courier")

    return (
      <Stack gap="sm">
        <RadioGroup
          name="delivery"
          label="Delivery"
          options={deliveryOptions}
          value={value}
          onChange={(_name, next) => setValue(next || "")}
        />
        <Text size="s">value: {value}</Text>
      </Stack>
    )
  }
}

export const Direction: Story = {
  name: "List direction",
  parameters: {
    docs: {
      description: {
        story: "The `direction` prop sets how radios are laid out."
      }
    }
  },
  render: () => {
    const [columnValue, setColumnValue] = React.useState("courier")
    const [rowValue, setRowValue] = React.useState("pickup")
    const options = [
      { option: "courier", label: "Courier" },
      { option: "pickup", label: "Pickup" }
    ]

    return (
      <Stack gap="lg">
        <Stack gap="sm">
          <Text size="s">direction=&quot;column&quot;</Text>
          <RadioGroup
            name="column-delivery"
            direction="column"
            options={options}
            value={columnValue}
            onChange={(_name, next) => setColumnValue(next || "")}
          />
          <Text size="s">value: {columnValue}</Text>
        </Stack>
        <Stack gap="sm">
          <Text size="s">direction=&quot;row&quot;</Text>
          <RadioGroup
            name="row-delivery"
            direction="row"
            options={options}
            value={rowValue}
            onChange={(_name, next) => setRowValue(next || "")}
          />
          <Text size="s">value: {rowValue}</Text>
        </Stack>
      </Stack>
    )
  }
}

const contactSchema = () =>
  createValidationSchema({
    contact: z.string().min(1, "Select a contact method")
  })

export const InsideForm: Story = {
  name: "Inside Form",
  parameters: {
    docs: {
      description: {
        story: "`RadioGroup`, like plain `Radio`, can be used inside `Form`."
      }
    }
  },
  render: () => {
    const schema = contactSchema()

    return (
      <Form
        gap="md"
        defaultValues={{ contact: "email" }}
        validationSchema={schema}
        onSubmit={(values) => {
          // eslint-disable-next-line no-alert
          alert(`contact: ${values.contact || ""}`)
        }}
      >
        <RadioGroup
          name="contact"
          label="Contact"
          direction="row"
          options={[
            { option: "email", label: "Email" },
            { option: "phone", label: "Phone" }
          ]}
        />
        <FormSubmit>Submit</FormSubmit>
      </Form>
    )
  }
}
