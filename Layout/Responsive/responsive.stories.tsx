import React from "react"
import Responsive, { Inline, Stack } from "@/ui/Layout/Responsive"
import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof Responsive> = {
  title: "Ui/Layout/Responsive",
  component: Responsive,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Base page layout primitive. Renders a flex container with responsive direction support."
      }
    },
    controls: { exclude: "children" }
  },
  argTypes: {
    className: { control: "text", description: "Extra CSS class for the component." },
    gap: {
      control: "select",
      options: ["none", "xs", "sm", "md", "lg", "xl", "xxl"],
      description: "Gap between flex items."
    },
    direction: { control: "object", description: "Direction settings per breakpoint." },
    base: {
      control: "select",
      options: ["row", "column", "row-reverse", "column-reverse"],
      description: "Direction at the base breakpoint."
    },
    sm: {
      control: "select",
      options: ["row", "column", "row-reverse", "column-reverse"],
      description: "Direction from the sm breakpoint up."
    },
    md: {
      control: "select",
      options: ["row", "column", "row-reverse", "column-reverse"],
      description: "Direction from the md breakpoint up."
    },
    lg: {
      control: "select",
      options: ["row", "column", "row-reverse", "column-reverse"],
      description: "Direction from the lg breakpoint up."
    },
    xl: {
      control: "select",
      options: ["row", "column", "row-reverse", "column-reverse"],
      description: "Direction from the xl breakpoint up."
    },
    xxl: {
      control: "select",
      options: ["row", "column", "row-reverse", "column-reverse"],
      description: "Direction from the xxl breakpoint up."
    }
  }
}
export default meta

type Story = StoryObj<typeof Responsive>

function DemoBlock({
  children,
  styles
}: {
  children: React.ReactNode
  styles?: React.CSSProperties
}) {
  return (
    <div style={{ background: "#e0e0e0", padding: "8px 16px", borderRadius: 4, ...styles }}>
      {children}
    </div>
  )
}

export const Default: Story = {
  args: {
    children: (
      <>
        <DemoBlock>Item 1</DemoBlock>
        <DemoBlock>Item 2</DemoBlock>
        <DemoBlock>Item 3</DemoBlock>
      </>
    ),
    md: "row",
    base: "column",
    gap: "md"
  },
  name: "Basic Responsive",
  parameters: {
    docs: {
      description: {
        story:
          "Basic Responsive layout. Items start in a column. Set a breakpoint prop to change direction from that viewport up — for example `md='row'` switches to a row from the md breakpoint."
      }
    }
  }
}

export const ObjectDirections: Story = {
  args: {
    children: (
      <>
        <DemoBlock>base</DemoBlock>
        <DemoBlock>sm</DemoBlock>
        <DemoBlock>md</DemoBlock>
        <DemoBlock>lg</DemoBlock>
        <DemoBlock>xl</DemoBlock>
        <DemoBlock>xxl</DemoBlock>
      </>
    ),
    direction: {
      base: "column",
      sm: "column",
      md: "row",
      lg: "column",
      xl: "row",
      xxl: "row"
    },
    gap: "sm"
  },
  name: "Flexible direction map",
  parameters: {
    docs: {
      description: {
        story:
          "When several breakpoints need different directions, pass a direction object to change layout per viewport size."
      }
    }
  }
}

export const ResponsiveWithGaps: Story = {
  args: {
    children: (
      <>
        <DemoBlock>Item 1</DemoBlock>
        <DemoBlock>Item 2</DemoBlock>
        <DemoBlock>Item 3</DemoBlock>
        <DemoBlock>Item 4</DemoBlock>
      </>
    ),
    base: "row",
    gap: "lg"
  },
  name: "Gap between items",
  parameters: {
    docs: {
      description: {
        story: "Use the `gap` prop to change spacing between flex items."
      }
    }
  },
  render: (args) => (
    <Stack gap="md">
      <h4>gap="lg"</h4>
      <Responsive {...args} />
      <h4>gap="sm"</h4>
      <Responsive {...args} gap="sm" />
    </Stack>
  )
}

export const InlineDemo: Story = {
  args: {
    children: (
      <>
        <DemoBlock>Inline 1</DemoBlock>
        <DemoBlock>Inline 2</DemoBlock>
        <DemoBlock>Inline 3</DemoBlock>
      </>
    ),
    gap: "lg"
  },
  name: "Inline (horizontal)",
  parameters: {
    docs: {
      description: {
        story:
          "Simpler flex helper when responsiveness is not needed and direction stays horizontal."
      }
    }
  },
  render: (args) => <Inline {...args} />
}

export const StackDemo: Story = {
  args: {
    children: (
      <>
        <DemoBlock>Stack 1</DemoBlock>
        <DemoBlock>Stack 2</DemoBlock>
        <DemoBlock>Stack 3</DemoBlock>
      </>
    ),
    gap: "lg"
  },
  name: "Stack (vertical)",
  parameters: {
    docs: {
      description: {
        story: "Simpler flex helper when responsiveness is not needed and direction stays vertical."
      }
    }
  },
  render: (args) => <Stack {...args} />
}
