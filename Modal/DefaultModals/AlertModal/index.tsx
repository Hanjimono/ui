"use client"

// System
import { useId } from "react"

// UI
import Button from "../../../Action/Button"
import { Inline, Stack } from "../../../Layout/Responsive"
import Text from "../../../Presentation/Text"
import ModalBody from "../../ModalBody"
import ModalContent from "../../ModalContent"
import ModalHeader from "../../ModalHeader"

// Types
import type { AlertModalComponentProps } from "./types"
import { cn } from "../../../Utils/cn"

/**
 * Simplest modal: a message and a single button.
 *
 * @param title - Title
 * @param message - Message text
 * @param confirmLabel - Button label
 * @param titleId - Title id for aria-labelledby
 * @param descriptionId - Message id for aria-describedby
 * @param close - Close from ModalProvider
 */
export default function AlertModal({
  title,
  message,
  confirmLabel = "OK",
  titleId: titleIdProp,
  descriptionId: descriptionIdProp,
  close
}: AlertModalComponentProps) {
  const generatedTitleId = useId()
  const generatedDescriptionId = useId()
  const titleId = titleIdProp ?? generatedTitleId
  const descriptionId = descriptionIdProp ?? generatedDescriptionId

  return (
    <ModalContent
      className={cn(
        "w-full max-w-modal-alert-max-width min-w-modal-alert-min-width"
      )}
    >
      {title && <ModalHeader id={titleId}>{title}</ModalHeader>}
      <ModalBody>
        <Stack gap="md">
          <Text id={descriptionId} size="s">
            {message}
          </Text>
          <Inline gap="sm" className="justify-end">
            <Button type="button" onClick={close}>
              {confirmLabel}
            </Button>
          </Inline>
        </Stack>
      </ModalBody>
    </ModalContent>
  )
}
