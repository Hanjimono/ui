import React from "react"
import Loader from "@/ui/Presentation/Loader"
import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof Loader> = {
  title: "Ui/Presentation/Loader",
  component: Loader,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Loader shows a loading indicator with configurable size and color. Use it for waiting or data-loading states."
      }
    }
  },
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl", 16, 24, 32, 48]
    },
    variant: {
      control: "select",
      options: ["default", "alternative", "inherit"]
    }
  }
}
export default meta

type Story = StoryObj<typeof Loader>

export const Default: Story = {
  args: {},
  name: "Basic Loader",
  parameters: {
    docs: {
      description: {
        story: "Basic loading indicator with the default size ('sm')."
      }
    }
  }
}

export const Sizes: Story = {
  args: {},
  name: "Loader sizes",
  parameters: {
    docs: {
      description: {
        story:
          "Different loader sizes. Use presets ('xs', 'sm', 'md', 'lg', 'xl') or numeric values in pixels."
      }
    }
  },
  render: () => (
    <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
      <Loader size="xs" />
      <Loader size="sm" />
      <Loader size="md" />
      <Loader size="lg" />
      <Loader size="xl" />
      <Loader size={16} />
      <Loader size={32} />
      <Loader size={48} />
    </div>
  )
}

export const InheritColor: Story = {
  args: {
    variant: "inherit"
  },
  name: "Parent text color",
  parameters: {
    docs: {
      description: {
        story:
          "The inherit variant takes the stroke color from the parent text color. Use it on a button whose fill matches the loader color."
      }
    }
  },
  render: () => (
    <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
      <span style={{ color: "#212121" }}>
        <Loader variant="inherit" />
      </span>
      <span style={{ color: "#f44336" }}>
        <Loader variant="inherit" />
      </span>
      <span style={{ color: "#ffffff", background: "#212121", padding: "8px" }}>
        <Loader variant="inherit" />
      </span>
    </div>
  )
}

export const AlternativeColor: Story = {
  args: {
    variant: "alternative"
  },
  name: "Loader with alternative color",
  parameters: {
    docs: {
      description: {
        story: "Loader with the alternative color scheme. Use for emphasis or on a dark background."
      }
    }
  }
}
