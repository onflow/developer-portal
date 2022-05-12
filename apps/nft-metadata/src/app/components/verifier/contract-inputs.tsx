import { useEffect, useState } from "react"
import { getAccount, retrieveContractInformation } from "apps/nft-metadata/src/flow/utils"
import { useInput } from "../../hooks/use-input"

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
          <a key={contractName} onClick={() => { selectContract(contractName) }}>{contractName}</a>
        )
      })}
    </>
  )
}

export default function () {
  const [contractAddress, contractAddressInput] = useInput();
  const [account, setAccount] = useState<any>({})
  const [selectedContract, setSelectedContract] = useState<string | null>(null)
  const [contractInfo, setContractInfo] = useState<any>(null)

  useEffect(() => {
    if (!selectedContract) { return; }
    const getContractInfo = async () => {
      const res = await retrieveContractInformation(
        String(contractAddress),
        selectedContract,
        account.contracts[selectedContract]
      )
      setContractInfo(res)
    }
    getContractInfo()
  }, [selectedContract])

  return (
    <>
      Enter Address:
      <br />
      Sample: 0xe223d8a629e49c68
      <br />
      {contractAddressInput}
      <button onClick={async () => {
        const res = await getAccount(String(contractAddress))
        if (!res) { alert("Failed") }
        else { setAccount(res) }
      }}>Submit</button>

      <br />
      {
        account && account.contracts &&
        <ContractSelect
          contracts={(account.contracts as { string: string })}
          selectContract={(contractName: string) => { setSelectedContract(contractName) }}
        />
      }

      {selectedContract && <h2>selected: {selectedContract}</h2>}

      {contractInfo && <p>info: {JSON.stringify(contractInfo)}</p> }
    </>
  )
}
