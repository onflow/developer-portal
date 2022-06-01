import { useParams } from "react-router-dom";
import { CatalogSelect } from "./catalog-select";
import { Filter } from "./filter";
import { NftCollectionContent } from "./nft-collection-content";
import { ProposalContent } from "./proposal-content";

export default function Layout({
  type
}: {
  type: "Catalog" | "Proposals",
}) {
  const { identifier } = useParams()

  return (
    <div className="mx-auto px-0 md:px-16 lg:px-64 pt-4">
      <div className="text-2xl sm:border-0 md:border-b-2 py-4">
        NFT {type}
      </div>
      <div
        className="flex w-full h-full items-center text-center bg-white rounded-2xl dark:bg-primary-dark-gray sm:flex-col md:flex-row"
      >
        <div className="flex-1 border-accent-light-gray sm:border-0 md:border-r-2">
          <div className="flex-col">
            <Filter />
            <CatalogSelect type={type} selected={identifier} />
          </div>
        </div>
        <div className="px-10 w-3/4">
          {
            type === 'Proposals' && <ProposalContent proposalID={identifier} />
          }
          {
            type === 'Catalog' && <NftCollectionContent collectionName={identifier} />
          }
        </div>
      </div>
    </div>
  )
}
