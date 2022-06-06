import * as fcl from "@onflow/fcl"
import { SocketAddress } from "net"
import { useEffect, useState } from "react"
import { useCurrentUser } from "src/app/hooks/use-current-user"
import { createAdminProxy, getAccountHasAdminProxy, getIsAdmin } from "src/flow/utils"

export function ProposalActions({ proposer }: {proposer: string|undefined}) {
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
        <a
          className="cursor-pointer"
          onClick={async () => {
            await fcl.logIn()
            setForceState(forceState + 1)
          }}
        >
          Log In
        </a>
      </>
    )
  }

  const buttons: Array<any> = []
  
  if (address !== null && proposer === address) {
    buttons.push(
      <button key="delete">
        Delete Proposal
      </button>
    )
  }

  if (!hasAdminProxy) {
    buttons.push(
      <button key="setup" onClick={async () => {
        await createAdminProxy()
        setForceState(forceState + 1)
      }}>
        Create Admin Proxy
      </button>
    )
  }
  if (isAdmin) {
    buttons.push(
      <button key="accept">
        Accept Proposal
      </button>
    )
    buttons.push(
      <button key="reject">
        Reject Proposal
      </button>
    )
  }

  return (
    <>
      {
        buttons.map((b) => {
          return b
        })
      }
      {
        buttons.length === 0 && (
          <>
            Logged in as {address}
            <br />
            You must be the creator of this proposal or an admin to take any actions.
          </>
        )
      }
    </>
  )
}