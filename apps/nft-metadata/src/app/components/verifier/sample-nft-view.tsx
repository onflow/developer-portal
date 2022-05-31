import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { retrieveMetadataInformation } from "../../../flow/utils"
import { Accordian } from "../shared/accordian";
import { Alert } from "../shared/alert";
import { Spinner } from "../shared/spinner";
import { Button } from "../shared/button";

export function SampleNFTView({
  sampleAddress,
  publicPath
}: {
  sampleAddress: string|null,
  publicPath: string|null,
}) {
  const history = useHistory()
  const { selectedAddress, selectedContract } = useParams()
  const [viewsImplemented, setViewsImplemented] = useState<any>([]);
  const [error, setError] = useState<boolean|null>(null);
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const metadataViewInformation = async () => {
      setError(false)
      if (!publicPath || !sampleAddress) { return }
      const res = await retrieveMetadataInformation(sampleAddress, publicPath)
      if (!res) {
        setError(true)
        setViewsImplemented([])
      } else {
        setViewsImplemented(res);
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
      content = <div>Royalties details here</div>
    } else if (item.indexOf('MetadataViews.Display') >= 0) {
      title = 'Display View'
      content = <div>Display details here</div>
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
      <div className="text-2xl mb-6">Review Metadata</div>
      { loading && <Spinner /> }
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
                    onSubmit={() => { history.push(`${window.location.pathname}${window.location.search}&confirmed=true`)}}
                  >
                    <Button value="Continue"/>
                  </form>
                </>
              )
            }
          </>
      }
    </>
  )
}