import { createContext } from "react"
import { InternalUrlContextValue } from "../InternalUrlContext"

export const InternalSidebarUrlContext = createContext<InternalUrlContextValue>(
  {}
)
