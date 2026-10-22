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
import type { ConfirmModalComponentProps } from "./types"
import { cn } from "../../../Utils/cn"

/**
 * Modal with confirm and cancel actions.
 *
 * @param title - Title
 * @param message - Message text
 * @param confirmLabel - Confirm button label
 * @param cancelLabel - Cancel button label
 * @param onConfirm - Confirm callback
 * @param onCancel - Cancel callback
 * @param close - Close from ModalProvider
 */
export default function ConfirmModal({
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  titleId: titleIdProp,
  descriptionId: descriptionIdProp,
  close
}: ConfirmModalComponentProps) {
  const generatedTitleId = useId()
  const generatedDescriptionId = useId()
  const titleId = titleIdProp ?? generatedTitleId
  const descriptionId = descriptionIdProp ?? generatedDescriptionId

  const handleConfirm = () => {
    onConfirm?.()
    close()
  }

  const handleCancel = () => {
    onCancel?.()
    close()
  }

  return (
    <ModalContent className={cn("w-full max-w-modal-confirm-max-width")}>
      {title && <ModalHeader id={titleId}>{title}</ModalHeader>}
      <ModalBody>
        <Stack gap="md">
          <Text id={descriptionId} size="s">
            {message}
          </Text>
          <Inline gap="sm" className="justify-end">
            <Button type="button" theme="secondary" onClick={handleCancel}>
              {cancelLabel}
            </Button>
            <Button type="button" onClick={handleConfirm}>
              {confirmLabel}
            </Button>
          </Inline>
        </Stack>
      </ModalBody>
    </ModalContent>
  )
}
