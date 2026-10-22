import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { z } from "zod"

import Form from "@/ui/Form/Form"
import FormSubmit from "@/ui/Form/FormSubmit"
import { Inline, Stack } from "@/ui/Layout/Responsive"
import Text from "@/ui/Presentation/Text"
import { createValidationSchema } from "@/ui/Form/Validation"
import Radio from "./index"

const meta: Meta<typeof Radio> = {
  title: "Ui/Form/Radio",
  component: Radio,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Radio element. Option value is the `option` prop; current field value is `value`. Inside forms `RadioGroup` is usually preferred, but a standalone radio is useful in some cases. It works via value/onChange and is fully integrated with Form."
      }
    }
  },
  decorators: [
    (Story) => (
      <div className="w-[32rem] p-6">
        <Story />
      </div>
    )
  ],
  tags: ["autodocs"]
}

export default meta

type Story = StoryObj<typeof Radio>

export const BasicUsage: Story = {
  name: "External value",
  parameters: {
    docs: {
      description: {
        story: "Simplest toggle via setState."
      }
    }
  },
  render: () => {
    const [value, setValue] = React.useState("courier")

    return (
      <Stack gap="sm">
        <Radio
          name="delivery"
          option="courier"
          label="Courier"
          value={value}
          onChange={(_name, next) => setValue(next || "")}
        />
        <Radio
          name="delivery"
          option="pickup"
          label="Pickup"
          value={value}
          onChange={(_name, next) => setValue(next || "")}
        />
        <Text size="s">value: {value}</Text>
      </Stack>
    )
  }
}

export const Layouts: Story = {
  name: "Custom layout",
  parameters: {
    docs: {
      description: {
        story:
          "The component is not wrapped in a container, so it can sit in any layout — simple vertical/horizontal lists or more complex constructions with separate containers."
      }
    }
  },
  render: () => {
    const [columnValue, setColumnValue] = React.useState("a")
    const [rowValue, setRowValue] = React.useState("left")
    const [splitValue, setSplitValue] = React.useState("first")

    return (
      <div className="flex flex-col gap-6">
        <Stack gap="sm">
          <Text size="s">Column</Text>
          <Radio
            name="column"
            option="a"
            label="First"
            value={columnValue}
            onChange={(_name, next) => setColumnValue(next || "")}
          />
          <Radio
            name="column"
            option="b"
            label="Second"
            value={columnValue}
            onChange={(_name, next) => setColumnValue(next || "")}
          />
        </Stack>
        <Stack gap="sm">
          <Text size="s">Row</Text>
          <Inline gap="md">
            <Radio
              name="row"
              option="left"
              label="Left"
              value={rowValue}
              onChange={(_name, next) => setRowValue(next || "")}
            />
            <Radio
              name="row"
              option="right"
              label="Right"
              value={rowValue}
              onChange={(_name, next) => setRowValue(next || "")}
            />
          </Inline>
        </Stack>
        <Stack gap="sm">
          <Text size="s">Separate containers</Text>
          <div className="flex gap-4">
            <div className="flex-auto p-4 border border-solid border-form-border rounded-form">
              <Radio
                name="split"
                option="first"
                label="In the first block"
                value={splitValue}
                onChange={(_name, next) => setSplitValue(next || "")}
              />
            </div>
            <div className="flex-auto p-4 border border-solid border-form-border rounded-form">
              <Radio
                name="split"
                option="second"
                label="In the second block"
                value={splitValue}
                onChange={(_name, next) => setSplitValue(next || "")}
              />
            </div>
          </div>
        </Stack>
      </div>
    )
  }
}

export const States: Story = {
  name: "Error and disabled",
  parameters: {
    docs: {
      description: {
        story: "Supports standard error and disabled states."
      }
    }
  },
  render: () => {
    const [value, setValue] = React.useState("")

    let cardError: string | undefined
    if (!value) {
      cardError = "Select a payment method"
    }

    return (
      <Stack gap="sm">
        <Radio
          name="payment"
          option="card"
          label="Card"
          value={value}
          error={cardError}
          onChange={(_name, next) => setValue(next || "")}
        />
        <Radio name="payment" option="invoice" label="Invoice" value={value} disabled />
      </Stack>
    )
  }
}

const deliverySchema = () =>
  createValidationSchema({
    delivery: z.string().min(1, "Select a delivery option")
  })

export const InsideForm: Story = {
  name: "Inside Form",
  parameters: {
    docs: {
      description: {
        story:
          "Radio works inside Form like any other element. Pass a `name`. All radios in a group must share the same name."
      }
    }
  },
  render: () => {
    const schema = deliverySchema()

    return (
      <Form
        gap="md"
        defaultValues={{ delivery: "" }}
        validationSchema={schema}
        onSubmit={(values) => {
          // eslint-disable-next-line no-alert
          alert(`delivery: ${values.delivery || ""}`)
        }}
      >
        <Radio name="delivery" option="courier" label="Courier" />
        <Radio name="delivery" option="pickup" label="Pickup" />
        <FormSubmit>Submit</FormSubmit>
      </Form>
    )
  }
}
