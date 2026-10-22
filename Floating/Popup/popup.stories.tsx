import type { Meta, StoryObj } from "@storybook/react"
import React, { useMemo, useState } from "react"
import { usePopup } from "@/ui/Floating/Hooks/exports"
import type { FloatingVirtualElement } from "@/ui/Floating/Core/types"
import Popup from "./index"
import styles from "./stories.module.scss"

const meta: Meta<typeof Popup> = {
  title: "Ui/Floating/Popup",
  component: Popup,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "System for working with floating elements. Automatically calculates position and behavior of the floating element relative to its parent. Built on Floating UI under the hood, but structured so end consumers never touch the library and only use helper functions, hooks, and components."
      }
    }
  },
  argTypes: {
    state: {
      control: "object",
      description: "Popup state provided by the helper hook"
    }
  },
  tags: ["autodocs"]
}

export default meta

type Story = StoryObj<typeof Popup>

function PopupCard({ title, text }: { title?: string; text: string }) {
  return (
    <div className={styles["popup-card"]}>
      {title && <p className={styles["popup-title"]}>{title}</p>}
      <p className={styles["popup-text"]}>{text}</p>
    </div>
  )
}

export const Basic: Story = {
  name: "Basic controlled state",
  parameters: {
    docs: {
      description: {
        story:
          "Basic interaction with floating elements goes through the `usePopup` hook and the `Popup` component. The hook returns `setTriggerRef` and `getTriggerProps` for the trigger element, plus `popupState` for the `Popup` component. Control over open state stays with the parent and can be wired to a button, for example."
      }
    }
  },
  render: () => {
    const [open, setOpen] = useState(false)

    const popup = usePopup({
      open,
      onOpenChange: setOpen,
      placement: "bottom-start",
      trigger: ["click"],
      offset: 10
    })

    return (
      <div className={styles["story-root"]}>
        <button type="button" ref={popup.setTriggerRef} {...popup.getTriggerProps()}>
          Show popup
        </button>

        <Popup state={popup.popupState}>
          <PopupCard
            title="Controlled popup"
            text="Open and close are controlled from outside. This is needed to build custom components on top of the system."
          />
        </Popup>
      </div>
    )
  }
}

export const KeepMounted: Story = {
  name: "Content stays in the DOM when closed",
  parameters: {
    docs: {
      description: {
        story:
          "The `keepMounted` prop keeps popup content in the DOM when closed and hides it via CSS. You can verify the element remains in the DOM in DevTools."
      }
    }
  },
  render: () => {
    const [open, setOpen] = useState(false)

    const popup = usePopup({
      open,
      onOpenChange: setOpen,
      placement: "bottom-start",
      trigger: ["click"],
      offset: 10
    })

    return (
      <div className={styles["story-root"]}>
        <button type="button" ref={popup.setTriggerRef} {...popup.getTriggerProps()}>
          Menu
        </button>

        <Popup state={popup.popupState} keepMounted>
          <div className={styles["popup-card"]}>
            <a href="/example-1">First section</a>
            <a href="/example-2">Second section</a>
          </div>
        </Popup>
      </div>
    )
  }
}

export const ComplexControl: Story = {
  name: "Extra open-state control",
  parameters: {
    docs: {
      description: {
        story:
          "For basic functionality there is no need to wire event handlers on the `trigger` element yourself — it is enough to set the `trigger` type in the hook config. Open-state control still remains with the parent component."
      }
    }
  },
  render: () => {
    const [open, setOpen] = useState(false)

    const popup = usePopup({
      open,
      onOpenChange: setOpen,
      placement: "bottom-start",
      trigger: ["click"],
      offset: 10
    })

    return (
      <div className={styles["story-root"]}>
        <div className={styles["controls-row"]}>
          <button type="button" ref={popup.setTriggerRef} {...popup.getTriggerProps()}>
            Show popup
          </button>
          <button type="button" onClick={() => setOpen(false)}>
            Close popup
          </button>
        </div>

        <Popup state={popup.popupState}>
          <PopupCard
            title="Controlled popup"
            text="Open and close are controlled from outside. This is needed to build custom components on top of the system."
          />
        </Popup>
      </div>
    )
  }
}

export const TriggerTypes: Story = {
  name: "Trigger types",
  parameters: {
    docs: {
      description: {
        story:
          "The system supports three trigger variants (click, hover, and focus), which can be used in suitable situations. All triggers can work together."
      }
    }
  },
  render: () => {
    const [open1, setOpen1] = useState(false)

    const popup1 = usePopup({
      open: open1,
      onOpenChange: setOpen1,
      placement: "bottom",
      trigger: ["click"],
      offset: 10
    })

    const [open2, setOpen2] = useState(false)

    const popup2 = usePopup({
      open: open2,
      onOpenChange: setOpen2,
      placement: "bottom",
      trigger: ["hover"],
      offset: 10
    })

    const [open3, setOpen3] = useState(false)

    const popup3 = usePopup({
      open: open3,
      onOpenChange: setOpen3,
      placement: "bottom",
      trigger: ["focus"],
      offset: 10
    })

    const [test, setTest] = useState("")

    return (
      <div className={styles["story-root"]}>
        <div className={styles["controls-row"]}>
          <button type="button" ref={popup1.setTriggerRef} {...popup1.getTriggerProps()}>
            Click trigger
          </button>
          <button
            type="button"
            ref={popup2.setTriggerRef}
            {...popup2.getTriggerProps()}
            aria-label="Help"
          >
            ?
          </button>
          <input
            name="test"
            ref={popup3.setTriggerRef}
            {...popup3.getTriggerProps()}
            onChange={(event) => setTest(event.target.value)}
            placeholder="Hint appears on focus"
            value={test}
          />
        </div>

        <Popup state={popup1.popupState}>
          <PopupCard text="Can be useful for various context menus" />
        </Popup>

        <Popup state={popup2.popupState}>
          <PopupCard text="Can be useful for tooltips" />
        </Popup>

        <Popup state={popup3.popupState}>
          <PopupCard text="Can be useful for input forms" />
        </Popup>
      </div>
    )
  }
}

export const PositionSettings: Story = {
  name: "Positioning settings",
  parameters: {
    docs: {
      description: {
        story:
          "In the hook options you can specify more detailed positioning settings (direction, offset, etc.)"
      }
    }
  },
  render: () => {
    const [open1, setOpen1] = useState(false)

    const popup1 = usePopup({
      open: open1,
      onOpenChange: setOpen1,
      trigger: ["click"],
      placement: "top",
      offset: 12
    })

    const [open2, setOpen2] = useState(false)

    const popup2 = usePopup({
      open: open2,
      onOpenChange: setOpen2,
      trigger: ["click"],
      placement: "bottom",
      offset: 22
    })

    return (
      <div className={styles["story-root"]}>
        <div className={styles["controls-row"]}>
          <button type="button" ref={popup1.setTriggerRef} {...popup1.getTriggerProps()}>
            Hint on top
          </button>
          <button type="button" ref={popup2.setTriggerRef} {...popup2.getTriggerProps()}>
            Hint on bottom
          </button>
        </div>

        <Popup state={popup1.popupState}>
          <PopupCard text="Hint on top" />
        </Popup>
        <Popup state={popup2.popupState}>
          <PopupCard text="Hint on bottom with extra offset" />
        </Popup>
      </div>
    )
  }
}

export const AutoPositioningOnCollisions: Story = {
  name: "Auto-positioning on collisions",
  parameters: {
    docs: {
      description: {
        story:
          "Sometimes the trigger is near the window edge and the initially chosen `placement` does not fit. In those cases you can enable auto-positioning algorithms: `flip` (flip to the opposite side), `shift` (shift into the visible area), and `autoPlacement` (pick the most suitable side). Open the popup and then scroll the page — you will see how the system picks the final position."
      }
    }
  },
  render: () => {
    const [openFlip, setOpenFlip] = useState(false)
    const popupFlip = usePopup({
      open: openFlip,
      onOpenChange: setOpenFlip,
      trigger: ["click"],
      placement: "top",
      offset: 10,
      flip: true,
      autoPlacement: false,
      withArrow: true
    })

    const [openShift, setOpenShift] = useState(false)
    const popupShift = usePopup({
      open: openShift,
      onOpenChange: setOpenShift,
      trigger: ["click"],
      placement: "right",
      offset: 10,
      flip: false,
      shift: true,
      autoPlacement: false
    })

    const [openAuto, setOpenAuto] = useState(false)
    const popupAuto = usePopup({
      open: openAuto,
      onOpenChange: setOpenAuto,
      trigger: ["click"],
      placement: "right-end",
      offset: 10,
      flip: false,
      shift: false,
      autoPlacement: true,
      withArrow: true
    })

    return (
      <div style={{ overflow: "hidden" }} className={styles["story-root"]}>
        <div className={styles["edge-area"]}>
          <div className={styles["edge-stack"]}>
            <button type="button" ref={popupFlip.setTriggerRef} {...popupFlip.getTriggerProps()}>
              flip: flip
            </button>
            <button type="button" ref={popupShift.setTriggerRef} {...popupShift.getTriggerProps()}>
              shift: shift
            </button>
            <button type="button" ref={popupAuto.setTriggerRef} {...popupAuto.getTriggerProps()}>
              auto side pick
            </button>
          </div>
        </div>

        <Popup
          state={popupFlip.popupState}
          arrowOptions={{ fill: "#ffffff", stroke: "#d0d7de", strokeWidth: 1 }}
        >
          <PopupCard
            title="flip"
            text="If the chosen side does not fit, the popup can “flip” to the opposite side to stay visible."
          />
        </Popup>

        <Popup
          state={popupShift.popupState}
          arrowOptions={{ fill: "#ffffff", stroke: "#d0d7de", strokeWidth: 1 }}
        >
          <PopupCard
            title="shift"
            text="The popup keeps its side but shifts into the visible area so it is not “clipped” by the window edge."
          />
        </Popup>

        <Popup
          state={popupAuto.popupState}
          arrowOptions={{ fill: "#ffffff", stroke: "#d0d7de", strokeWidth: 1 }}
        >
          <PopupCard
            title="autoPlacement"
            text="Instead of a fixed side, the system picks the side that currently has more room."
          />
        </Popup>
      </div>
    )
  }
}

export const AutoUpdateOnPageScroll: Story = {
  name: "Auto recalculation on window and page size changes",
  parameters: {
    docs: {
      description: {
        story:
          "The popup is “anchored” to the trigger element and can automatically recalculate position when the window (page) size changes. This matters for tooltips and menus that should stay next to the element even when the user resizes the window or scrolls the page. Open the popup and resize the window — it will stay anchored to the button."
      }
    }
  },
  render: () => {
    const [open1, setOpen1] = useState(false)
    const popup1 = usePopup({
      open: open1,
      onOpenChange: setOpen1,
      trigger: ["click"],
      placement: "bottom-start",
      offset: 10
    })

    const [open2, setOpen2] = useState(false)
    const popup2 = usePopup({
      open: open2,
      onOpenChange: setOpen2,
      trigger: ["click"],
      placement: "bottom-start",
      offset: 10,
      autoUpdate: false
    })
    return (
      <div className={styles["story-root"]}>
        <div className={styles["controls-row"]}>
          <button type="button" ref={popup1.setTriggerRef} {...popup1.getTriggerProps()}>
            Auto-calc on
          </button>
          <button type="button" ref={popup2.setTriggerRef} {...popup2.getTriggerProps()}>
            Auto-calc off
          </button>
        </div>
        <Popup state={popup1.popupState}>
          <PopupCard
            title="autoUpdate (window scroll)"
            text="Position is recalculated when the window size changes, so the popup stays next to the trigger."
          />
        </Popup>
        <Popup state={popup2.popupState}>
          <PopupCard
            title="autoUpdate: false"
            text="Position is not recalculated when the window size changes, so the popup does not stay next to the trigger."
          />
        </Popup>
      </div>
    )
  }
}

export const AutoHideOnTriggerDisappearance: Story = {
  name: "Automatic hide when the trigger disappears",
  parameters: {
    docs: {
      description: {
        story:
          "Scroll does not always happen on the page — elements often live inside scrollable containers (tables, panels, lists). In those scenarios the popup should not stay visible if the trigger disappeared. This behavior is controlled by the `hideOnTriggerDisappearance` setting."
      }
    }
  },
  render: () => {
    const [open1, setOpen1] = useState(false)
    const [open2, setOpen2] = useState(false)

    const popup1 = usePopup({
      open: open1,
      onOpenChange: setOpen1,
      trigger: ["click"],
      placement: "bottom",
      offset: 10
    })
    const popup2 = usePopup({
      open: open2,
      onOpenChange: setOpen2,
      trigger: ["click"],
      placement: "bottom",
      offset: 10,
      size: {
        apply: ({ rects, elements }) => {
          elements.floating.style.width = `${rects.reference.width}px`
        }
      },
      hideOnTriggerDisappearance: {
        strategy: "referenceHidden"
      }
    })

    return (
      <div className={styles["story-root"]}>
        <div className={styles["hide-demo"]}>
          <div className={styles["hide-content"]}>
            <button type="button" ref={popup1.setTriggerRef} {...popup1.getTriggerProps()}>
              Auto-hide off
            </button>
            <button type="button" ref={popup2.setTriggerRef} {...popup2.getTriggerProps()}>
              Auto-hide on
            </button>
          </div>
        </div>

        <Popup state={popup1.popupState}>
          <PopupCard
            title="hideOnTriggerDisappearance: false"
            text="The popup stays visible even if the trigger disappeared."
          />
        </Popup>
        <Popup state={popup2.popupState}>
          <PopupCard
            title="hideOnTriggerDisappearance: true"
            text="The popup hides if the trigger disappeared."
          />
        </Popup>
      </div>
    )
  }
}

export const DismissOnOutsidePressAndEscape: Story = {
  name: "Dismiss on outside click and Escape",
  parameters: {
    docs: {
      description: {
        story:
          "For menus and tooltips, “natural” dismiss is usually expected: click outside the popup and the Escape key. This behavior can stay on by default, be disabled entirely (`isDismissEnabled: false`), or disabled selectively — outside click separately (`dismissOnOutsidePress`) and Escape separately (`dismissOnEscape`). Open both popups, then try clicking empty space and pressing Escape."
      }
    }
  },
  render: () => {
    const [openDefault, setOpenDefault] = useState(false)
    const popupDefault = usePopup({
      open: openDefault,
      onOpenChange: setOpenDefault,
      trigger: ["click"],
      placement: "bottom-start",
      offset: 10
    })

    const [openLocked, setOpenLocked] = useState(false)
    const popupLocked = usePopup({
      open: openLocked,
      onOpenChange: setOpenLocked,
      trigger: ["click"],
      placement: "bottom-start",
      offset: 10,
      isDismissEnabled: false
    })

    const [openNoEscape, setOpenNoEscape] = useState(false)
    const popupNoEscape = usePopup({
      open: openNoEscape,
      onOpenChange: setOpenNoEscape,
      trigger: ["click"],
      placement: "bottom-start",
      offset: 10,
      dismissOnEscape: false
    })

    return (
      <div className={styles["story-root"]}>
        <div className={styles["variants-grid"]}>
          <div className={styles["variant"]}>
            <button
              type="button"
              ref={popupDefault.setTriggerRef}
              {...popupDefault.getTriggerProps()}
            >
              Normal dismiss
            </button>
            <Popup state={popupDefault.popupState}>
              <PopupCard
                title="Dismiss enabled"
                text="Closes on outside click and Escape. This is usually the expected behavior."
              />
            </Popup>
          </div>

          <div className={styles["variant"]}>
            <button
              type="button"
              ref={popupLocked.setTriggerRef}
              {...popupLocked.getTriggerProps()}
            >
              Dismiss disabled
            </button>
            <Popup state={popupLocked.popupState}>
              <PopupCard
                title="isDismissEnabled: false"
                text="Does not close on outside click or Escape — useful for “pinned” panels."
              />
            </Popup>
          </div>

          <div className={styles["variant"]}>
            <button
              type="button"
              ref={popupNoEscape.setTriggerRef}
              {...popupNoEscape.getTriggerProps()}
            >
              Without Escape
            </button>
            <Popup state={popupNoEscape.popupState}>
              <PopupCard
                title="dismissOnEscape: false"
                text="Closes on outside click, but not on Escape (if that matters for your UX)."
              />
            </Popup>
          </div>
        </div>

        <div className={styles["outside-area"]}>
          Click here (outside the popup) to test dismiss on outside click.
        </div>
      </div>
    )
  }
}

export const ArrowUsage: Story = {
  name: "Arrow",
  parameters: {
    docs: {
      description: {
        story:
          "An arrow helps visually link the popup to the trigger. Enabled with `withArrow: true` in `usePopup`. Arrow position and rotation are calculated automatically from the final `placement` (including when the popup “flipped” due to collisions). The arrow itself is an SVG element whose details can be configured via `arrowOptions` on the `Popup` component (for example SVG size and styles)."
      }
    }
  },
  render: () => {
    const [openTopArrow, setOpenTopArrow] = useState(false)
    const popupTopArrow = usePopup({
      open: openTopArrow,
      onOpenChange: setOpenTopArrow,
      trigger: ["click"],
      placement: "top",
      offset: 12,
      withArrow: true,
      flip: true,
      shift: true
    })

    const [openRightArrow, setOpenRightArrow] = useState(false)
    const popupRightArrow = usePopup({
      open: openRightArrow,
      onOpenChange: setOpenRightArrow,
      trigger: ["click"],
      placement: "right-start",
      offset: 12,
      withArrow: true,
      flip: true,
      shift: true
    })

    return (
      <div className={styles["story-root"]}>
        <div className={styles["variants-grid"]}>
          <div className={styles["variant"]}>
            <button
              type="button"
              ref={popupTopArrow.setTriggerRef}
              {...popupTopArrow.getTriggerProps()}
            >
              Simple arrow
            </button>

            <Popup
              state={popupTopArrow.popupState}
              arrowOptions={{
                fill: "#ffffff",
                stroke: "#d0d7de",
                strokeWidth: 1,
                width: 14,
                height: 7
              }}
            >
              <PopupCard text="The arrow is rendered automatically and “moves” with the popup if the final placement changes due to collisions." />
            </Popup>
          </div>

          <div className={styles["variant"]}>
            <button
              type="button"
              ref={popupRightArrow.setTriggerRef}
              {...popupRightArrow.getTriggerProps()}
            >
              Configured arrow
            </button>

            <Popup
              state={popupRightArrow.popupState}
              arrowOptions={{
                fill: "#ffffff",
                stroke: "#0f172a",
                strokeWidth: 1,
                width: 22,
                height: 11
              }}
            >
              <PopupCard text="Same mechanism, but the arrow appearance can be configured." />
            </Popup>
          </div>
        </div>
      </div>
    )
  }
}

export const VirtualElement: Story = {
  name: "Virtual element: cursor and point-based “context menu”",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story:
          "A popup can be anchored not only to a DOM element, but also to a virtual point via `virtualReference`. This enables scenarios like a tooltip that follows the cursor, a context menu on click in an area, or binding to a text selection. Below are two variants: a popup that follows the cursor, and a popup that opens at the last click point."
      }
    }
  },
  render: () => {
    const [hoverOpen, setHoverOpen] = useState(false)
    const [cursorPoint, setCursorPoint] = useState({ x: 0, y: 0 })

    const cursorVirtualRef = useMemo<FloatingVirtualElement>(
      () => ({
        getBoundingClientRect: () =>
          ({
            x: cursorPoint.x,
            y: cursorPoint.y,
            left: cursorPoint.x,
            top: cursorPoint.y,
            right: cursorPoint.x,
            bottom: cursorPoint.y,
            width: 0,
            height: 0
          }) as DOMRect
      }),
      [cursorPoint]
    )

    const cursorPopup = usePopup({
      open: hoverOpen,
      onOpenChange: setHoverOpen,
      placement: "top",
      offset: 14,
      virtualReference: cursorVirtualRef,
      isDismissEnabled: false,
      autoUpdate: true
    })

    const [menuOpen, setMenuOpen] = useState(false)
    const [menuPoint, setMenuPoint] = useState({ x: 0, y: 0 })

    const menuVirtualRef = useMemo<FloatingVirtualElement>(
      () => ({
        getBoundingClientRect: () =>
          ({
            x: menuPoint.x,
            y: menuPoint.y,
            left: menuPoint.x,
            top: menuPoint.y,
            right: menuPoint.x,
            bottom: menuPoint.y,
            width: 0,
            height: 0
          }) as DOMRect
      }),
      [menuPoint]
    )

    const menuPopup = usePopup({
      open: menuOpen,
      onOpenChange: setMenuOpen,
      placement: "right-start",
      offset: 10,
      virtualReference: menuVirtualRef,
      dismissOnOutsidePress: true,
      dismissOnEscape: true
    })

    return (
      <div className={styles["page-scroll-root"]}>
        <div className={styles["mouse-variants"]}>
          <div
            className={styles["mouse-area"]}
            onMouseMove={(event) => setCursorPoint({ x: event.clientX, y: event.clientY })}
            onMouseEnter={() => setHoverOpen(true)}
            onMouseLeave={() => setHoverOpen(false)}
          >
            Hover and move the cursor
          </div>

          <Popup state={cursorPopup.popupState} portal={false}>
            <PopupCard
              title="Cursor as anchor"
              text="The popup follows the cursor. This is a virtual anchor: it exists only as coordinates."
            />
          </Popup>

          <div
            className={styles["mouse-area"]}
            onClick={(event) => {
              setMenuPoint({ x: event.clientX, y: event.clientY })
              setMenuOpen(true)
            }}
          >
            Click anywhere to open a “menu” at the click point
          </div>

          <Popup state={menuPopup.popupState} portal={false}>
            <PopupCard
              title="Click point"
              text="The popup opens at the chosen point. Dismiss — on outside click and Escape."
            />
          </Popup>
        </div>
      </div>
    )
  }
}
