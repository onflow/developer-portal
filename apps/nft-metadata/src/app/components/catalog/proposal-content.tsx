import { useEffect, useState } from "react"
import { getProposal } from "src/flow/utils"
import { Alert } from "../shared/alert"
import { Spinner } from "../shared/spinner"
import { CollectionDataView } from "../shared/views/collection-data-view"
import { CollectionDisplayView } from "../shared/views/collection-display-view"
import { EmptyContent } from "./empty-content"
import { Box } from "../shared/box"
import { ProposalActions } from "./proposal-actions"

export function ProposalContent({proposalID}: {proposalID: string|undefined}) {
  const [proposalData, setProposalData] = useState<any>(null)
  const [error, setError] = useState<string|null>(null)

  useEffect(() => {
    setProposalData(null)
    setError(null)
    if (!proposalID) { return }
    const setup = async () => {
      const res = await getProposal(proposalID);
      if (res) {
        setProposalData(res)
      } else {
        setError(`Unable to find a proposal with ID ${proposalID}`)
      }
    }
    setup()
  }, [proposalID])


  if (error) {
    <Alert status="error" title={error} body={""} />
  }
  if (!proposalID) {
    return <EmptyContent />
  }
  if (!proposalData) {
    return <Spinner />
  }
  return (
    <>
      <div> <span className="text-xl"><b>{proposalData.collectionIdentifier}</b></span> <span className="text-md ml-2">{proposalData.status}</span></div>
      <br />
      <div className="text-md"><b>Submitted:</b> {proposalData.proposer} on {(new Date(proposalData.createdTime * 1000)).toLocaleDateString("en-US")}</div>
      <div className="text-md"><b>Message: </b>{proposalData.message}</div>
      <br />
      <div className="text-lg">Collection Display</div>
      <Box>
        <CollectionDisplayView view={proposalData.metadata.collectionDisplay} withRawView={false} />
      </Box>
      <br />
      <div className="text-lg">Collection Data</div>
      <Box>
        <CollectionDataView view={proposalData.metadata.collectionData} withRawView={false} />
      </Box>
      <br />
      <div className="text-lg">Actions</div>
      <Box>
        <ProposalActions proposalID={proposalID} proposal={proposalData} />
      </Box>
    </>
  )
}