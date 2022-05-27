import { Fragment, useState, useEffect } from 'react';
import { retrieveContractInformation, getAccount } from "../../../flow/utils"
import { useHistory, useParams } from 'react-router-dom';
import { SearchBar } from '../shared/search-bar';

export function ContractSelect({
  selectContract
}: {
  selectContract: (address: string, text: string) => void
}) {
  const [contractAddress, setContractAddress] = useState<string>("")
  const [account, setAccount] = useState<any>({})

  return (
    <>
      <div className="text-l">
        This tool will assist you in verifying the metadata on your NFTs and allow your collection to be added to the <b>NFT Catalog</b>.
        <br />
        <br />
        This catalog will automatically allow applications and marketplaces such as <b>Alchemy, Rarible, Blocto, Find</b>, etc. to utilize your NFT collection on their platforms.
        <br />
        <br />
        
      </div>
      <div className="text-2xl my-6">Select NFT Contract</div>
      <b>Enter Address containing your NFT Contract</b>
      <br />
      <SearchBar
        onSubmit={(address) => {
          if (!address) { return }
          const retrieveAccount = async () => {
            const res = await getAccount(String(address))
            if (res) {
              setAccount(res)
              setContractAddress(address)
            }
          }
          retrieveAccount()
        }}
      />

      {
        account && account.contracts &&
        <>
          <b>Select Contract</b>
          {
            Object.keys(account.contracts).map((contractName: string) => {
              return (
                <div key={contractName} className="mt-1">
                  <a
                    className="no-underline hover:underline cursor-pointer text-blue-600"
                    onClick={() => { selectContract(contractAddress, contractName) }}
                  >
                    {contractName}
                  </a>
                  <br />
                </div>
              )
            })
          }
        </>
      }

      {/*
      <br />
      <a onClick={() => { setContractAddress(`0xe223d8a629e49c68`) }}>Sample without nft: 0xe223d8a629e49c68</a>
      <br />
      <a onClick={() => { setContractAddress(`0x3277199d6c1eeaa4`) }}>Sample with nft and no metadata: 0x3277199d6c1eeaa4</a>
      <br />
      <a onClick={() => { setContractAddress(`0x877931736ee77cff`) }}>Sample with nft and metadataviews and improper public link: 0x877931736ee77cff</a>
      <br />
      <a onClick={() => { setContractAddress(`0x386817f360a5c8df`) }}>Sample with nft and metadataviews and proper public link: 0x386817f360a5c8df</a>
      <br />
      */}

    </>
  )
}