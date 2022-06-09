import { TextInput } from '../shared/text-input';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { Alert } from "../shared/alert"
import { Spinner } from "../shared/spinner"
import { proposeNFTToCatalog, getNFTMetadataForCollectionIdentifier } from "../../../flow/utils"
import { useDebounce } from 'src/app/hooks/use-debounce';
import * as fcl from "@onflow/fcl";

type CatalogProps = {
  sampleAddress: string | null
  publicPath: string | null
}

export function CatalogForm({ sampleAddress, publicPath }: CatalogProps) {
  const navigate = useNavigate()
  const [collectionIdentifier, setCollectionIdentifier] = useState<string>("")
  const debouncedCollectionIdentifier: string = useDebounce<string>(collectionIdentifier, 500);
  const [message, setMessage] = useState<string>("")
  const { selectedNetwork, selectedAddress, selectedContract } = useParams<any>()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [warning, setWarning] = useState<string | null>(null);
  const [user, setUser] = useState({ loggedIn: null })

  useEffect(() => fcl.currentUser().subscribe(setUser), [])

  useEffect(() => {
    const metadataInformation = async () => {
      const res = await getNFTMetadataForCollectionIdentifier(debouncedCollectionIdentifier);
      if (res != null) {
        setError(null)
        setWarning("An entry with this collection identifier already exists in the catalog. This proposal will be proposing an update.")
      } else {
        setWarning(null);
      }
    }
    if (debouncedCollectionIdentifier !== '') {
      metadataInformation()
    }
  }, [debouncedCollectionIdentifier])

  return (
    <>
      {warning && <><Alert status="warning" title={warning} body="" /><br /></>}
      {error && <><Alert status="error" title={error} body="" /><br /></>}
      <form onSubmit={async (e) => {
        e.preventDefault();
        setError(null);
        setWarning(null);
        if (collectionIdentifier === '' || collectionIdentifier == null || message === '' || message == null) {
          setError("Missing Data");
          return;
        }
        if (!publicPath || !sampleAddress || !selectedAddress || !selectedContract) {
          setError("Missing Data");
          return;
        }
        if (!user.loggedIn) {
          await fcl.logIn()
        }
        setLoading(true);
        let proposalMessage = message + " ( This proposal was made via: " + window.location.href + " )"
        try {
          await proposeNFTToCatalog(collectionIdentifier, sampleAddress, publicPath, selectedContract, selectedAddress, proposalMessage);
          setError(null);
          navigate(`/proposals/${selectedNetwork}`);
        } catch (e) {
          setError("Error running Flow transaction.");
        }
        setLoading(false);
      }}>
        <b>Enter a unique identifier to describe this collection</b>
        <TextInput
          value={collectionIdentifier}
          updateValue={setCollectionIdentifier}
          placeholder="e.g. goated_goats"
        />
        <br />
        <b>Enter a message with any additional information</b>
        <TextInput
          value={message}
          updateValue={setMessage}
          placeholder="e.g. Hello, I am adding the Goated Goats collection to the catalog. You can reach me at..."
        />
        <br />
        {loading ? <Spinner /> : <input
          type="submit"
          value={"Propose"}
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        />}
      </form>
    </>
  )
}