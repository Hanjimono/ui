import React from "react"
import Text from "@/ui/Presentation/Text"
import type { TextAsTags, TextColor, TextPropSize, TextPropType } from "./types"
import type { Meta, StoryObj } from "@storybook/react"

interface TextStoryArgs {
  as?: TextAsTags
  children?: React.ReactNode
  className?: string
  size?: TextPropSize
  color?: TextColor
  nowrap?: boolean
  type?: TextPropType
  clamp?: number
}

const meta: Meta<TextStoryArgs> = {
  title: "Ui/Presentation/Text",
  component: Text as unknown as React.ComponentType<TextStoryArgs>,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Text display with sizes, colors, and behaviors (truncate, clamp). Supports nowrap to disable wrapping. Handles text appearance, not layout — use dedicated design components for spacing, weight, or more detailed look."
      }
    }
  },
  argTypes: {
    as: {
      control: "select",
      options: ["span", "p", "small", "i", "li", "ruby"],
      description: "HTML tag used for the text."
    },
    children: {
      control: "text",
      description: "Text content."
    },
    size: {
      control: "select",
      options: ["2xs", "xs", "s", "m", "l", "xl", "2xl", "3xl"],
      description: "Text size."
    },
    type: {
      control: "select",
      options: ["plain", "truncate", "clamp"],
      description: "Text display type."
    },
    nowrap: {
      control: "boolean",
      description: "Disable wrapping."
    },
    color: {
      control: "select",
      options: ["default", "primary", "secondary", "success", "danger"],
      description: "Text color theme."
    },
    clamp: {
      control: "number",
      description: "Line count when type is clamp."
    },
    className: {
      control: "text",
      description: "Extra CSS class."
    }
  }
}

export default meta

type Story = StoryObj<typeof Text>

export const Default: Story = {
  args: {
    children: "Basic text"
  },
  name: "Basic text",
  parameters: {
    docs: {
      description: {
        story: "Default text with no extra effects or constraints."
      }
    }
  }
}

export const Sizes: Story = {
  args: {
    children: "Text size",
    type: "plain",
    color: "default"
  },
  name: "Text sizes",
  parameters: {
    docs: {
      description: {
        story: "All available text sizes from 2xs to 3xl."
      }
    }
  },
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <Text {...args} size="2xs">
        2xs — smallest size
      </Text>
      <Text {...args} size="xs">
        xs — extra small
      </Text>
      <Text {...args} size="s">
        s — small (default)
      </Text>
      <Text {...args} size="m">
        m — medium
      </Text>
      <Text {...args} size="l">
        l — large
      </Text>
      <Text {...args} size="xl">
        xl — extra large
      </Text>
      <Text {...args} size="2xl">
        2xl — larger still
      </Text>
      <Text {...args} size="3xl">
        3xl — largest size
      </Text>
    </div>
  )
}

export const Colors: Story = {
  args: {
    children: "Text",
    type: "plain"
  },
  name: "Text colors",
  parameters: {
    docs: {
      description: {
        story: "All available text color variants."
      }
    }
  },
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <Text {...args} color="default">
        default — base text color
      </Text>
      <Text {...args} color="primary">
        primary — main accent color
      </Text>
      <Text {...args} color="secondary">
        secondary — secondary color
      </Text>
      <Text {...args} color="success">
        success — success style
      </Text>
      <Text {...args} color="danger">
        danger — error / warning style
      </Text>
    </div>
  )
}

export const Truncate: Story = {
  args: {
    type: "truncate",
    color: "default"
  },
  name: "Truncate",
  parameters: {
    docs: {
      description: {
        story:
          "Single-line truncation with an ellipsis. Needs a block context (`as='p'` or a block container). For multi-line truncation use `type='clamp'`."
      }
    }
  },
  render: (args) => (
    <div
      style={{
        width: "260px",
        border: "1px dashed #ccc",
        padding: "8px"
      }}
    >
      <Text {...args} as="p" size="s">
        This is a very long line of text that does not fit in the container and should be truncated
        with the truncate display type.
      </Text>
    </div>
  )
}

export const Clamp: Story = {
  args: {
    clamp: 2,
    color: "default"
  },
  name: "Line clamp",
  parameters: {
    docs: {
      description: {
        story:
          "Clamp limits text to a fixed number of lines via CSS (line-clamp / WebkitLineClamp)."
      }
    }
  },
  render: (args) => (
    <div
      style={{
        width: "320px",
        border: "1px dashed #ccc",
        padding: "8px",
        display: "grid",
        gap: "12px"
      }}
    >
      <Text {...args} type="clamp" clamp={2} size="s">
        This sample is limited to two lines. Changing line height or styles makes regressions easy
        to spot because overflow is hidden.
      </Text>
      <Text {...args} type="clamp" clamp={3} size="s">
        The same text limited to three lines. Changing clamp updates WebkitLineClamp directly, which
        is important to verify when editing the component.
      </Text>
    </div>
  )
}

export const Nowrap: Story = {
  args: {
    nowrap: true,
    color: "default"
  },
  name: "Nowrap",
  parameters: {
    docs: {
      description: {
        story:
          "nowrap disables wrapping. Text stays on one line and may overflow the container. Combines with any type."
      }
    }
  },
  render: (args) => (
    <div style={{ width: "260px", border: "1px dashed #ccc", padding: "8px" }}>
      <Text {...args} size="s">
        This long nowrap text does not wrap to the next line and may overflow the container.
      </Text>
    </div>
  )
}

export const MiscTags: Story = {
  args: {
    type: "plain",
    color: "default"
  },
  name: "Different tags",
  parameters: {
    docs: {
      description: {
        story:
          "Examples with small, i, and li tags to verify supported HTML tags render correctly."
      }
    }
  },
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <Text {...args} as="small">
        small — supporting smaller text
      </Text>
      <Text {...args} as="i">
        i — italic text
      </Text>
      <ul style={{ paddingLeft: "20px", margin: 0 }}>
        <Text {...args} as="li">
          li — list item via Text
        </Text>
      </ul>
    </div>
  )
}
