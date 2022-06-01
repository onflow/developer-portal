import { useEffect, useState } from "react"
import { NFTCollectionDisplay } from "../shared/nft-collection-display"
import { Spinner } from "../shared/spinner"
import { EmptyContent } from "./empty-content"

export function NftCollectionContent({collectionName}: {collectionName: string|undefined}) {
  const [collectionData, setCollectionData] = useState<any>()

  useEffect(() => {
    // TODO: Make call to retrieve this collection's information from the catalog
    setCollectionData({})
  }, [collectionName])

  if (!collectionName) {
    return <EmptyContent />
  }

  if (!collectionData) {
    return <Spinner />
  }
  return (
    <>
      <NFTCollectionDisplay
        display={{
          name: "Schmoes Prelaunch Token",
          externalURL: "https://schmoes.io",
          description: 'Description can go here. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nec vehicula felis. Donec non elit justo. Duis at maximus purus, vel auctor justo. Pellentesque a leo ligula. Curabitur mattis vel tellus elementum placerat. Morbi volutpat maximus volutpat. Sed tincidunt, velit imperdiet sagittis mollis, nulla felis efficitur libero, quis suscipit est metus non lectus. Proin diam turpis, blandit facilisis pulvinar vel, mollis ac justo.',
          socials: {
            'twitter': 'https://twitter.com/SchmoesNFT'
          }
        }}
        
      />
    </>
  )
}