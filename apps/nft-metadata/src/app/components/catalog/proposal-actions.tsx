import * as fcl from "@onflow/fcl"
import { SocketAddress } from "net"
import { useEffect, useState } from "react"
import { useCurrentUser } from "src/app/hooks/use-current-user"
import { getAccountHasAdminProxy, getIsAdmin } from "src/flow/utils"

export function ProposalActions({}: {}) {
  const [address, setAddress] = useState<string|null>(null)
  const [hasAdminProxy, setHasAdminProxy] = useState<boolean>(false)
  const [isAdmin, setIsAdmin] = useState<boolean>(false)
  const [forceState, setForceState] = useState<number>(0)


  useEffect(() => {
    const setup = async () => {
      if (address) {
        const hasAdminProxy = await getAccountHasAdminProxy(address)
        const isAdmin = await getIsAdmin(address)
        setHasAdminProxy(hasAdminProxy)
        setIsAdmin(isAdmin)
      }
    }
    setup()
  }, [address])


  useEffect(() => {
    const setupUser = async () => {
      const user = await fcl.currentUser().snapshot()
      const userAddress = user && user.addr ? user.addr : null
      setAddress(userAddress)
    }
    setupUser()
  }, [forceState])
  
  const loggedIn = address !== null

  if (!loggedIn) {
    return (
      <>
        <a className="cursor-pointer" onClick={() => {fcl.logIn()}}>Log In</a>
      </>
    )
  }
  return (
    <>
      isAdmin: {isAdmin}
      <br />
      hasProxy: {hasAdminProxy}
    </>
  )
}