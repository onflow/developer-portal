import { useCallback, useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { NetworkDropDown, Network } from "./network-dropdown";
import { CatalogSelect } from "./catalog-select";
import { Filter } from "./filter";
import { NftCollectionContent } from "./nft-collection-content";
import { ProposalContent } from "./proposal-content";
import { useNavigate } from "react-router-dom"

type CatalogParams = {
  network: Network;
  identifier: string;
};

export default function Layout({
  type
}: {
  type: "Catalog" | "Proposals",
}) {
  const { network = 'testnet', identifier } = useParams<CatalogParams>()

  const navigate = useNavigate()

  const onNetworkChange = useCallback((network: Network) => {
    navigate(type === 'Proposals' ? `/proposals/${network}` : `/catalog/${network}`)
  }, [])

  return (
    <div className="mx-auto px-0 md:px-4 lg:px-32 pt-4">
      <div className="text-2xl sm:border-0 md:border-b-2 py-4">
        {type === 'Proposals' ? 'NFT Catalog Addition/Update Proposals' : 'NFT Catalog'}
      </div>
      <div
        className="flex w-full h-full items-center text-center bg-white rounded-2xl dark:bg-primary-dark-gray sm:flex-col md:flex-row"
      >
        <div className="flex-1 border-accent-light-gray sm:border-0 md:border-r-2 self-start">
          <div className="flex-col">
            <Filter />
            <NetworkDropDown network={network} onNetworkChange={onNetworkChange} />
            <CatalogSelect type={type} selected={identifier} network={network} />
          </div>
        </div>
        <div className="px-10 w-3/4 self-start py-10 justify-self-start text-left">
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