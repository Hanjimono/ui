import type { Meta, StoryObj } from "@storybook/react"
import React, { useState } from "react"

import Button from "@/ui/Action/Button"
import Text from "@/ui/Presentation/Text"

import Tooltip from "./index"
import TooltipPopup from "./primitive"
import { useTooltip } from "./useTooltipHook"
import styles from "./tooltip.stories.module.scss"

/** Storybook metadata for `Tooltip`. */
const meta: Meta<typeof Tooltip> = {
  title: "Ui/Presentation/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Floating tooltip component and primitives for custom tips. Built on the Floating system. Works with only text, and also supports detailed control over behaviour and appearance."
      }
    }
  },
  argTypes: {
    text: { control: "text" },
    title: { control: "text" },
    isLoading: { control: "boolean" }
  }
}

export default meta

type Story = StoryObj<typeof Tooltip>

export const DefaultHover: Story = {
  name: "Hover (desktop)",
  args: {
    title: "Tooltip title",
    text: "Floating tooltip text."
  },
  parameters: {
    docs: {
      description: {
        story:
          "Simplest tooltip. Shown on hover over the icon. Appearance of both tip and icon is controlled via config."
      }
    }
  },
  render: (args) => (
    <div style={{ padding: 24 }}>
      <Tooltip {...args} />
    </div>
  )
}

export const KeyboardFocus: Story = {
  name: "Focus (keyboard)",
  args: {
    text: "Text tooltip."
  },
  parameters: {
    docs: {
      description: {
        story:
          "Also supports keyboard focus by default. Click the button on the left, then press Tab so focus moves to the tooltip icon."
      }
    }
  },
  render: (args) => (
    <div style={{ padding: 24, display: "flex", alignItems: "center", gap: 12 }}>
      <Button>Before</Button>
      <Tooltip {...args} />
      <Button>After</Button>
    </div>
  )
}

export const MobileClickSimulation: Story = {
  name: "Click (touch simulation)",
  args: {
    title: "Mobile mode",
    text: "Tooltip on a mobile device."
  },
  parameters: {
    docs: {
      description: {
        story:
          "On phones the tip opens on icon press. Mobile detection is automatic. Try this story via browser DevTools device mode."
      }
    }
  },
  render: (args) => {
    return (
      <div style={{ padding: 24 }}>
        <Tooltip {...args} />
      </div>
    )
  }
}

export const LoadingIndicator: Story = {
  name: "Loading state",
  args: {
    title: "Loading",
    text: "Tooltip text"
  },
  parameters: {
    docs: {
      description: {
        story:
          "Supports controlled and uncontrolled open. You can also pass a loading state to load tip content from a backend."
      }
    }
  },
  render: ({ title, text }) => {
    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    return (
      <div style={{ padding: 24 }}>
        <Tooltip
          title={title}
          text={text}
          isLoading={isLoading}
          open={open}
          onOpenChange={(next) => {
            setOpen(next)
            if (next) {
              setIsLoading(true)
              window.setTimeout(() => setIsLoading(false), 2000)
            }
          }}
          loaderLabel="Loading data..."
        />
      </div>
    )
  }
}

export const CustomIconAndStyles: Story = {
  name: "Custom tooltip",
  args: {
    title: "Warning",
    text: "Large red icon and custom popup/title/text styles."
  },
  parameters: {
    docs: {
      description: {
        story: "Customize both the trigger icon and the tooltip appearance when needed."
      }
    }
  },
  render: ({ title, text }) => (
    <div style={{ padding: 24 }}>
      <Tooltip
        title={title}
        text={text}
        icon={{ type: "md", name: "error", size: 48 }}
        iconClassName={styles["large-error-icon"]}
        className={styles["custom-trigger"]}
        popupClassName={styles["custom-popup"]}
        titleClassName={styles["custom-title"]}
        textClassName={styles["custom-text"]}
        withArrow
        placement="top"
        arrowOptions={{
          fill: "#fff1f1",
          stroke: "#ff9aa2",
          strokeWidth: 1,
          width: 14,
          height: 7
        }}
      />
    </div>
  )
}

export const HoverTextWithHookAndPrimitive: Story = {
  name: "Custom trigger",
  args: {
    title: "Tooltip",
    text: "Tooltip built manually with `useTooltip` and the `TooltipPopup` primitive."
  },
  parameters: {
    docs: {
      description: {
        story:
          "For custom components use TooltipPopup and useTooltip to keep positioning and shared look while controlling the trigger yourself."
      }
    }
  },
  render: ({ title, text }) => {
    const tooltip = useTooltip({
      open: undefined,
      defaultOpen: false,
      placement: "top",
      offset: 10,
      withArrow: true
    })

    let ariaLabel = "Tooltip"
    if (typeof title === "string") {
      ariaLabel = title
    }
    const triggerProps = tooltip.getTriggerProps() as React.HTMLAttributes<HTMLElement>

    let describedBy: string | undefined
    if (tooltip.open) {
      describedBy = tooltip.tooltipId
    }

    return (
      <div style={{ padding: 24 }}>
        <p style={{ margin: 0 }}>
          Hover{" "}
          <Text
            as="span"
            {...triggerProps}
            ref={(node) => tooltip.setTriggerRef(node as unknown as HTMLElement | null)}
            tabIndex={0}
            aria-label={ariaLabel}
            aria-expanded={tooltip.open}
            aria-haspopup="true"
            aria-describedby={describedBy}
            style={{ textDecoration: "underline", textUnderlineOffset: 3, cursor: "help" }}
          >
            this text
          </Text>{" "}
          to see a tip built from primitives.
        </p>

        <TooltipPopup
          state={tooltip.popupState}
          portal
          id={tooltip.tooltipId}
          title={title}
          text={text}
        />
      </div>
    )
  }
}
