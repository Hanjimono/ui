import React from "react"
import Button from "@/ui/Action/Button"
import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof Button> = {
  title: "Ui/Action/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Button component used for primary user actions."
      }
    }
  },
  argTypes: {
    onClick: { action: "clicked" },
    theme: {
      control: "select",
      options: ["primary", "secondary", "danger", "success"]
    },
    variant: {
      control: "select",
      options: ["solid", "outline", "text", "icon"]
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"]
    },
    icon: { control: "text" },
    endIcon: { control: "text" },
    disabled: { control: "boolean" },
    isLoading: { control: "boolean" },
    width: { control: "select", options: ["wide", "narrow", "adaptive"] },
    shadow: { control: "select", options: ["default", "no-shadow"] },
    type: {
      control: "select",
      options: ["button", "submit", "reset"]
    }
  }
}
export default meta

type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: {
    children: "Button"
  },
  name: "Basic button",
  parameters: {
    docs: {
      description: {
        story: "The simplest button without extra styles or states."
      }
    }
  }
}

export const Primary: Story = {
  args: {
    children: "Primary",
    theme: "primary"
  },
  name: "Primary theme",
  parameters: {
    docs: {
      description: {
        story: "Primary theme button used by default."
      }
    }
  }
}

export const Secondary: Story = {
  args: {
    children: "Secondary",
    theme: "secondary"
  },
  name: "Secondary theme",
  parameters: {
    docs: {
      description: {
        story:
          "Secondary theme for lower-priority actions when several buttons appear together."
      }
    }
  }
}

export const Danger: Story = {
  args: {
    children: "Danger",
    theme: "danger"
  },
  name: "Danger theme",
  parameters: {
    docs: {
      description: {
        story: "Danger theme for careful actions such as deleting data."
      }
    }
  }
}

export const Success: Story = {
  args: {
    children: "Success",
    theme: "success"
  },
  name: "Success theme",
  parameters: {
    docs: {
      description: {
        story: "Success theme for confirming actions such as save or complete."
      }
    }
  }
}

export const Themes: Story = {
  args: {
    children: "Button"
  },
  name: "All themes",
  parameters: {
    docs: {
      description: {
        story: "Side-by-side comparison of all button color themes."
      }
    }
  },
  render: (args) => (
    <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
      <Button {...args} theme="primary">
        Primary
      </Button>
      <Button {...args} theme="secondary">
        Secondary
      </Button>
      <Button {...args} theme="danger">
        Danger
      </Button>
      <Button {...args} theme="success">
        Success
      </Button>
    </div>
  )
}

export const Solid: Story = {
  args: {
    children: "Solid",
    variant: "solid"
  },
  name: "Solid variant",
  parameters: {
    docs: {
      description: {
        story: "Filled background button (default variant)."
      }
    }
  }
}

export const Outline: Story = {
  args: {
    children: "Outline",
    variant: "outline"
  },
  name: "Outline variant",
  parameters: {
    docs: {
      description: {
        story: "Outlined button without a filled background."
      }
    }
  }
}

export const OutlineThemes: Story = {
  args: {
    variant: "outline"
  },
  name: "Outline in all themes",
  parameters: {
    docs: {
      description: {
        story: "Outline variant combined with each color theme."
      }
    }
  },
  render: (args) => (
    <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
      <Button {...args} theme="primary">
        Primary
      </Button>
      <Button {...args} theme="secondary">
        Secondary
      </Button>
      <Button {...args} theme="danger">
        Danger
      </Button>
      <Button {...args} theme="success">
        Success
      </Button>
    </div>
  )
}

export const TextVariant: Story = {
  args: {
    children: "Text only",
    variant: "text"
  },
  name: "Text button",
  parameters: {
    docs: {
      description: {
        story: "Text button without background or border. Can include an icon."
      }
    }
  },
  render: (args) => (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <Button {...args} />
      <Button {...args} icon="search">
        Button with icon
      </Button>
    </div>
  )
}

export const WithIcon: Story = {
  args: {
    children: "With icon",
    icon: "add"
  },
  name: "Button with icon",
  parameters: {
    docs: {
      description: {
        story:
          "Button with a leading icon. By default uses Material Icons. Pass an object for detailed icon settings. Use endIcon for a trailing icon."
      }
    }
  },
  render: (args) => (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <Button {...args} />
      <Button
        {...args}
        icon={{
          type: "custom",
          size: 20,
          alt: "Custom Icon",
          customIconLink: "https://picsum.photos/20/20?grayscale"
        }}
      >
        With custom icon
      </Button>
      <Button {...args} icon={undefined} endIcon="arrow_forward">
        With trailing icon
      </Button>
    </div>
  )
}

export const IconVariant: Story = {
  args: {
    icon: "settings",
    variant: "icon"
  },
  name: "Icon-only button",
  parameters: {
    docs: {
      description: {
        story:
          "Icon-only button (variant: icon). Useful for compact actions. Set via variant or by passing only icon."
      }
    }
  },
  render: (args) => (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <Button {...args} />
      <Button {...args} variant="solid" icon="settings" />
    </div>
  )
}

export const Sizes: Story = {
  args: {
    children: "Button"
  },
  name: "Sizes",
  parameters: {
    docs: {
      description: {
        story: "Three button sizes: sm, md, lg."
      }
    }
  },
  render: (args) => (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <Button {...args} size="sm">
        Small
      </Button>
      <Button {...args} size="md">
        Medium
      </Button>
      <Button {...args} size="lg">
        Large
      </Button>
    </div>
  )
}

export const Loading: Story = {
  args: {
    children: "Loading...",
    isLoading: true
  },
  name: "Loading button",
  parameters: {
    docs: {
      description: {
        story:
          "Button with a loading indicator; interaction is disabled. If an icon is set, the loader replaces it; otherwise it overlays the text."
      }
    }
  },
  render: (args) => (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <Button {...args} />
      <Button {...args} icon="download">
        Loading with icon
      </Button>
    </div>
  )
}

export const Disabled: Story = {
  args: {
    children: "Disabled",
    disabled: true
  },
  name: "Disabled button",
  parameters: {
    docs: {
      description: {
        story: "Disabled button that ignores clicks. Used for unavailable actions."
      }
    }
  }
}

export const Wide: Story = {
  args: {
    children: "Wide button",
    width: "wide"
  },
  decorators: [
    (Story) => (
      <div style={{ minWidth: "100vh", display: "flex", justifyContent: "center" }}>
        <Story />
      </div>
    )
  ],
  name: "Button width",
  parameters: {
    docs: {
      description: {
        story:
          "Width modes:\n" +
          "adaptive - full width on mobile, minimal on desktop\n" +
          "narrow - minimal width always\n" +
          "wide - full width always"
      }
    }
  }
}

export const DropShadow: Story = {
  args: {
    children: "With shadow",
    shadow: "default"
  },
  name: "Button with shadow",
  parameters: {
    docs: {
      description: {
        story:
          "Shadow modes:\n" +
          "default - standard shadow\n" +
          "no-shadow - no shadow"
      }
    }
  }
}

export const LinkAction: Story = {
  args: {
    children: "Link",
    link: "https://example.com",
    target: "_blank"
  },
  name: "Button as link",
  parameters: {
    docs: {
      description: {
        story:
          "Button behaves as a link and navigates to the given URL. Use target to open in a new tab."
      }
    }
  }
}
