import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { retrieveMetadataInformation } from "../../../flow/utils"

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
  return (
    <>
      {error && <p>It seems the sample NFT account is not linked properly, we weren't able to retrieve the metadataviews link from the public path.</p>}
      {
        !error &&
          <>
            {JSON.stringify(viewsImplemented, null, 4)}
            <br />
            <button onClick={(e) => { history.push(`${window.location.pathname}${window.location.search}&confirmed=true`) }}>
              Looks good!
            </button>
          </>
      }
    </>
  )
}