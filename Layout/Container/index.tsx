import { cn } from "../../Utils/cn"
import { ContainerProps, ContainerVariant } from "./types"

const baseClassName = "box-border mx-auto max-w-full p-0"

const typeClassNames: Record<ContainerVariant, string> = {
  fluid: "w-full",
  responsive: [
    "w-(--container-max)",
    "max-xxl:w-(--container-xxl)",
    "max-xl:w-(--container-xl)",
    "max-lg:w-(--container-lg)",
    "max-md:w-(--container-md)",
    "max-sm:w-full"
  ].join(" ")
}

/**
 * Container that adjusts content width based on viewport size
 *
 * @param {React.ReactNode} children - Content inside the container
 * @param {string} className - Extra CSS classes
 * @param {ContainerVariant} type - Container type. responsive — fixed adaptive width; fluid — full viewport width
 */
const Container = ({ children, className, type = "responsive", ...props }: ContainerProps) => {
  return (
    <div className={cn(baseClassName, typeClassNames[type], className)} {...props}>
      {children}
    </div>
  )
}

export default Container
