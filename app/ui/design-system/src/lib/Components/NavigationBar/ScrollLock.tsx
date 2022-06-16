import { useEffect } from "react"

/**
 * Prevents the main HTML document from scrolling when this hook is active.
 */
export const useScrollLock = (
  documentElement: HTMLElement = document?.documentElement
) => {
  useEffect(() => {
    if (!documentElement) {
      return
    }

    const originalOverflow = documentElement.style.overflow
    const originalPaddingRight = documentElement.style.paddingRight

    // If a scrollbar is being rendered then we'll add some padding to replace
    // the space it took up while we disable scrolling.
    const windowElement = documentElement?.ownerDocument?.defaultView || window
    const originalScrollbarWidth = windowElement
      ? windowElement.innerWidth - documentElement.clientWidth
      : undefined

    documentElement.style.overflow = "hidden"

    if (originalScrollbarWidth) {
      const currentScrollbarWidth =
        documentElement.clientWidth - documentElement.offsetWidth
      const scrollbarWidthDiff = originalScrollbarWidth - currentScrollbarWidth
      documentElement.style.paddingRight = `${scrollbarWidthDiff}px`
    }

    return () => {
      documentElement.style.overflow = originalOverflow
      documentElement.style.paddingRight = originalPaddingRight
    }
  }, [documentElement])
}

export const ScrollLock = () => {
  useScrollLock()
  return null
}
