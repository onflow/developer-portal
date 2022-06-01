import { EmptyContent } from "./empty-content"

export function NftCollectionContent({collectionName}: {collectionName: string|undefined}) {
  if (!collectionName) {
    return <EmptyContent />
  }
  return <div>NFT Collection content</div>
}