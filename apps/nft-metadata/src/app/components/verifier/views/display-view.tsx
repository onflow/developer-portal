export type DisplayViewType = {
  name: String,
  description: String,
  thumbnail: String
}

type DisplayViewProps = {
  view: DisplayViewType
}

export function DisplayView({ view }: DisplayViewProps) {
  return <><div className="flex flex-wrap justify-center space-x-2 my-2">
    <span
      className="px-4 py-2 rounded-full border border-gray-300 text-gray-500 font-semibold text-sm flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease">
      Name : {view.name}
    </span>
  </div>
    <div className="flex flex-wrap justify-center space-x-2 my-2">
      <span
        className="px-4 py-2 rounded-full border border-gray-300 text-gray-500 font-semibold text-sm flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease">
        Description : {view.description}
      </span>
    </div>
    <div className="flex flex-wrap justify-center space-x-2 my-2">
      <span
        className="px-4 py-2 rounded-full border border-gray-300 text-gray-500 font-semibold text-sm flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease">
        Thumbnail : {view.thumbnail}
      </span>
    </div>
  </>

}