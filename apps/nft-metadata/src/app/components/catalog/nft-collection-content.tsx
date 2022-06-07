import { useEffect, useState } from "react"
import { getCollections } from "src/flow/utils"
import { NFTCollectionDisplay } from "../shared/nft-collection-display"
import { Spinner } from "../shared/spinner"
import { EmptyContent } from "./empty-content"
import { Box } from "../shared/box"
import { CollectionDataView } from "../shared/views/collection-data-view"
import { CollectionDisplayView } from "../shared/views/collection-display-view"

export function NftCollectionContent({collectionName}: {collectionName: string|undefined}) {
  const [collectionData, setCollectionData] = useState<any>()
  const [error, setError] = useState<string|null>(null)

  useEffect(() => {
    setCollectionData(null)
    setError(null)
    if (!collectionName) { return }
    const setup = async () => {
      const res = await getCollections();
      const collection = res[collectionName]
      if (res) {
        setCollectionData(collection)
      } else {
        setError(`Unable to find a catalog entry with name ${collectionName}`)
      }
    }
    setup()
  }, [collectionName])

  if (!collectionName) {
    return <EmptyContent />
  }

  if (!collectionData) {
    return <Spinner />
  }
  console.log('collection data', collectionData)
  return (
    <>
      <CollectionDisplayView view={collectionData.collectionDisplay} withRawView={false} />
      <br />
      <CollectionDataView view={collectionData.collectionData} withRawView={false} />
    </>
  )
}