// Types
import type { ReactNode } from "react"
import type { ModalInjectedProps } from "../../Core/types"

/** Public alert props for useModal('alert').open(props) */
export interface AlertModalProps {
  /** Title */
  title?: ReactNode
  /** Message text */
  message: ReactNode
  /** OK button label */
  confirmLabel?: string
}

/** Full alert component props in the stack */
export type AlertModalComponentProps = AlertModalProps & ModalInjectedProps
