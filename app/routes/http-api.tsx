import {
  HtmlMetaDescriptor,
  LinkDescriptor,
  LoaderFunction,
} from "@remix-run/node"
import { RedocStandalone } from "redoc"
import { ClientOnly, DynamicLinksFunction } from "remix-utils"
import { Theme, useTheme } from "~/cms/utils/theme.provider"
import { getCanonicalLinkDescriptor } from "../utils/seo.server"

export const handle: {
  dynamicLinks: DynamicLinksFunction<LoaderData>
} = { dynamicLinks: ({ data }) => data.links }

export type LoaderData = {
  links: LinkDescriptor[]
  meta: HtmlMetaDescriptor
}

export const loader: LoaderFunction = (): LoaderData => {
  return {
    links: [getCanonicalLinkDescriptor("/http-api")],
    meta: {
      description: "Open API documentation for the Flow Access Node HTTP API.",
      "twitter:handle": "flow_blockchain",
      "twitter:url": "https://twitter.com/flow_blockchain",
    },
  }
}

export default function Page() {
  const [theme] = useTheme()
  const isDark = theme === Theme.DARK

  return (
    <ClientOnly>
      {() => (
        <RedocStandalone
          options={{
            theme: {
              colors: { text: { primary: isDark ? "white" : "black" } },
              rightPanel: { backgroundColor: "black" },
              sidebar: {
                backgroundColor: isDark ? "black" : "white",
                textColor: isDark ? "white" : "black",
              },
            },
            nativeScrollbars: true,
          }}
          specUrl="https://raw.githubusercontent.com/onflow/flow/master/openapi/access.yaml"
        />
      )}
    </ClientOnly>
  )
}
