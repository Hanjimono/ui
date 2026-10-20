import type { Meta, StoryObj } from "@storybook/react"
import TailwindCheck from "@/ui/Smoke/TailwindCheck"

const meta: Meta<typeof TailwindCheck> = {
  title: "Ui/Smoke/TailwindCheck",
  component: TailwindCheck,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Smoke probe for pet-ui design tokens. A green action-primary pill means theme tokens resolve through the host config."
      }
    }
  }
}

export default meta

type Story = StoryObj<typeof TailwindCheck>

export const Default: Story = {
  args: {
    label: "pet-ui Tailwind OK"
  },
  parameters: {
    docs: {
      description: {
        story: "Default probe. Expected look: rounded action-primary background with action-primary-text."
      }
    }
  }
}
