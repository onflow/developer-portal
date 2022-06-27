import type {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node"
import { json } from "@remix-run/node"
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
} from "@remix-run/react"
import clsx from "clsx"
import { useCallback, useEffect } from "react"
import {
  Theme,
  ThemeBody,
  ThemeHead,
  ThemeProvider,
  useTheme,
} from "~/cms/utils/theme.provider"
import { getRequiredServerEnvVar } from "./cms/helpers"
import { navBarData } from "./component-data/NavigationBar"
import * as gtag from "./gtags.client"
import styles from "./main.css"
import { getThemeSession } from "./theme.server"
import { Footer } from "./ui/design-system/src"
import { ErrorPage } from "./ui/design-system/src/lib/Components/ErrorPage"
import { NavigationBar } from "./ui/design-system/src/lib/Components/NavigationBar"

export const getMetaTitle = (title?: string) =>
  [title, "Flow Developer Portal"].filter(Boolean).join(" | ")

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
}

export const loader: LoaderFunction = async ({ request }) => {
  const themeSession = await getThemeSession(request)
  return json<LoaderData>({
    theme: themeSession.getTheme(),
    gaTrackingId: getRequiredServerEnvVar("GA_TRACKING_ID"),
  })
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
          </>
        )}

        <ThemeBody ssrTheme={Boolean(data.theme)} />
        <NavigationBar
          menuItems={navBarData.menuItems}
          onDarkModeToggle={toggleTheme}
        />
        <div className="flex-auto overflow-auto">
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
            <Link className="underline" to="/">
              Go home
            </Link>
          }
        />
        {/* add the UI you want your users to see */}
        <Scripts />
      </body>
    </html>
  )
}
