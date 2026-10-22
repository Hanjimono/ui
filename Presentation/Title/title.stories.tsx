import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import Title from "@/ui/Presentation/Title"
import type { TitleTagVariant } from "./types"

interface TitleStoryArgs {
  as?: TitleTagVariant
  size?: TitleTagVariant
  children?: React.ReactNode
}

const meta: Meta<TitleStoryArgs> = {
  title: "Ui/Presentation/Title",
  component: Title as unknown as React.ComponentType<TitleStoryArgs>,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Heading component for h1–h6 typography. Prefer Title over Text for semantic headings. Visual size follows `as` by default and can be overridden with `size` without changing the semantic tag."
      }
    }
  },
  argTypes: {
    as: {
      control: "select",
      options: ["h1", "h2", "h3", "h4", "h5", "h6"],
      description: "Heading level."
    },
    size: {
      control: "select",
      options: ["h1", "h2", "h3", "h4", "h5", "h6"],
      description: "Visual heading size. When omitted, follows `as`."
    },
    children: {
      control: "text",
      description: "Title content."
    }
  }
}

export default meta

type Story = StoryObj<typeof Title>

export const Default: Story = {
  args: {
    as: "h2",
    children: "Section title"
  },
  name: "Basic title"
}

export const Levels: Story = {
  args: {
    children: "Title"
  },
  name: "Heading levels",
  parameters: {
    docs: {
      description: {
        story: "All heading levels from h1 to h6. The level also sets the visual size."
      }
    }
  },
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <Title {...args} as="h1">
        H1 — Page title
      </Title>
      <Title {...args} as="h2">
        H2 — Main section
      </Title>
      <Title {...args} as="h3">
        H3 — Subsection
      </Title>
      <Title {...args} as="h4">
        H4 — Small heading
      </Title>
      <Title {...args} as="h5">
        H5 — Supporting heading
      </Title>
      <Title {...args} as="h6">
        H6 — Lowest-priority heading
      </Title>
    </div>
  )
}

export const CustomSizes: Story = {
  args: {
    children: "Title"
  },
  name: "Override visual size",
  parameters: {
    docs: {
      description: {
        story:
          "Override the visual size with `size` without changing the semantic heading tag."
      }
    }
  },
  render: (args) => (
    <div style={{ display: "grid", gap: "16px", maxWidth: "42rem" }}>
      <div style={{ display: "grid", gap: "4px" }}>
        <p style={{ margin: 0, fontSize: "0.875rem" }}>{`as="h3" size="h4"`}</p>
        <Title {...args} as="h3" size="h4">
          H3 semantically, H4 visually
        </Title>
      </div>

      <div style={{ display: "grid", gap: "4px" }}>
        <p style={{ margin: 0, fontSize: "0.875rem" }}>{`as="h2" size="h5"`}</p>
        <Title {...args} as="h2" size="h5">
          H2 semantically, H5 visually
        </Title>
      </div>

      <div style={{ display: "grid", gap: "4px" }}>
        <p style={{ margin: 0, fontSize: "0.875rem" }}>{`as="h4" size="h2"`}</p>
        <Title {...args} as="h4" size="h2">
          H4 semantically, H2 visually
        </Title>
      </div>
    </div>
  )
}
