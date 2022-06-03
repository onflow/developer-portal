import { TextInput } from '../shared/text-input';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Alert } from "../shared/alert"
import { Spinner } from "../shared/spinner"
import { proposeNFTToCatalog } from "../../../flow/utils"
import * as fcl from "@onflow/fcl";

type CatalogProps = {
  sampleAddress: string | null
  publicPath: string | null
}

export function CatalogForm({ sampleAddress, publicPath }: CatalogProps) {
  const [collectionName, setCollectionName] = useState<string>("")
  const [message, setMessage] = useState<string>("")
  const { selectedAddress, selectedContract } = useParams()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [user, setUser] = useState({ loggedIn: null })

  useEffect(() => fcl.currentUser().subscribe(setUser), [])
  return (
    <>
      {loading && <Spinner />}
      {error && <><Alert status="error" title={error} body="" /><br /></>}
      <form onSubmit={async (e) => {
        setLoading(true);
        e.preventDefault();
        if (collectionName === '' || collectionName == null || message === '' || message == null) {
          return;
        }
        if (!publicPath || !sampleAddress || !selectedAddress || !selectedContract) { return }
        if (!user.loggedIn) {
          fcl.authenticate()
        }
        try {
          await proposeNFTToCatalog(collectionName, sampleAddress, publicPath, selectedContract, selectedAddress, message);
          setError(null);
        } catch (e) {
          setError("Error running Flow transaction.");
        }
        setLoading(false);
      }}>
        <b>Enter a unique name to describe this collection</b>
        <TextInput
          value={collectionName}
          updateValue={setCollectionName}
          placeholder="e.g. Goated Goats"
        />
        <br />
        <b>Enter a message with any additional information</b>
        <TextInput
          value={message}
          updateValue={setMessage}
          placeholder="e.g. Hello, I am adding the Goated Goats collection to the catalog. You can reach me at..."
        />
        <br />
        <input
          type="submit"
          value={"Propose"}
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        />
      </form>
    </>
  )
}