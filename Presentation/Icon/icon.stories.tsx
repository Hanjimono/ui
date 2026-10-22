import React from "react"
import Icon from "@/ui/Presentation/Icon"
import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof Icon> = {
  title: "Ui/Presentation/Icon",
  component: Icon,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Icon renders Material Design, Font Awesome, and custom image icons. Supports flexible appearance, size, color, and source configuration."
      }
    }
  },
  argTypes: {
    type: { control: "select", options: ["md", "fa", "custom"] },
    name: { control: "text" },
    size: { control: "number" },
    faType: { control: "text" },
    customIconLink: { control: "text" },
    alt: { control: "text" },
    width: { control: "number" },
    height: { control: "number" },
    className: { control: "text" }
  }
}
export default meta

type Story = StoryObj<typeof Icon>

export const MaterialIcon: Story = {
  args: {
    type: "md",
    name: "home",
    size: 32
  },
  name: "Material Icon",
  parameters: {
    docs: {
      description: {
        story: "Material Design icon. Requires the matching font to be loaded."
      }
    }
  }
}

export const FontAwesomeIcon: Story = {
  args: {
    type: "fa",
    name: "fish"
  },
  name: "FontAwesome Icon",
  parameters: {
    docs: {
      description: {
        story: "Font Awesome icon. Requires the matching font to be loaded."
      }
    }
  }
}

export const CustomIcon: Story = {
  args: {
    type: "custom",
    customIconLink: "https://picsum.photos/32/32",
    alt: "Custom icon",
    size: 32
  },
  name: "Custom icon",
  parameters: {
    docs: {
      description: {
        story:
          "Custom icon rendered from an image URL. Size, width, height, and alt can be set."
      }
    }
  }
}

export const IconSizesDefinedByParent: Story = {
  args: {
    type: "md",
    name: "home"
  },
  name: "Icon size",
  parameters: {
    docs: {
      description: {
        story: "Icon whose size is inherited from the parent element."
      }
    }
  },
  render: (args) => (
    <div>
      <div style={{ fontSize: "24px" }}>
        <Icon {...args} /> Text size 24px
      </div>
      <div style={{ fontSize: "32px" }}>
        <Icon {...args} /> Text size 32px
      </div>
      <div style={{ fontSize: "40px" }}>
        <Icon {...args} /> Text size 40px
      </div>
      <div style={{ fontSize: "32px" }}>
        <Icon {...args} size={50} /> Text size 32px, but icon size 50px
      </div>
    </div>
  )
}
