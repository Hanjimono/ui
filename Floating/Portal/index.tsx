"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import type { PortalProps } from "./types"

/**
 * Universal portal component.
 * Can be used outside the Floating system as well.
 *
 * @param children - Content to render through the portal.
 * @param container - Custom container; if omitted, `document.body` is used.
 * @returns Portaled React node, or `null` until client mount.
 */
export default function Portal({ children, container }: PortalProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  const targetContainer = container ?? document.body
  if (!targetContainer) {
    return null
  }

  return createPortal(children, targetContainer)
}
