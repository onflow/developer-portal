import * as fcl from "@onflow/fcl"
import { useEffect } from "react"
import { useCurrentUser } from "src/app/hooks/use-current-user"

export function ProposalActions({}: {}) {
  const [user, loggedIn] = useCurrentUser()

  useEffect(() => {
    
  }, [loggedIn])

  if (!loggedIn) {
    return (
      <>
        <a className="cursor-pointer" onClick={() => {fcl.logIn()}}>Log In</a>
      </>
    )
  }
  return (
    <>
      
    </>
  )
}