import { CatalogForm } from "./catalog-form"

type AddToCatalogProps = {
  sampleAddress: string | null
  publicPath: string | null
}
export function AddToCatalog({ sampleAddress, publicPath
}: AddToCatalogProps) {

  return (
    <>
      <div className="text-h1 mb-6 max-w-full overflow-hidden text-ellipsis !text-2xl md:!text-4xl">Propose NFT To Catalog</div>
      <CatalogForm sampleAddress={sampleAddress} publicPath={publicPath} />
    </>
  )
}





