import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import Input from "./index"

const variantFloatClassName = "py-4 px-6 min-h-14 max-h-14 h-14"
const variantSimpleClassName = "py-4 px-6 min-h-14 max-h-14 h-14"
const variantUnderlinedClassName = "py-2 px-[0.2rem] min-h-10 max-h-10 h-10"

const meta: Meta<typeof Input> = {
  title: "Ui/Form/Input",
  component: Input,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Universal text input. Supports several visual variants configured via uiConfig."
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
  argTypes: {
    label: { control: "text" },
    value: { control: "text" },
    error: { control: "text" },
    disabled: { control: "boolean" },
    icon: { control: "text" },
    endIcon: { control: "text" },
    isLoading: { control: "boolean" },
    isClearable: { control: "boolean" },
    isFilled: { control: "boolean" },
    isLabelOnTop: { control: "boolean" },
    isLabelSpaceReserved: {
      control: "boolean"
    },
    variant: {
      control: "select",
      options: ["floating", "simple", "underlined"]
    },
    placeholder: { control: "text" },
    onChange: { action: "changed" },
    onClear: { action: "cleared" },
    onFocus: { action: "focused" },
    onBlur: { action: "blurred" },
    stopPropagationOnClear: { control: "boolean" },
    isNoMouseEvent: { control: "boolean" },
    focused: { control: "boolean" },
    type: { control: "text" },
    formatter: { control: "text" }
  },
  tags: ["autodocs"]
}

export default meta

type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: {
    label: "Email",
    name: "email",
    placeholder: "Enter email"
  },
  name: "Basic input",
  parameters: {
    docs: {
      description: {
        story:
          "Basic input matching the variant from config. It can be uncontrolled, but then you cannot easily pass the final value. Prefer controlled use via custom handlers or the Form component."
      }
    }
  },
  render: (args) => {
    return <Input {...args} />
  }
}

export const WithIcon: Story = {
  args: {
    label: "Search",
    name: "search",
    icon: "search",
    placeholder: "Start typing..."
  },
  name: "Leading icon",
  parameters: {
    docs: {
      description: {
        story:
          "Field with a leading icon. The icon helps visually link the field to an action (e.g. search)."
      }
    }
  },
  render: (args) => {
    const [value, setValue] = React.useState("")
    return <Input {...args} value={value} onChange={(_, v) => setValue(v || "")} />
  }
}

export const WithEndIcon: Story = {
  args: {
    label: "Email",
    name: "email-end-icon",
    endIcon: "mail"
  },
  name: "Trailing icon",
  parameters: {
    docs: {
      description: {
        story:
          "Field with a trailing icon. Used for secondary hints or status (e.g. input type)."
      }
    }
  },
  render: (args) => {
    const [value, setValue] = React.useState("")
    return <Input {...args} value={value} onChange={(_, v) => setValue(v || "")} />
  }
}

export const Clearable: Story = {
  args: {
    label: "Clearable field",
    name: "clearable",
    isClearable: true
  },
  name: "Clear button",
  parameters: {
    docs: {
      description: {
        story:
          "Input with a clear button. The button appears only when there is a value and the input is not disabled or loading. Without Form, pass `onClear` yourself."
      }
    }
  },
  render: (args) => {
    const [value, setValue] = React.useState("Text to clear")
    return (
      <Input
        {...args}
        value={value}
        onChange={(_, v) => setValue(v || "")}
        onClear={() => setValue("")}
      />
    )
  }
}

export const ErrorState: Story = {
  args: {
    label: "Email",
    name: "email-error",
    error: "Enter a valid email address."
  },
  name: "Error state",
  parameters: {
    docs: {
      description: {
        story:
          "Error display: the input is highlighted, a message appears under the field, and icons become an error icon. Validation is not built into Input; error wiring is up to you unless you use Form."
      }
    }
  },
  render: (args) => {
    const [value, setValue] = React.useState("wrong@")
    return <Input {...args} value={value} onChange={(_, v) => setValue(v || "")} />
  }
}

export const Disabled: Story = {
  args: {
    label: "Disabled field",
    name: "disabled",
    disabled: true
  },
  name: "Disabled field",
  parameters: {
    docs: {
      description: {
        story: "Disabled input. Visually blocked and ignores input and clicks."
      }
    }
  },
  render: (args) => {
    return <Input {...args} value="Not editable" />
  }
}

export const LoadingState: Story = {
  args: {
    label: "Search",
    name: "loading",
    isLoading: true,
    icon: "search",
    placeholder: "Input is blocked while loading"
  },
  name: "Loading state",
  parameters: {
    docs: {
      description: {
        story:
          "Input with a loading indicator. The field is blocked and icons are replaced by a spinner."
      }
    }
  },
  render: (args) => {
    return <Input {...args} value="Searching..." />
  }
}

export const VariantsComparison: Story = {
  name: "Variant comparison",
  parameters: {
    docs: {
      description: {
        story:
          "Comparison of visual variants. You can force a variant via prop, but apps usually pick one global look via config. Extra demo styles are applied here for clarity."
      }
    }
  },
  render: () => {
    const [floating, setFloating] = React.useState("")
    const [simple, setSimple] = React.useState("")
    const [underlined, setUnderlined] = React.useState("")

    return (
      <div className="grid gap-4">
        <Input
          className={variantFloatClassName}
          label="Floating label"
          name="variant-floating"
          variant="floating"
          placeholder="Animates on focus"
          value={floating}
          onChange={(_, v) => setFloating(v || "")}
        />
        <Input
          className={variantSimpleClassName}
          label="Simple"
          name="variant-simple"
          variant="simple"
          placeholder="Label above the field"
          value={simple}
          onChange={(_, v) => setSimple(v || "")}
        />
        <Input
          className={variantUnderlinedClassName}
          label="Underlined"
          name="variant-underlined"
          variant="underlined"
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
        <Input
          label="Pinned label"
          name="label-on-top"
          variant="floating"
          className={variantFloatClassName}
          placeholder="Label always on top"
          value={top}
          onChange={(_, v) => setTop(v || "")}
          isLabelOnTop
        />
        <div className="flex gap-4">
          <Input
            label="With label"
            name="label-reserved-1"
            className={variantSimpleClassName}
            variant="simple"
            placeholder="Label present"
            value={reserved}
            onChange={(_, v) => setReserved(v || "")}
          />
          <Input
            className={variantSimpleClassName}
            name="label-reserved-2"
            variant="simple"
            isLabelSpaceReserved
            placeholder="No label, space reserved"
          />
        </div>
      </div>
    )
  }
}

export const WithFormatter: Story = {
  args: {
    label: "Digits only",
    name: "numbers",
    formatter: "numbers",
    placeholder: "0123456789"
  },
  name: "Input formatters",
  parameters: {
    docs: {
      description: {
        story:
          "Input supports formatting via built-in functions. Formatters run in order on every value change."
      }
    }
  },
  render: () => {
    const [numbers, setNumbers] = React.useState("")
    const [twoDecimals, setTwoDecimals] = React.useState("")
    const [threeDecimals, setThreeDecimals] = React.useState("")
    const [maxLen, setMaxLen] = React.useState("")

    return (
      <div className="grid gap-4">
        <Input
          label="Digits only"
          name="format-numbers"
          formatter="numbers"
          placeholder="Only 0–9"
          value={numbers}
          onChange={(_, v) => setNumbers(v || "")}
        />
        <Input
          label="Two decimal places"
          name="format-two-decimals"
          formatter="twoDecimals"
          placeholder="e.g. 123.45"
          value={twoDecimals}
          onChange={(_, v) => setTwoDecimals(v || "")}
        />
        <Input
          label="Three decimal places"
          name="format-three-decimals"
          formatter="threeDecimals"
          placeholder="e.g. 123.456"
          value={threeDecimals}
          onChange={(_, v) => setThreeDecimals(v || "")}
        />
        <Input
          label="Max 10 characters, digits only"
          name="format-maxlength-numbers"
          formatter={["numbers", "maxLength:10"]}
          placeholder="Up to 10 digits"
          value={maxLen}
          onChange={(_, v) => setMaxLen(v || "")}
        />
      </div>
    )
  }
}
