import { CatalogForm } from "./catalog-form"

type AddToCatalogProps = {
  sampleAddress: string | null
  publicPath: string | null
}
export function AddToCatalog({ sampleAddress, publicPath
}: AddToCatalogProps) {

  return (
    <>
      <div className="text-2xl mb-6">Propose NFT To Catalog</div>
      <CatalogForm sampleAddress={sampleAddress} publicPath={publicPath} />
    </>
  )
}





