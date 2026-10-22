import type { Meta, StoryObj } from "@storybook/react"
import React from "react"

import Select from "./index"

/** Storybook meta for `Select`. */
const meta: Meta<typeof Select> = {
  title: "Ui/Form/Select",
  component: Select,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Universal dropdown select. Appearance is based on Input with a Floating-positioned options list."
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
    error: { control: "text" },
    disabled: { control: "boolean" },
    icon: { control: "text" },
    endIcon: { control: "text" },
    isLoading: { control: "boolean" },
    isClearable: { control: "boolean" },
    placeholder: { control: "text" },
    variant: { control: "select", options: ["floating", "simple", "underlined"] },
    onChange: { action: "changed" }
  },
  tags: ["autodocs"]
}

export default meta

type Story = StoryObj<typeof Select>

const baseOptions = [
  { title: "Moscow", value: "msk" },
  { title: "Saint Petersburg", value: "spb" },
  { title: "Kazan", value: "kzn" },
  { title: "Unavailable", value: "disabled", disabled: true }
]

export const Default: Story = {
  name: "Basic",
  args: {
    name: "city",
    label: "City",
    placeholder: "Select a city",
    options: baseOptions
  },
  parameters: {
    docs: {
      description: {
        story:
          "Basic `Select` matching the config variant. It can be uncontrolled for demos, but prefer controlling the value via custom handlers or `Form`."
      }
    }
  }
}

export const OptionVariants: Story = {
  name: "Option variants",
  parameters: {
    docs: {
      description: {
        story:
          "By default `Select` expects objects with `title` and `value`. You can pass custom resolvers for title/value. Both selects share the same options; the second uses a custom title resolver."
      }
    }
  },
  render: () => {
    return (
      <div className="grid gap-4">
        <Select
          name="city-variants"
          label="Simple options"
          placeholder="Select a city"
          options={baseOptions}
        />
        <Select
          name="city-variants"
          label="Simple options"
          placeholder="Select a city"
          options={baseOptions}
          getOptionTitle={(item) => {
            return String(item.title + ", value: " + item.value)
          }}
        />
      </div>
    )
  }
}

export const Clearable: Story = {
  name: "Clearable field",
  args: {
    name: "city-clearable",
    label: "City",
    placeholder: "Select a city",
    options: baseOptions,
    isClearable: true
  },
  parameters: {
    docs: {
      description: {
        story:
          "Select supports clearing via the clear button. It appears only when there is a value and the select is not disabled or loading."
      }
    }
  }
}

export const WithIcon: Story = {
  name: "Leading icon",
  args: {
    name: "city-icon",
    label: "City",
    placeholder: "Select a city",
    options: baseOptions,
    icon: "location_on"
  },
  parameters: {
    docs: {
      description: {
        story: "Select supports a leading icon the same way as `Input`."
      }
    }
  }
}

export const Loading: Story = {
  name: "Loading",
  args: {
    name: "city-loading",
    label: "City",
    placeholder: "Loading options…",
    options: baseOptions,
    isLoading: true
  },
  parameters: {
    docs: {
      description: {
        story:
          "Loading state: the trigger is blocked and icons are replaced by a loader (behavior inherited from `Input`)."
      }
    }
  }
}

export const ErrorState: Story = {
  name: "Error",
  args: {
    name: "city-error",
    label: "City",
    placeholder: "Select a city",
    options: baseOptions,
    error: "Select a value from the list."
  },
  parameters: {
    docs: {
      description: {
        story:
          "Error state: highlight and message are rendered via `Input` for a consistent form field look."
      }
    }
  }
}

export const Disabled: Story = {
  name: "Disabled field",
  args: {
    name: "city-disabled",
    label: "City",
    options: baseOptions,
    disabled: true,
    value: "msk"
  },
  parameters: {
    docs: {
      description: {
        story: "Disabled field. Visually blocked and ignores input and clicks."
      }
    }
  }
}

export const CustomItemsAndRenderOption: Story = {
  name: "Custom option appearance",
  parameters: {
    docs: {
      description: {
        story:
          "Pass `renderOption` to customize how options look in the list."
      }
    }
  },
  render: () => {
    type TeamOption = { id: number; title: string; members: number }

    const options: TeamOption[] = [
      { id: 1, title: "Frontend", members: 12 },
      { id: 2, title: "Backend", members: 9 },
      { id: 3, title: "QA", members: 4 }
    ]

    return (
      <div className="grid gap-4">
        <Select<TeamOption, number>
          name="team"
          label="Team"
          placeholder="Select a team"
          options={options}
          getOptionTitle={(i) => i.title}
          getOptionValue={(i) => i.id}
          isClearable
          renderOption={({ title, value }) => (
            <div className="flex w-full justify-between">
              <span>{title}</span>
              <span className="opacity-70">#{value}</span>
            </div>
          )}
        />
      </div>
    )
  }
}
