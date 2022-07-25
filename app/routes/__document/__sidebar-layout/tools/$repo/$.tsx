import { LoaderFunction } from "@remix-run/node"

export const loader: LoaderFunction = async ({ params }): Promise<{}> => {
  console.log(params)
  return {}
}

export default function () {
  return (
    <div>
      <>TOOLS TEST PAGE</>
    </div>
  )
}
