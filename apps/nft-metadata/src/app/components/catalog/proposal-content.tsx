import { EmptyContent } from "./empty-content"

export function ProposalContent({proposalID}: {proposalID: string|undefined}) {
  if (!proposalID) {
    return <EmptyContent />
  }
  return <div>Proposal content</div>
}