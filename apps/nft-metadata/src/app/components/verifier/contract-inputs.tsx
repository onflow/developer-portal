import { Fragment, useEffect, useState } from "react"
import { getAccount, retrieveContractInformation, retrieveMetadataInformation } from "../../../flow/utils"
import { useInput } from "../../hooks/use-input"
import { useHistory, useParams } from "react-router-dom"
import { useQuery } from '../../hooks/use-query';

function ContractSelect({
  contracts,
  selectContract
}: {
  contracts: { string: string },
  selectContract: (text: string) => void
}) {
  return (
    <>
      {Object.keys(contracts).map((contractName: string) => {
        return (
          <Fragment key={contractName}>
            <a onClick={() => { selectContract(contractName) }}>{contractName}</a>
            <br />
          </Fragment>
        )
      })}
    </>
  )
}

function NFTValidity({
  contractInfo
}: {
  contractInfo: any
}) {
  if (!contractInfo) { return null }
  if (!contractInfo.isNFTContract) {
    //setIsContractValid(false)
    return (
      <>
        <p>The provided contract is not an NFT contract</p>
        <p>Make sure your contract is implementing the NonFungibleToken contract interface!</p>
      </>
    )
  }
  if (!contractInfo.nftConformsToMetadata || !contractInfo.collectionConformsToMetadata) {
    //setIsContractValid(false)
    return (
      <>
        <p>Your NFT contract is not metadata standards ready</p>
        <p>Your NFT and collection resources need to be updated to conform to the MetadataView interfaces.</p>
      </>
    )
  }
  //setIsContractValid(true)
  return null
}

function SampleNFTPrompt({
  contractCode,
  defaultValues
}: {
  contractCode: string,
  defaultValues: any
}) {
  const history = useHistory()
  const [publicPath, setPublicPath] = useState<string>(defaultValues.publicPath || "")
  const [sampleAddress, setSampleAddress] = useState<string>(defaultValues.sampleAddress || "")
  const possiblePublicPaths: Array<string> = contractCode.match(/\/public\/[A-Za-z0-9]*/gmi) || []
  return (
    <form onSubmit={(e) => {
      history.push({
        pathname: window.location.pathname,
        search: `?path=${publicPath}&sampleAddress=${sampleAddress}`
      })
      e.preventDefault();
      return false;
    }}>
      <p>Woohoo! Your contract is conforming to the metadata standard!</p>
      <p>Now, we will look into a sample NFT from your collection to make sure you're linking your collections correctly, to see what your metadata views looks like and if you're ready to be added to the NFT Catalog.</p>

      <p>To find a sample NFT, provide the following information and click `next` </p>

      <p></p>

      <b>Enter a public path that can be used to find your NFT from an account</b>
      <p>If one of these look correct, you may click it to autofill the input</p>
      {
        possiblePublicPaths.length > 0 && possiblePublicPaths.map((path) => {
          return (
            <a key={path} onClick={() => setPublicPath(path)}>{path}</a>
          )
        })
      }
      <p></p>
      <input type="text" value={publicPath} onChange={(e) => { setPublicPath(e.target.value) }} />
      <br />
      <br />
      <b>Enter an account address that holds this NFT</b>
      <p>Sample account w/ a testnet topshot NFT: <a onClick={() => { setSampleAddress("0xd80d84b4b0a88782") }}>0xd80d84b4b0a88782</a></p>
      <p>Sample account w/ a testnet goatedgoat NFT: <a onClick={() => { setSampleAddress("0xe27bf406ede951f7") }}>0xe27bf406ede951f7</a></p>
      <input type="text" value={sampleAddress} onChange={(e) => { setSampleAddress(e.target.value) }} />
      <br />
      <input type="submit" value={"Next"}></input>
    </form>
  )
}

function SampleNFTView({
  sampleAddress,
  publicPath
}: {
  sampleAddress: string|null,
  publicPath: string|null
}) {
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
        !error && JSON.stringify(viewsImplemented, null, 4)
      }
    </>
  )
}

export default function ({
}: {
}) {
  const query = useQuery()
  const { selectedAddress, selectedContract } = useParams()
  const [contractAddress, setContractAddress] = useState<string>(selectedAddress || "");
  const [account, setAccount] = useState<any>({})
  const [contractInfo, setContractInfo] = useState<any>(null)
  const history = useHistory()

  const publicPath = query.get("path")
  const sampleAddress = query.get("sampleAddress")

  useEffect(() => {
    setContractAddress(selectedAddress!)
  }, [selectedAddress])

  useEffect(() => {
    if (!selectedContract || !account.contracts) {
      setContractInfo(null)
      return;
    }
    const getContractInfo = async () => {
      if (!selectedContract || !selectedAddress) { return }
      setContractInfo(null)
      const res = await retrieveContractInformation(
        String(selectedAddress),
        selectedContract,
        account.contracts[selectedContract]
      )
      setContractInfo(res)
    }
    getContractInfo()
  }, [selectedContract, account])

  useEffect(() => {
    if (!selectedAddress) { return }
    const retrieveAccount = async () => {
      const res = await getAccount(String(selectedAddress))
      if (res) {
        setAccount(res)
        setContractInfo(null);
      }
    }
    retrieveAccount()
  }, [selectedAddress])

  const isContractValid = contractInfo &&
    contractInfo.isNFTContract &&
    contractInfo.nftConformsToMetadata &&
    contractInfo.collectionConformsToMetadata

  return (
    <>
      <h3>Step 1 - Find your NFT Contract</h3>
      <b>Enter Address containing your NFT Contract:</b>
      <br />
      <a onClick={() => { history.push(`/v/0xe223d8a629e49c68`) }}>Sample without nft</a>
      <br />
      <a onClick={() => { history.push(`/v/0x3277199d6c1eeaa4`) }}>Sample with nft and no metadata</a>
      <br />
      <a onClick={() => { history.push(`/v/0x877931736ee77cff`) }}>Sample with nft and metadataviews and improper public link</a>
      <br />
      <a onClick={() => { history.push(`/v/0x386817f360a5c8df`) }}>Sample with nft and metadataviews and proper public link</a>
      <br />
      <input type="text" value={contractAddress || ""} onChange={(e) => { setContractAddress(e.target.value) }}></input>
      <button onClick={async () => {
        history.push(`/v/${contractAddress}`)
      }}>Submit</button>

      <br />
      {
        account && account.contracts &&
        <>
          <br/>
          <b>Select your contract</b><br />
          <ContractSelect
            contracts={(account.contracts as { string: string })}
            selectContract={(contractName: string) => { history.push(`/v/${selectedAddress}/${contractName}`); }}
          />
        </>
      }

      <h3>Step 2 - Find a Sample NFT</h3>
      {selectedContract && <h4>Contract selected: {selectedContract}</h4>}

      <NFTValidity contractInfo={contractInfo} />

      {
        isContractValid && selectedContract &&
        <SampleNFTPrompt
          contractCode={account.contracts[selectedContract]}
          defaultValues={{sampleAddress: sampleAddress, publicPath: publicPath}}
        />
      }

      <h3>Step 3 - Review Metadata</h3>
      <SampleNFTView sampleAddress={sampleAddress} publicPath={publicPath} />

      <h3>Step 4 - Submit to Catalog</h3>
    </>
  )
}
