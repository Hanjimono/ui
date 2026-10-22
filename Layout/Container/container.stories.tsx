import React from "react"
import Container from "@/ui/Layout/Container"
import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof Container> = {
  title: "Ui/Layout/Container",
  component: Container,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Container limits content width and centers it on the page according to the viewport size."
      }
    }
  },
  argTypes: {
    className: { control: "text" }
  }
}
export default meta

type Story = StoryObj<typeof Container>

function DemoBlock({
  children,
  styles
}: {
  children: React.ReactNode
  styles?: React.CSSProperties
}) {
  return <div style={{ background: "#f0f0f0", padding: "10px", ...styles }}>{children}</div>
}

export const Default: Story = {
  name: "Basic responsive container",
  args: {
    type: "responsive"
  },
  render: (args) => (
    <Container {...args}>
      <DemoBlock>Content inside the container</DemoBlock>
    </Container>
  ),
  decorators: [
    (Story) => (
      <div style={{ minWidth: "100%", background: "#e0e0e0", paddingBottom: "50px" }}>
        <div style={{ padding: "30px" }}>Content outside the container, unformatted</div>
        <Story />
      </div>
    )
  ],
  parameters: {
    docs: {
      description: {
        story:
          "The responsive container changes its width with the viewport so content stays readable across devices."
      }
    }
  }
}

export const Fluid: Story = {
  name: "Fluid container",
  args: {
    type: "fluid"
  },
  render: (args) => (
    <Container {...args}>
      <DemoBlock>Content inside the container</DemoBlock>
    </Container>
  ),
  decorators: [
    (Story) => (
      <div style={{ minWidth: "100%", background: "#e0e0e0" }}>
        <div style={{ padding: "30px" }}>Content outside the container, unformatted</div>
        <Story />
      </div>
    )
  ],
  parameters: {
    docs: {
      description: {
        story: "The fluid container spans the full viewport width so content can stretch edge to edge."
      }
    }
  }
}
