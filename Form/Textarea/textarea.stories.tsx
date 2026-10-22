import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import Textarea from "./index"

const variantFloatClassName = "py-4 px-6"
const variantSimpleClassName = "py-4 px-6"
const variantUnderlinedClassName = "py-2 px-[0.2rem]"

const meta: Meta<typeof Textarea> = {
  title: "Ui/Form/Textarea",
  component: Textarea,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Universal multiline input in the style of `Input`."
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
  argTypes: {
    label: { control: "text" },
    value: { control: "text" },
    error: { control: "text" },
    disabled: { control: "boolean" },
    isFilled: { control: "boolean" },
    isLabelOnTop: { control: "boolean" },
    isLabelSpaceReserved: { control: "boolean" },
    variant: {
      control: "select",
      options: ["floating", "simple", "underlined"]
    },
    placeholder: { control: "text" },
    onChange: { action: "changed" },
    onFocus: { action: "focused" },
    onBlur: { action: "blurred" },
    isNoMouseEvent: { control: "boolean" },
    focused: { control: "boolean" },
    autoResize: { control: "boolean" },
    minRows: { control: { type: "number", min: 1, step: 1 } },
    maxRows: { control: { type: "number", min: 1, step: 1 } }
  },
  tags: ["autodocs"]
}

export default meta

type Story = StoryObj<typeof Textarea>

export const Default: Story = {
  args: {
    label: "Comment",
    name: "comment",
    minRows: 3,
    placeholder: "Enter a comment"
  },
  name: "Basic textarea",
  parameters: {
    docs: {
      description: {
        story:
          "Basic `textarea` matching the config variant. Can be used standalone, but controlled mode (custom logic or `Form`) is preferred."
      }
    }
  },
  render: (args) => {
    const [value, setValue] = React.useState("")
    return <Textarea {...args} value={value} onChange={(_, v) => setValue(v || "")} />
  }
}

export const AutoResize: Story = {
  args: {
    label: "Description",
    name: "description",
    autoResize: true,
    minRows: 2,
    maxRows: 8,
    placeholder: "Type a long multi-line text"
  },
  name: "Auto height",
  parameters: {
    docs: {
      description: {
        story:
          "Field height adjusts to content. `minRows` sets the minimum height, `maxRows` the maximum."
      }
    }
  },
  render: (args) => {
    const [value, setValue] = React.useState("")
    return <Textarea {...args} value={value} onChange={(_, v) => setValue(v || "")} />
  }
}

export const ErrorState: Story = {
  args: {
    label: "Comment",
    name: "comment-error",
    error: "Field must not be empty",
    minRows: 3
  },
  name: "Error state",
  parameters: {
    docs: {
      description: {
        story:
          "Error display: the field is highlighted and an error message appears under it. Validation timing is defined by the parent or by `Form`."
      }
    }
  },
  render: (args) => {
    const [value, setValue] = React.useState("Short text")
    return <Textarea {...args} value={value} onChange={(_, v) => setValue(v || "")} />
  }
}

export const Disabled: Story = {
  args: {
    label: "Disabled field",
    name: "disabled-comment",
    disabled: true,
    value: "Not editable",
    minRows: 3
  },
  name: "Disabled field",
  parameters: {
    docs: {
      description: {
        story: "`Textarea` in `disabled` state. Visually blocked and ignores user input."
      }
    }
  }
}

export const VariantsComparison: Story = {
  name: "Variant comparison",
  parameters: {
    docs: {
      description: {
        story:
          "Comparison of `textarea` variants: `floating`, `simple`, and `underlined`. Real projects usually pick one via config."
      }
    }
  },
  render: () => {
    const [floating, setFloating] = React.useState("")
    const [simple, setSimple] = React.useState("")
    const [underlined, setUnderlined] = React.useState("")

    return (
      <div className="grid gap-4">
        <Textarea
          className={variantFloatClassName}
          label="Floating label"
          name="textarea-variant-floating"
          variant="floating"
          minRows={3}
          placeholder="Label inside the field"
          value={floating}
          onChange={(_, v) => setFloating(v || "")}
        />
        <Textarea
          className={variantSimpleClassName}
          label="Simple"
          name="textarea-variant-simple"
          variant="simple"
          minRows={3}
          placeholder="Label above the field"
          value={simple}
          onChange={(_, v) => setSimple(v || "")}
        />
        <Textarea
          className={variantUnderlinedClassName}
          label="Underlined"
          name="textarea-variant-underlined"
          variant="underlined"
          minRows={3}
          placeholder="With underline"
          value={underlined}
          onChange={(_, v) => setUnderlined(v || "")}
        />
      </div>
    )
  }
}

export const LabelBehaviors: Story = {
  name: "Label behavior",
  parameters: {
    docs: {
      description: {
        story:
          "Props that affect the label: pin above the field (`isLabelOnTop`) and reserve label space (`isLabelSpaceReserved`)."
      }
    }
  },
  render: () => {
    const [top, setTop] = React.useState("")
    const [reserved, setReserved] = React.useState("")

    return (
      <div className="grid gap-4">
        <Textarea
          className={variantFloatClassName}
          label="Pinned label"
          name="textarea-label-on-top"
          variant="floating"
          minRows={3}
          placeholder="Label always on top"
          value={top}
          onChange={(_, v) => setTop(v || "")}
          isLabelOnTop
        />
        <div className="flex gap-4">
          <Textarea
            className={variantSimpleClassName}
            label="With label"
            name="textarea-label-reserved-1"
            variant="simple"
            minRows={3}
            value={reserved}
            onChange={(_, v) => setReserved(v || "")}
          />
          <Textarea
            className={variantSimpleClassName}
            name="textarea-label-reserved-2"
            variant="simple"
            minRows={3}
            isLabelSpaceReserved
            placeholder="No label, space reserved"
          />
        </div>
      </div>
    )
  }
}
