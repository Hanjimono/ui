// Types
import type { TitleProps } from "../../Presentation/Title/types"

/** Modal header props */
export interface ModalHeaderProps extends TitleProps {
  /** Show the close button and call this callback on click */
  onClose?: () => void
  /** Extra class for the header row */
  className?: string
  /** Extra class for the title */
  titleClassName?: string
}
