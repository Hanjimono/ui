"use client"

// UI
import Button from "../../Action/Button"
import resolvedUiConfig from "../../Config/uiConfig"
import { Inline } from "../../Layout/Responsive"
import Title from "../../Presentation/Title"
import { cn } from "../../Utils/cn"

// Types
import type { ModalHeaderProps } from "./types"

const UI_CONFIG = resolvedUiConfig

/**
 * Modal header.
 * Title text and an optional close button.
 *
 * @param onClose - Close callback
 * @param className - Extra class for the header row
 * @param titleClassName - Extra class for the title
 * @param as - Title HTML tag
 * @param children - Title text
 */
export default function ModalHeader({
  onClose,
  className,
  titleClassName,
  as,
  children,
  ...titleProps
}: ModalHeaderProps) {
  const titleAs = as ?? UI_CONFIG.modalHeaderTitleAs
  const closeIcon = UI_CONFIG.modalHeaderCloseIcon

  return (
    <div
      className={cn("pt-modal-content-pad px-modal-content-pad pb-0", className)}
      data-modal-header=""
    >
      <Inline className="justify-between items-start w-full">
        <Title
          {...titleProps}
          as={titleAs}
          className={cn("flex-1 min-w-0 m-0", titleClassName)}
        >
          {children}
        </Title>
        {onClose && (
          <Button
            type="button"
            variant="icon"
            theme="secondary"
            icon={{
              ...closeIcon,
              className: cn(
                "text-text-default hover:opacity-80",
                closeIcon.className
              )
            }}
            width="narrow"
            shadow="no-shadow"
            onClick={onClose}
            aria-label="Close"
          />
        )}
      </Inline>
    </div>
  )
}
