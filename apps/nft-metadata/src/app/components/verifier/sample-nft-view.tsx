import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { retrieveMetadataInformation, getNFTsInAccount, getAreLinksSetup, getNFTInAccount } from "../../../flow/utils"
import { Accordian } from "../shared/accordian";
import { Alert } from "../shared/alert";
import { Spinner } from "../shared/spinner";
import { GenericView } from "../shared/views/generic-view";
import { CollectionDisplayView } from "../shared/views/collection-display-view";
import { DisplayView } from "../shared/views/display-view";
import { CollectionDataView } from "../shared/views/collection-data-view";
import { SubmitButton } from "../shared/submit-button";
import * as fcl from "@onflow/fcl"

export function SampleNFTView({
  sampleAddress,
  publicPath,
  nftID
}: {
  sampleAddress: string | null,
  publicPath: string | null,
  nftID: string | null
}) {
  const navigate = useNavigate()
  const { selectedContract } = useParams<any>()
  const [ownedNFTs, setOwnedNFTs] = useState<any>(null)
  const [viewsImplemented, setViewsImplemented] = useState<any>([]);
  const [uniqueCollections, setUniqueCollections] = useState<any>(null)
  const [viewData, setViewData] = useState<{ [key: string]: Object }>({});
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getMetadataConformity = async () => {
      if (!sampleAddress || !publicPath) { return }
      setLoading(true)
      setError(null)
      const metadataConformities = await retrieveMetadataInformation(sampleAddress, publicPath);
      if (!metadataConformities) {
        const user = await fcl.currentUser().snapshot()
        if (user.loggedIn && sampleAddress === user.addr) {
          const linksSetup = await getAreLinksSetup(user.addr as unknown as string, publicPath)
          // TODO: Implement one-off new public path linking to metadataviews for the case where the
          // logged in user might be able to fix it themself.
        }
        setError("Failed to retrieve metadata")
      } else {
        const hasInvalidViews = Object.values(metadataConformities).filter((conforms) => {
          return !conforms
        }).length > 0
        if (hasInvalidViews) {
          setViewsImplemented(metadataConformities)
        } else {
          const allNFTs = await getNFTsInAccount(sampleAddress, publicPath);
          setOwnedNFTs(allNFTs)
          const uniqueCollections: any = {}
          allNFTs.forEach((nft: any, i: number) => {
            const id = nft.Id
            const key = nft && nft.NFTCollectionDisplay ? nft.NFTCollectionDisplay.collectionName : null
            if (key) {
              uniqueCollections[key] = {
                index: i,
                id: id
              }
            }
          })
          if (Object.keys(uniqueCollections).length > 1 && !nftID) {
            // We have more than one unique collection, we must prompt the user to select the right collection
            setUniqueCollections(uniqueCollections)
            setViewsImplemented(metadataConformities)
          } else {
            if (nftID) {
              console.log('allNFTs', allNFTs)
              setUniqueCollections(null)
              navigate(`${window.location.pathname}${window.location.search.replace(/&nftID=.*/, '')}&nftID=${nftID}`)
              setViewsImplemented(metadataConformities)
              const res = allNFTs.find((nft: { Id: string }) => {
                return nft.Id === nftID
              })
              if (res) {
                setViewData(res)
              } else {
                setError("The given ID does not exist in the account")
              }
            } else {
              // We have just one possible collection from this account, so we can take any to be set as the query param
              const selectedNftID = (Object.values(uniqueCollections)[0] as any).id
              const nftIndex = (Object.values(uniqueCollections)[0] as any).index
              navigate(`${window.location.pathname}${window.location.search.replace(/&nftID=.*/, '')}&nftID=${selectedNftID}`)
              setViewsImplemented(metadataConformities)
              setViewData(allNFTs[nftIndex])
            }
          }
        }
      }
      setLoading(false)
    }
    getMetadataConformity()
  }, [sampleAddress, publicPath, nftID])

  let invalidViews: any = []

  const accordianItems = Object.keys(viewsImplemented).map((item) => {
    let title = item;
    let content = <div>Failed to load details</div>
    if (item.indexOf('MetadataViews.Royalties') >= 0) {
      title = 'Royalties View'
      content = viewData["Royalties"] ?
        <GenericView view={viewData["Royalties"]} />
        :
        <div>No royalties view was found.</div>
    } else if (item.indexOf('MetadataViews.Display') >= 0) {
      title = 'Display View'
      content = viewData["Display"] ?
        <DisplayView view={viewData["Display"]} />
        :
        <div>No display view was found.</div>
    } else if (item.indexOf('MetadataViews.NFTCollectionData') >= 0) {
      title = 'NFT Collection Data View';
      content = viewData["NFTCollectionData"] ?
        <CollectionDataView view={viewData["NFTCollectionData"]} withRawView={false} />
        :
        <div>No NFT Collection Data view was found.</div>
    } else if (item.indexOf('MetadataViews.NFTCollectionDisplay') >= 0) {
      title = 'NFT Collection Display View';
      content = viewData["NFTCollectionDisplay"] ?
        <CollectionDisplayView view={viewData["NFTCollectionDisplay"]} withRawView={true} />
        :
        <div>No NFT Display view was found.</div>
    } else if (item.indexOf('MetadataViews.ExternalURL') >= 0) {
      title = 'External URL View';
      content = viewData["ExternalURL"] ?
        <GenericView view={viewData["ExternalURL"]} />
        :
        <div>No ExternalURL view was found.</div>
    }
    if (!viewsImplemented[item]) {
      invalidViews.push(title)
    }
    return {
      isValid: viewsImplemented[item],
      title: title,
      content: content
    }
  })

  return (
    <>
      <div className="text-h1 mb-6 max-w-full overflow-hidden text-ellipsis !text-2xl md:!text-4xl">Review Metadata</div>
      {loading && <Spinner />}
      {
        error &&
        <Alert
          status="error"
          title="Failed to retrieve sample NFT"
          body={
            <>
              We were unable to retrieve the MetadataViews.ResolverCollection capability from the public path and address provided.
              Ensure your setup transactions link the MetadataViews.ResolverCollection interface on the given public path.
            </>
          }
        />
      }
      {
        !error && uniqueCollections &&
        <>
          We found NFTs from with different collection names within the selected account. Which collection would you like to continue with?
          <div>
            <br />
            {
              Object.keys(uniqueCollections).map((key) => {
                return (
                  <React.Fragment key={key}>
                    <a
                      className="cursor-pointer text-blue-500 hover:underline"
                      onClick={() => {
                        navigate(`${window.location.pathname}${window.location.search.replace(/&nftID=.*/, '')}&nftID=${uniqueCollections[key].id}`)
                      }}
                    >
                        {key}
                    </a>
                    <br/>
                  </React.Fragment>
                )
              })
            }
          </div>
        </>
      }
      {
        !error && !uniqueCollections &&
        <>
          <Accordian items={accordianItems} />
          {
            invalidViews.length > 0 && (
              <div className="mt-8">
                You have not implemented all recommended metadata views required to be added to the NFT catalog.
                <br />
                <br />
                Please implement the following views in your contract to continue:
                <ul>
                  {
                    invalidViews.map((view: any) => {
                      return <li className="font-semibold my-2" key={view}>* {view}</li>
                    })
                  }
                </ul>
              </div>
            )
          }

          <br />

          {
            !loading && invalidViews.length === 0 && (
              <>
                <p>This NFT contract, <b>{selectedContract}</b>, is implementing all of the recommended views!</p>
                <p>Review the metadata details above. If they look good, click continue to add or update this collection in the NFT Catalog.</p>
                <br />
                <form
                  onSubmit={() => { navigate(`${window.location.pathname}${window.location.search}&confirmed=true`) }}
                >
                  <SubmitButton value="Continue" />
                </form>
              </>
            )
          }
        </>
      }
    </>
  )
}