import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { retrieveMetadataInformation, getNFTInAccount, getAreLinksSetup } from "../../../flow/utils"
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
  publicPath
}: {
  sampleAddress: string | null,
  publicPath: string | null,
}) {
  const navigate = useNavigate()
  const { selectedNetwork, selectedAddress, selectedContract } = useParams<any>()
  const [viewsImplemented, setViewsImplemented] = useState<any>([]);
  const [viewData, setViewData] = useState<{ [key: string]: Object }>({});
  const [error, setError] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    const metadataViewInformation = async () => {
      setError(false)
      if (!publicPath || !sampleAddress) { return }
      const res = await retrieveMetadataInformation(sampleAddress, publicPath);
      let nftData = null;
      if (res) {
        nftData = await getNFTInAccount(sampleAddress, publicPath);
      }
      if (!res || !nftData) {
        const user = await fcl.currentUser().snapshot()
        if (user.loggedIn) {
          const linksSetup = await getAreLinksSetup(user.addr as unknown as string, publicPath)
          console.log('links setup is', linksSetup);
        }
        setError(true)
        setViewsImplemented([])
        setViewData({});
      } else {
        setViewsImplemented(res);
        setViewData(nftData);
      }
      setLoading(false)
    }
    metadataViewInformation()
  }, [sampleAddress, publicPath])

  if (!sampleAddress || !publicPath) {
    return null;
  }

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
        !error &&
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