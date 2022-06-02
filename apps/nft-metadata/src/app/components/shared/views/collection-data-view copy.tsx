import { GenericViewToggle } from "./generic-view-toggle"

type GenericViewProps = {
  view: any
}

function convertToReadableType(type: string) {
  return type.replace(/A.[a-zA-Z0-9]+./g, '')
}

export function CollectionDataView({ view }: GenericViewProps) {
  return (
    <>
      <div className="w-full overflow-x-auto">
        <div className="text-lg"><b>Storage Path:</b> /storage/{view.storagePath.identifier}</div>
        <div className="text-lg"><b>Public Path:</b> /public/{view.storagePath.identifier}</div>
        <div className="text-lg"><b>Private Path:</b> /private/{view.storagePath.identifier}</div>
        <div className="text-lg"><b>Public Type:</b> {convertToReadableType(view.publicLinkedType)}</div>
        <div className="text-lg"><b>Private Type:</b> {convertToReadableType(view.privateLinkedType)}</div>
      </div>
      <hr className="my-2" />
      <GenericViewToggle view={view} />
    </>
  )
}