import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextInput } from '../shared/text-input';
import { withPrefix } from '@onflow/fcl';

export function SampleNFTPrompt({
  contractCode,
  defaultValues,
  setError
}: {
  contractCode: string,
  defaultValues: any,
  setError: any
}) {
  const navigate = useNavigate()
  const [publicPath, setPublicPath] = useState<string>(defaultValues.publicPath || "")
  const [sampleAddress, setSampleAddress] = useState<string>(defaultValues.sampleAddress || "")
  const possiblePublicPaths: Array<string> = contractCode.match(/\/public\/[A-Za-z0-9]*/gmi) || []

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      if (publicPath.indexOf("/public/") !== 0) {
        setError("The public path must include the /public/ prefix")
        return false
      }
      if (withPrefix(sampleAddress).length !== 18) {
        setError("The provided address is not valid ")
        return false
      }
      navigate({
        pathname: window.location.pathname,
        search: `?path=${publicPath}&sampleAddress=${sampleAddress}`
      })
      return false;
    }}>
      <p></p>
      <b>Enter the public path your NFT collection uses</b>
      {
        possiblePublicPaths.length > 0 &&
          <>
            <p className="text-xs">We found some possible paths from your contract, you may click one to autofill</p>
            {
              possiblePublicPaths.map((path) => {
                return (
                  <a
                    className="bg-blue-100 hover:bg-blue-200 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 dark:hover:bg-blue-300 cursor-pointer"
                    key={path}
                    onClick={() => setPublicPath(path)}
                  >
                    {path}
                  </a>
                )
              })
            }
          </>
      }
      <p></p>
      <TextInput
        value={publicPath}
        updateValue={setPublicPath}
        placeholder="e.g. /public/MomentsCollection"
      />
      <br />
      <b>Enter an account address that holds this NFT</b>
      <TextInput
        value={sampleAddress}
        updateValue={setSampleAddress}
        placeholder="e.g. 0x123456abcdef"
      />
      <br />
      <input
        type="submit"
        value={"Continue"}
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
      />


      <br />
      {/*
        <p>Sample account w/ a testnet topshot NFT: <a onClick={() => { setSampleAddress("0xd80d84b4b0a88782") }}>0xd80d84b4b0a88782</a></p>
        <p>Sample account w/ a testnet goatedgoat NFT: <a onClick={() => { setSampleAddress("0xe27bf406ede951f7") }}>0xe27bf406ede951f7</a></p>
      */}
    </form>
  )
}