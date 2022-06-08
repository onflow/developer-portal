import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getCollections, getProposals } from "src/flow/utils"
import { Network } from "./network-dropdown";
import { changeFCLEnvironment } from "src/flow/setup";

export function CatalogSelect({
  type,
  network,
  selected
}: {
  type: "Catalog" | "Proposals",
  network: Network
  selected: string | undefined
}) {
  const navigate = useNavigate()
  const [items, setItems] = useState<null | Array<any>>(null)
  const loading = !items

  useEffect(() => {
    const setup = async () => {
      if (network === 'mainnet') {
        // TODO: Remove this once deployed to mainnet
        setItems([]);
        return;
      }
      changeFCLEnvironment(network);
      // retrieve list of proposals or 
      if (type === 'Proposals') {
        const proposals = await getProposals()
        const items = Object.keys(proposals).map((proposalID) => {
          const proposal = proposals[proposalID]
          return {
            name: `#${proposalID} - ${proposal.collectionName}`,
            subtext: `Created ${(new Date(proposal.createdTime * 1000)).toLocaleDateString("en-US")}`,
            id: proposalID,
            status: proposal.status
          }
        })
        setItems(items)
      } else if (type === 'Catalog') {
        const catalogCollections = await getCollections()
        const items = Object.keys(catalogCollections).map((catalogKey) => {
          const catalog = catalogCollections[catalogKey]
          return {
            name: `${catalogKey}`,
            subtext: `${catalog.nftType}`,
            id: catalogKey,
          }
        })
        setItems(items)
      }
    }
    setup()
  }, [type, network])

  return (
    <a className="border-t-1 my-4">
      {
        items && items.map((item, i) => {
          const selectedStyle = selected && item.id === selected ? 'border-x-blue-500 border-l-4' : ''
          return (
            <div key={i} className={`flex-col p-8 hover:bg-gray-300 cursor-pointer border-t-2 text-left ${selectedStyle}`} onClick={
              () => {
                navigate(type === 'Proposals' ? `/proposals/${network}/${item.id}` : `/catalog/${network}/${item.id}`)
              }
            }>
              <div className="font-semibold">{item.name}</div>
              <div>{item.status}</div>
              <div className="">{item.subtext}</div>
            </div>
          )
        })
      }

      {
        loading && [0, 0, 0, 0, 0, 0, 0, 0, 0].map((item, i) => {
          return (
            <div key={i} className={`flex-col p-8 cursor-pointer border-t-2`}>
              <div className="font-semibold">{" "}</div>
              <div className="">{" "}</div>
            </div>
          )
        })
      }
    </a>
  )
}