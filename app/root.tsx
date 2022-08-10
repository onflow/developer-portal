import type {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node"
import { json, redirect } from "@remix-run/node"
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
  useTransition,
} from "@remix-run/react"

import LoadingBar from "react-top-loading-bar"
import { ClientOnly } from "remix-utils"

import clsx from "clsx"
import { useCallback, useEffect, useRef } from "react"
import { getRequiredServerEnvVar } from "~/cms/helpers"
import {
  Theme,
  ThemeBody,
  ThemeHead,
  ThemeProvider,
  useTheme,
} from "~/cms/utils/theme.provider"
import { navBarData } from "~/component-data/NavigationBar"
import { Footer } from "~/ui/design-system/src"
import { ErrorPage } from "~/ui/design-system/src/lib/Components/ErrorPage"
import { NavigationBar } from "~/ui/design-system/src/lib/Components/NavigationBar"
import { getPublicEnv, PUBLIC_ENV } from "~/utils/env.server"
import * as gtag from "~/utils/gtags.client"
import { getThemeSession } from "~/utils/theme.server"
import styles from "./main.css"
import AppLink from "./ui/design-system/src/lib/Components/AppLink"
import { SearchProps } from "./ui/design-system/src/lib/Components/Search"
import { getMetaTitle } from "./utils/seo"

import redirects from "./redirects"

export { getMetaTitle } from "./utils/seo"

function returnRedirectForRoute(url: URL): string | undefined {
  console.log("Searching for redirect for", url.pathname)
  // @ts-expect-error
  return redirects[url.pathname]
}

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: styles },
    {
      rel: "icon",
      href: "https://assets.website-files.com/5f6294c0c7a8cdd643b1c820/5f6294c0c7a8cd5e06b1c938_Asset%201%405x.png",
      type: "image/png",
    },
  ]
}

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: getMetaTitle(),
  viewport: "width=device-width,initial-scale=1",
})

export type LoaderData = {
  theme: Theme | null
  gaTrackingId: string | undefined
  ENV: PUBLIC_ENV
  algolia?: SearchProps
}

export const loader: LoaderFunction = async ({ request }) => {
  const themeSession = await getThemeSession(request)

  const redirectPath = returnRedirectForRoute(new URL(request.url))

  if (redirectPath) {
    return redirect(redirectPath, {
      status: 301,
      headers: {
        ...request.headers,
      },
    })
  }

  let algolia: SearchProps | undefined = undefined

  if (process.env.ALGOLIA_APP_ID) {
    algolia = {
      apiKey: getRequiredServerEnvVar("ALGOLIA_API_KEY"),
      appId: getRequiredServerEnvVar("ALGOLIA_APP_ID"),
      indexName: getRequiredServerEnvVar("ALGOLIA_INDEX_NAME"),
    }
  }

  return json<LoaderData>({
    theme: themeSession.getTheme(),
    gaTrackingId: getRequiredServerEnvVar(
      "GA_TRACKING_ID",
      "GA_TRACKING_ID-dev-value"
    ),
    ENV: getPublicEnv(),
    algolia,
  })
}

function TopLoader() {
  const transition = useTransition()
  const ref = useRef(null)
  useEffect(() => {
    if (transition.state === "loading") {
      //@ts-ignore
      ref.current?.continuousStart()
    }
    if (transition.state === "idle") {
      //@ts-ignore
      ref.current?.complete()
    }
  }, [transition])

  return (
    <ClientOnly>
      {() => {
        return <LoadingBar color="#08c466" ref={ref} height={4} />
      }}
    </ClientOnly>
  )
}

function App() {
  const data = useLoaderData<LoaderData>()

  const [theme, setTheme] = useTheme()
  const toggleTheme = useCallback(() => {
    setTheme((currentTheme) =>
      currentTheme === Theme.DARK ? Theme.LIGHT : Theme.DARK
    )
  }, [setTheme])

  const location = useLocation()
  useEffect(() => {
    if (data.gaTrackingId?.length) {
      gtag.pageview(location.pathname, data.gaTrackingId)
    }
  }, [location, data.gaTrackingId])

  return (
    <html
      lang="en"
      className={clsx("h-full min-h-full overflow-hidden", theme ?? "")}
    >
      <head>
        <Meta />
        <Links />
        <ThemeHead ssrTheme={Boolean(data.theme)} />
      </head>
      <body className="root">
        {!data.gaTrackingId ? null : (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${data.gaTrackingId}`}
            />
            <script
              async
              id="gtag-init"
              dangerouslySetInnerHTML={{
                __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${data.gaTrackingId}', {
                  page_path: window.location.pathname,
                });
              `,
              }}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.ENV = ${JSON.stringify(data.ENV)};`,
              }}
            />
          </>
        )}

        <ThemeBody ssrTheme={Boolean(data.theme)} />
        <NavigationBar
          menuItems={navBarData.menuItems}
          onDarkModeToggle={toggleTheme}
          algolia={data.algolia}
        />
        <div className="flex-auto overflow-auto">
          <TopLoader />
          <Outlet />
          <Footer />
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}

export default function AppWithProviders() {
  const data = useLoaderData<LoaderData>()

  return (
    <ThemeProvider specifiedTheme={data.theme}>
      <App />
    </ThemeProvider>
  )
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(`ErrorBoundary`, error)
  const location = useLocation()
  return (
    <html className="flex min-h-full bg-red-300">
      <head>
        <title>An unexpected error occured</title>
        <Meta />
        <Links />
      </head>
      <body className="flex flex-1 align-middle">
        <ErrorPage
          title={"500 – An unexpected error occured"}
          subtitle={`"${location.pathname}" is currently not working`}
          actions={
            <AppLink className="underline" to="/">
              Go home
            </AppLink>
          }
        />
        {/* add the UI you want your users to see */}
        <Scripts />
      </body>
    </html>
  )
}
