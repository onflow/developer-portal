type GenericViewProps = {
  view: any
}

export function GenericView({ view }: GenericViewProps) {
  return <>
    {
      Object.keys(view).map((key) => {
        return (
          <div key={key} className="flex flex-wrap justify-center space-x-2 my-2">
            <span
              className="px-4 py-2 rounded-full border border-gray-300 text-gray-500 font-semibold text-sm flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease">
              {key} : {JSON.stringify(view[key])}
            </span>
          </div>
        )
      })
    }
  </>

}