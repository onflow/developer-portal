export type RoyaltiesViewType = {
  royalties: []
}

type RoyaltiesViewProps = {
  view: RoyaltiesViewType
}

export function RoyaltiesView({ view }: RoyaltiesViewProps) {
  return <><div className="flex flex-wrap justify-center space-x-2 my-2">
    <span
      className="px-4 py-2 rounded-full border border-gray-300 text-gray-500 font-semibold text-sm flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease">
      Royalty View
    </span>
  </div>
  </>

}