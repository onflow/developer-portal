import { LoaderFunction } from "@remix-run/node"
import { useOutletContext } from "@remix-run/react"
import { useMdxComponent } from "~/cms/utils/mdx"
import { MdxPage } from "~/cms"

type ContextType = {
  mdx: MdxPage
}

export const loader: LoaderFunction = async ({ params }): Promise<{}> => {
  console.log(params)
  return {}
}

export default function () {
  const { mdx } = useOutletContext<ContextType>()
  const MDXContent = useMdxComponent(mdx)
  return (
    <>
      <MDXContent />
    </>
  )
}
