import { Fragment, useEffect, useState } from "react"
import { getAccount, retrieveContractInformation } from "apps/nft-metadata/src/flow/utils"
import { useInput } from "../../hooks/use-input"
import { useHistory, useParams } from "react-router-dom"

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
  contractCode
}: {
  contractCode: string
}) {
  const [publicPath, setPublicPath] = useState<string>("")
  const [sampleAddress, setSampleAddress] = useState<string>("")
  const possiblePublicPaths: Array<string> = contractCode.match(/\/public\/[A-Za-z0-9]*/gmi) || []
  return (
    <form onSubmit={(e) => {
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
      <p>Sample account w/ a testnet topshot: <a onClick={() => { setSampleAddress("0xd80d84b4b0a88782") }}>0xd80d84b4b0a88782</a></p>
      <input type="text" value={sampleAddress} onChange={(e) => { setSampleAddress(e.target.value) }} />
      <br />
      <input type="submit" value={"Next"}></input>
    </form>
  )
}

export default function ({
}: {
}) {
  const { selectedAddress, selectedContract } = useParams()
  const [contractAddress, setContractAddress] = useState<string>(selectedAddress || "");
  const [account, setAccount] = useState<any>({})
  const [contractInfo, setContractInfo] = useState<any>(null)
  const history = useHistory()

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
      <h3>Step 1</h3>
      Enter Address containing your NFT Contract:
      <br />
      <a onClick={() => { history.push(`/v/0xe223d8a629e49c68`) }}>Sample without nft</a>
      <br />
      <a onClick={() => { history.push(`/v/0x3277199d6c1eeaa4`) }}>Sample with nft and no metadata</a>
      <br />
      <a onClick={() => { history.push(`/v/0x877931736ee77cff`) }}>Sample with nft and metadataviews</a>
      <br />
      <input type="text" value={contractAddress || ""} onChange={(e) => { setContractAddress(e.target.value) }}></input>
      <button onClick={async () => {
        history.push(`/v/${contractAddress}`)
      }}>Submit</button>

      <br />
      <h3>Step 2</h3>
      <p>Select your contract</p>
      {
        account && account.contracts &&
        <ContractSelect
          contracts={(account.contracts as { string: string })}
          selectContract={(contractName: string) => { history.push(`/v/${selectedAddress}/${contractName}`); }}
        />
      }

      <h3>Step 3</h3>
      Find a Sample NFT
      {selectedContract && <h4>Contract selected: {selectedContract}</h4>}

      <NFTValidity contractInfo={contractInfo} />

      {isContractValid && selectedContract && <SampleNFTPrompt contractCode={account.contracts[selectedContract]} />}

      <h3>Step 4</h3>
      <p>Confirm the metadata looks good</p>

      <h3>Step 5</h3>
      <p>Submit your collection to be added to the Flow NFT catalog.</p>
    </>
  )
}
