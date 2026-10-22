import React from "react"
import { Accordion, AccordionTrigger, AccordionContent } from "@/ui/Presentation/Accordion"
import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof Accordion> = {
  title: "UI/Presentation/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Accordion is a customizable disclosure component for showing and hiding content."
      }
    }
  },
  argTypes: {
    className: { control: "text" },
    openClassName: { control: "text" }
  }
}
export default meta

type Story = StoryObj<typeof Accordion>

export const Default: Story = {
  name: "Basic accordion",
  parameters: {
    docs: {
      description: {
        story: "Basic accordion with a header and collapsible content."
      }
    }
  },
  render: (args) => (
    <Accordion {...args}>
      <AccordionTrigger>Accordion title</AccordionTrigger>
      <AccordionContent>
        <div>Accordion content. Any text or component can go here.</div>
      </AccordionContent>
    </Accordion>
  )
}

export const MultipleAccordions: Story = {
  args: {},
  name: "Multiple accordions",
  parameters: {
    docs: {
      description: {
        story: "Custom render showing several accordions with different content."
      }
    }
  },
  render: () => (
    <div style={{ display: "grid", gap: "24px" }}>
      <Accordion>
        <AccordionTrigger>First accordion</AccordionTrigger>
        <AccordionContent>
          <div>Content of the first accordion.</div>
        </AccordionContent>
      </Accordion>
      <Accordion>
        <AccordionTrigger>Second accordion</AccordionTrigger>
        <AccordionContent>
          <div>Content of the second accordion.</div>
        </AccordionContent>
      </Accordion>
      <Accordion>
        <AccordionTrigger>Third accordion</AccordionTrigger>
        <AccordionContent>
          <div>Content of the third accordion.</div>
        </AccordionContent>
      </Accordion>
    </div>
  )
}
