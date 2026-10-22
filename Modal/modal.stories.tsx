// System
import type { Meta, StoryObj } from "@storybook/react"
import React from "react"

// UI
import Button from "@/ui/Action/Button"
import { modal } from "@/ui/Modal/Core/modalApi"
import { useModal } from "@/ui/Modal/Hooks/useModal"
import ModalProvider from "@/ui/Modal/ModalProvider"
import ModalOutlet from "@/ui/Modal/ModalOutlet"

// Styles
import styles from "./stories.module.scss"

const meta: Meta = {
  title: "Ui/Modal",
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Modal system for dialogs above the page. `ModalProvider` owns the stack, API (`useModal` / `modal`), scroll lock, and focus restore. Stack rendering goes through `ModalOutlet` (Portal + `ModalContainer`); mount the Outlet in a tree with the needed page contexts. In React components open modals via `useModal('name')` with a registry key (`alert`, `confirm`, and project extensions in `registry.local`)."
      }
    }
  },
  decorators: [
    (Story) => (
      <ModalProvider>
        <Story />
        <ModalOutlet />
      </ModalProvider>
    )
  ],
  tags: ["autodocs"]
}

export default meta

type Story = StoryObj

export const BasicUsage: Story = {
  name: "Basic open via useModal",
  parameters: {
    docs: {
      description: {
        story:
          "Primary way to use modals in components — `useModal` with a registry name. Returns `open(props?, options?)`, `close(id?)`, and `lastId` of the last open. Click “Open confirm” for a confirm/cancel dialog."
      }
    }
  },
  render: () => {
    const confirmModal = useModal("confirm")

    return (
      <div className={styles["story-root"]}>
        <Button
          type="button"
          onClick={() => {
            confirmModal.open({
              title: "Save changes?",
              message: "Unsaved data will be lost.",
              onConfirm: () => undefined
            })
          }}
        >
          Open confirm
        </Button>
      </div>
    )
  }
}

export const BuiltInModals: Story = {
  name: "Built-in modals",
  parameters: {
    docs: {
      description: {
        story:
          "Modals are resolved through a registry. Default modals ship in the ui-kit (`alert`, `confirm`); projects add local modals in `registry.local`. See Alert or Confirm source as a template for custom modals."
      }
    }
  },
  render: () => {
    const alertModal = useModal("alert")
    const confirmModal = useModal("confirm")

    return (
      <div className={styles["story-root"]}>
        <div className={styles["variants-grid"]}>
          <div className={styles.variant}>
            <p className={styles["variant-label"]}>alert — message and one OK button</p>
            <Button
              type="button"
              onClick={() => {
                alertModal.open({
                  title: "Notice",
                  message: "This is an informational message."
                })
              }}
            >
              Show alert
            </Button>
          </div>

          <div className={styles.variant}>
            <p className={styles["variant-label"]}>confirm — confirm and cancel</p>
            <Button
              type="button"
              onClick={() => {
                confirmModal.open({
                  title: "Delete record?",
                  message: "This action cannot be undone.",
                  onConfirm: () => undefined
                })
              }}
            >
              Show confirm
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

export const DismissOptions: Story = {
  name: "Dismiss options (ModalOpenOptions)",
  parameters: {
    docs: {
      description: {
        story:
          "Pass `ModalOpenOptions` as the second argument to `open`: `preventClose`, `dismissOnOverlayClick`, `dismissOnEscape`, `withoutOverlay`, `role`, `onClose`, and others. Below are four confirm variants with different restrictions."
      }
    }
  },
  render: () => {
    const confirmModal = useModal("confirm")

    const openDefault = () => {
      confirmModal.open({
        title: "Default dismiss",
        message: "Closes via overlay, Escape, and buttons."
      })
    }

    const openPreventClose = () => {
      confirmModal.open(
        {
          title: "preventClose: true",
          message: "Cannot close via overlay or Escape — only buttons inside."
        },
        { preventClose: true }
      )
    }

    const openNoOverlayDismiss = () => {
      confirmModal.open(
        {
          title: "dismissOnOverlayClick: false",
          message: "Overlay click does not close; Escape still works."
        },
        { dismissOnOverlayClick: false }
      )
    }

    const openNoEscapeDismiss = () => {
      confirmModal.open(
        {
          title: "dismissOnEscape: false",
          message: "Escape does not close; overlay and buttons work as usual."
        },
        { dismissOnEscape: false }
      )
    }

    return (
      <div className={styles["story-root"]}>
        <div className={styles["variants-grid"]}>
          <div className={styles.variant}>
            <p className={styles["variant-label"]}>Default behaviour</p>
            <Button type="button" onClick={openDefault}>
              Default dismiss
            </Button>
          </div>

          <div className={styles.variant}>
            <p className={styles["variant-label"]}>preventClose</p>
            <Button type="button" onClick={openPreventClose}>
              No dismiss
            </Button>
          </div>

          <div className={styles.variant}>
            <p className={styles["variant-label"]}>dismissOnOverlayClick: false</p>
            <Button type="button" onClick={openNoOverlayDismiss}>
              No overlay dismiss
            </Button>
          </div>

          <div className={styles.variant}>
            <p className={styles["variant-label"]}>dismissOnEscape: false</p>
            <Button type="button" onClick={openNoEscapeDismiss}>
              No Escape
            </Button>
          </div>
        </div>

        <div className={styles["outside-area"]}>
          Click here (outside the modal) to test overlay dismiss.
        </div>
      </div>
    )
  }
}

export const ModalStack: Story = {
  name: "Modal stack",
  parameters: {
    docs: {
      description: {
        story:
          "You can open several modals in a row — they stack. Focus and Escape apply only to the top modal."
      }
    }
  },
  render: () => {
    const confirmModal = useModal("confirm")

    return (
      <div className={styles["story-root"]}>
        <div className={styles["controls-row"]}>
          <Button
            type="button"
            onClick={() => {
              confirmModal.open({
                title: "Lower modal",
                message: "First in the stack. Closes after the upper one."
              })
              confirmModal.open({
                title: "Upper modal",
                message: "Second in the stack. Escape closes this one first."
              })
            }}
          >
            Open two confirms
          </Button>
        </div>
      </div>
    )
  }
}

export const ImperativeApi: Story = {
  name: "Imperative API: modal outside React",
  parameters: {
    docs: {
      description: {
        story:
          "In utilities, API callbacks, or legacy code without hooks, use the global `modal` API from `@/ui/Modal/Core/modalApi` — same `show`, `close`, `closeAll`, and `update` that `ModalProvider` registers. Prefer `useModal` inside components."
      }
    }
  },
  render: () => {
    return (
      <div className={styles["story-root"]}>
        <Button
          type="button"
          onClick={() => {
            modal.show("confirm", {
              title: "Opened via imperative API",
              message: "This dialog was opened with modal.show(), without useModal.",
              onConfirm: () => undefined
            })
          }}
        >
          Open via modal.show
        </Button>
      </div>
    )
  }
}
