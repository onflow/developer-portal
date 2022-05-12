import { useState, useRef } from "react"
import { getContractsForAccount } from "apps/nft-metadata/src/flow/account"
import { useInput } from "../../hooks/use-input"

export default function() {
    const contractAddress = useRef("")
    const [contracts, setContracts] = useState([])
    const [selectedContract, setSelectedContract] = useState(null)
    return (
        <>
            Address:
            <input type="text" />
            <button onClick={async () => {
                console.log();
                //await getContractsForAccount(contractAddress)
            }}>Submit</button>
            
            <br />
        </>
    )
}
