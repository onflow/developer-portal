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
import {
  Theme,
  ThemeBody,
  ThemeHead,
  ThemeProvider,
  useTheme,
} from "~/cms/utils/theme.provider"
import styles from "./main.css"
import { bodyClasses } from "./styles/sharedClasses"
import { getThemeSession } from "./theme.server"
import { Footer } from "./ui/design-system/src"
import { ErrorPage } from "./ui/design-system/src/lib/Components/ErrorPage"
import { NavigationBar } from "./ui/design-system/src/lib/Components/NavigationBar"
import { navBarData } from "./component-data/NavigationBar"

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }]
}

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Flow Documentation",
  viewport: "width=device-width,initial-scale=1",
})

export type LoaderData = {
  theme: Theme | null
}

export const loader: LoaderFunction = async ({ request }) => {
  const themeSession = await getThemeSession(request)

  return json<LoaderData>({
    theme: themeSession.getTheme(),
  })
}

function App() {
  const data = useLoaderData<LoaderData>()
  const [theme] = useTheme()

  return (
    <html lang="en" className={clsx("h-full", theme ?? "")}>
      <head>
        <Meta />
        <Links />
        <ThemeHead ssrTheme={Boolean(data.theme)} />
      </head>
      <body className={bodyClasses}>
        <div className="p-10">
          <NavigationBar
            menuItems={navBarData.menuItems}
            onDarkModeToggle={() => {}}
          />
        </div>
        <ThemeBody ssrTheme={Boolean(data.theme)} />
        <Outlet />
        <Footer />
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
  console.error(error)
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
