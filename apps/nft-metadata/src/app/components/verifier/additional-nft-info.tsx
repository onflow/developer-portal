import { account } from "@onflow/fcl"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getAccount, retrieveContractInformation } from "../../../flow/utils"
import { NFTValidity } from "./nft-validity"
import { SampleNFTPrompt } from "./sample-nft-prompt"

export function AdditionalNftInfo({
}: {
}) {
  const { selectedAddress, selectedContract } = useParams()
  const [account, setAccount] = useState<any>({})
  const [contractInfo, setContractInfo] = useState<any>(null)

  useEffect(() => {
    const verifyContract = async () => {
      if (!selectedAddress || !selectedContract) {
        return;
      }
      const accountInfo = await getAccount(selectedAddress)
      setAccount(accountInfo)
      const contracts = accountInfo.contracts as any
      if (!accountInfo || !contracts || !contracts[selectedContract]) {
        return;
      }

      const res = await retrieveContractInformation(
        selectedAddress,
        selectedContract,
        contracts[selectedContract]
      )
      setContractInfo(res)
    }

    verifyContract()
  }, [selectedAddress, selectedContract])


  const isContractValid = contractInfo &&
    contractInfo.isNFTContract &&
    contractInfo.nftConformsToMetadata &&
    contractInfo.collectionConformsToMetadata

 return (
    <>
      <div className="text-2xl mb-6">Additional Contract Information</div>
      <NFTValidity selectedContract={selectedContract} contractInfo={contractInfo} />
      {
        isContractValid && selectedContract &&
          <>
            <div>
              We need a bit more information about <b>{selectedContract}</b>
            </div>
            <SampleNFTPrompt
              contractCode={account.contracts[selectedContract]}
              defaultValues={{sampleAddress: "", publicPath: ""}}
            />
          </>
      }
    </>
  )
}
