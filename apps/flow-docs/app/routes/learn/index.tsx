import { LoaderFunction } from "@remix-run/server-runtime"

export const loader: LoaderFunction = async () => {
  return {}
}

export default function Page() {
  return <div>Learn Homepage</div>
}
