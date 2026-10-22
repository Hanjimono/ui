import React from "react"
import Grid from "@/ui/Layout/Grid"
import { Stack } from "@/ui/Layout/Responsive"
import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof Grid> = {
  title: "Ui/Layout/Grid",
  component: Grid,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Grid provides an adaptive layout for content. It supports column count, gaps, spans, and offsets per breakpoint."
      }
    },
    controls: { exclude: "children" }
  },
  argTypes: {
    className: { control: "text", description: "Extra CSS class for the component." },
    columns: {
      control: "number",
      description: "Number of columns in the grid (1–12)",
      min: 1,
      max: 12
    },
    isContainer: { control: "boolean", description: "Whether this node is the grid container." },
    gap: {
      control: "select",
      options: ["none", "xs", "sm", "md", "lg", "xl", "xxl"],
      description: "Gap between grid items."
    },
    size: { control: "object", description: "Column span per breakpoint." },
    offset: { control: "object", description: "Column offset per breakpoint." }
  }
}
export default meta

type Story = StoryObj<typeof Grid>

function DemoBlock({
  children,
  styles
}: {
  children: React.ReactNode
  styles?: React.CSSProperties
}) {
  return (
    <div
      style={{
        background: "#e0e0e0",
        padding: "8px 16px",
        borderRadius: 4,
        textAlign: "center",
        width: "100%",
        ...styles
      }}
    >
      {children}
    </div>
  )
}

export const Default: Story = {
  args: {
    isContainer: true,
    gap: "md"
  },
  name: "Basic grid",
  parameters: {
    docs: {
      description: {
        story:
          "Basic 12-column grid. Item widths are calculated from nested spans and the gap between them."
      }
    }
  },
  render: (args) => (
    <Grid {...args}>
      <Grid size={{ base: 1 }}>
        <DemoBlock>1</DemoBlock>
      </Grid>
      <Grid size={{ base: 1 }}>
        <DemoBlock>2</DemoBlock>
      </Grid>
      <Grid size={{ base: 1 }}>
        <DemoBlock>3</DemoBlock>
      </Grid>
      <Grid size={{ base: 1 }}>
        <DemoBlock>4</DemoBlock>
      </Grid>
      <Grid size={{ base: 1 }}>
        <DemoBlock>5</DemoBlock>
      </Grid>
      <Grid size={{ base: 1 }}>
        <DemoBlock>6</DemoBlock>
      </Grid>
      <Grid size={{ base: 1 }}>
        <DemoBlock>7</DemoBlock>
      </Grid>
      <Grid size={{ base: 1 }}>
        <DemoBlock>8</DemoBlock>
      </Grid>
      <Grid size={{ base: 1 }}>
        <DemoBlock>9</DemoBlock>
      </Grid>
      <Grid size={{ base: 1 }}>
        <DemoBlock>10</DemoBlock>
      </Grid>
      <Grid size={{ base: 1 }}>
        <DemoBlock>11</DemoBlock>
      </Grid>
      <Grid size={{ base: 1 }}>
        <DemoBlock>12</DemoBlock>
      </Grid>
    </Grid>
  )
}

export const ResponsiveSizes: Story = {
  name: "Responsive column spans",
  args: {
    isContainer: true,
    gap: "md"
  },
  parameters: {
    docs: {
      description: {
        story: "Grid with different spans per breakpoint. Resize the viewport to verify."
      }
    }
  },
  render: (args) => (
    <Grid {...args}>
      <Grid size={{ base: 12, md: 6, lg: 4 }}>
        <DemoBlock>base 12 / md 6 / lg 4</DemoBlock>
      </Grid>
      <Grid size={{ base: 12, md: 6, lg: 4 }}>
        <DemoBlock>base 12 / md 6 / lg 4</DemoBlock>
      </Grid>
      <Grid size={{ base: 12, md: 12, lg: 4 }}>
        <DemoBlock>base 12 / md 12 / lg 4</DemoBlock>
      </Grid>
    </Grid>
  )
}

export const ColumnsVariants: Story = {
  name: "Custom column counts",
  parameters: {
    docs: {
      description: {
        story:
          "You can use a custom column count. Item widths still resolve from span and gap automatically."
      }
    }
  },
  render: () => (
    <Stack gap="lg">
      <Grid isContainer columns={2} gap="md">
        <Grid size={{ base: 1 }} isHideXOverflow>
          <DemoBlock>2 columns</DemoBlock>
        </Grid>
        <Grid size={{ base: 1 }} isHideXOverflow>
          <DemoBlock>2 columns</DemoBlock>
        </Grid>
      </Grid>
      <Grid isContainer columns={4} gap="md">
        {[1, 2, 3, 4].map((i) => (
          <Grid key={i} size={{ base: 1 }} isHideXOverflow>
            <DemoBlock>4 columns</DemoBlock>
          </Grid>
        ))}
      </Grid>
      <Grid isContainer columns={6} gap="md">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Grid key={i} size={{ base: 1 }} isHideXOverflow>
            <DemoBlock>6 columns</DemoBlock>
          </Grid>
        ))}
      </Grid>
    </Stack>
  )
}

export const OffsetDemo: Story = {
  name: "Grid with offsets",
  parameters: {
    docs: {
      description: {
        story: "Offsets per breakpoint shift content within the grid."
      }
    }
  },
  render: () => (
    <Grid isContainer columns={4} gap="md">
      <Grid size={{ base: 1 }} offset={{ base: 1 }} isHideXOverflow>
        <DemoBlock>Column with offset</DemoBlock>
      </Grid>
      <Grid size={{ base: 1 }} isHideXOverflow>
        <DemoBlock>Column</DemoBlock>
      </Grid>
      <Grid size={{ base: 1 }} isHideXOverflow>
        <DemoBlock>Column</DemoBlock>
      </Grid>
    </Grid>
  )
}

export const OverflowDemo: Story = {
  name: "Hide horizontal overflow",
  parameters: {
    docs: {
      description: {
        story:
          "Grid items size themselves without accounting for overflowing content. Prefer layouts that avoid overflow; when needed, hide horizontal overflow with `isHideXOverflow`. Resize the viewport to see the difference."
      }
    }
  },
  render: () => (
    <Stack gap="lg">
      <Grid isContainer columns={4} gap="md">
        <Grid size={{ base: 2 }}>
          <DemoBlock styles={{ width: "200%" }}>Wide overflowing content</DemoBlock>
        </Grid>
        <Grid size={{ base: 2 }}>
          <DemoBlock>Normal content</DemoBlock>
        </Grid>
      </Grid>
      <Grid isContainer columns={4} gap="md">
        <Grid size={{ base: 2 }} isHideXOverflow>
          <DemoBlock styles={{ width: "200%" }}>Wide content without overflow</DemoBlock>
        </Grid>
        <Grid size={{ base: 2 }} isHideXOverflow>
          <DemoBlock>Normal content</DemoBlock>
        </Grid>
      </Grid>
    </Stack>
  ),
  decorators: [
    (Story) => (
      <div
        style={{
          width: "30%",
          display: "flex",
          justifyContent: "center",
          marginLeft: "auto",
          marginRight: "auto"
        }}
      >
        <Story />
      </div>
    )
  ]
}
