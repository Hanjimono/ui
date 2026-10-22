import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import Link from "@/ui/Presentation/Link"
import type { LinkColor } from "./types"

interface LinkStoryArgs {
  as?: "a"
  children?: React.ReactNode
  href?: string
  target?: string
  color?: LinkColor
}

const meta: Meta<LinkStoryArgs> = {
  title: "Ui/Presentation/Link",
  component: Link as unknown as React.ComponentType<LinkStoryArgs>,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Link component. Follows the same base rules as Text."
      }
    }
  },
  argTypes: {
    href: {
      control: "text",
      description: "Link URL."
    },
    target: {
      control: "text",
      description: "Link target (for example, _blank)."
    },
    color: {
      control: "select",
      options: ["link", "link-minor", "text"],
      description: "Link color theme."
    },
    children: {
      control: "text",
      description: "Link text."
    }
  }
}

export default meta

type Story = StoryObj<typeof Link>

export const Default: Story = {
  args: {
    href: "https://example.com",
    target: "_blank",
    color: "link",
    children: "Default link"
  },
  name: "Basic link"
}

export const Colors: Story = {
  args: {
    href: "https://example.com",
    target: "_blank"
  },
  name: "Link colors",
  parameters: {
    docs: {
      description: {
        story: "Links with link, link-minor, and text colors."
      }
    }
  },
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <Link {...args} color="link">
        Primary link (link)
      </Link>
      <Link {...args} color="link-minor">
        Secondary link (link-minor)
      </Link>
      <Link {...args} color="text">
        Text-colored link (text)
      </Link>
    </div>
  )
}
