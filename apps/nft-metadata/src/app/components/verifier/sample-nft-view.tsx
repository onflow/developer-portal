import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { retrieveMetadataInformation } from "../../../flow/utils"
import { Accordian } from "../shared/accordian";

export function SampleNFTView({
  sampleAddress,
  publicPath
}: {
  sampleAddress: string|null,
  publicPath: string|null,
}) {
  const history = useHistory()
  const [viewsImplemented, setViewsImplemented] = useState<any>([]);
  const [error, setError] = useState<boolean|null>(null);

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
    }
    metadataViewInformation()
  }, [sampleAddress, publicPath])

  if (!sampleAddress || !publicPath) {
    return null;
  }

  let invalidViews: any = []

  const accordianItems = Object.keys(viewsImplemented).map((item) => {
    let title = item;
    let content = <div>content</div>
    if (item.indexOf('MetadataViews.Royalties') >= 0) {
      title = 'Royalties View'
      content = <div>royalties</div>
    } else if (item.indexOf('MetadataViews.Display') >= 0) {
      title = 'Display View'
      content = <div>display</div>
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
      {error && <p>It seems the sample NFT account is not linked properly, we weren't able to retrieve the metadataviews link from the public path.</p>}
      {
        !error &&
          <>
            <Accordian items={accordianItems} />
            {
              invalidViews.length > 0 && (
                <div className="mt-8">
                  You have not implemented all recommended views required to be added to the NFT catalog.
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
              invalidViews.length === 0 && (
                <>
                  <p>Review the metadata details above, if they</p>
                  <button
                    className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                    onClick={(e) => { history.push(`${window.location.pathname}${window.location.search}&confirmed=true`)
                  }}>
                    Continue
                  </button>
                </>
              )
            }
          </>
      }
    </>
  )
}