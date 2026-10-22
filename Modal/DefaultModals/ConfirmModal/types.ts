// Types
import type { ReactNode } from "react"
import type { ModalInjectedProps } from "../../Core/types"

/** Public confirm props for useModal('confirm').open(props) */
export interface ConfirmModalProps {
  /** Title */
  title?: ReactNode
  /** Text */
  message: ReactNode
  /** Confirm label */
  confirmLabel?: string
  /** Cancel label */
  cancelLabel?: string
  /** Confirm callback */
  onConfirm?: () => void
  /** Cancel callback */
  onCancel?: () => void
}

/** Full confirm component props in the stack */
export type ConfirmModalComponentProps = ConfirmModalProps & ModalInjectedProps
