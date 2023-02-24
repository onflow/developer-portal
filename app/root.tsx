import {
  json,
  LinkDescriptor,
  LinksFunction,
  LoaderArgs,
  MetaFunction,
  redirect,
} from "@remix-run/node"
import {
  HtmlMetaDescriptor,
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
import clsx from "clsx"
import { useCallback, useEffect, useRef } from "react"
import LoadingBar from "react-top-loading-bar"
import { ClientOnly, DynamicLinks } from "remix-utils"
import { getRequiredServerEnvVar } from "~/cms/helpers"
import {
  Theme,
  ThemeBody,
  ThemeHead,
  ThemeProvider,
  useTheme,
} from "~/cms/utils/theme.provider"
import { nav } from "~/data/nav"
import { Footer } from "~/ui/design-system/src"
import { ErrorPage } from "~/ui/design-system/src/lib/Components/ErrorPage"
import { NavigationBar } from "~/ui/design-system/src/lib/Components/NavigationBar"
import { getPublicEnv, PUBLIC_ENV } from "~/utils/env.server"
import * as gtag from "~/utils/gtags.client"
import { getThemeSession } from "~/utils/theme.server"
import { returnRedirectForRoute } from "./cms/utils/return-redirect-for-route"
import { externalLinks } from "./data/external-links"
import styles from "./main.css"
import AppLink from "./ui/design-system/src/lib/Components/AppLink"
import { SearchProps } from "./ui/design-system/src/lib/Components/Search"
import { getMetaTitle, getSocialMetas } from "./utils/seo.server"
import { useElementScrollRestoration } from "./utils/useElementScrollRestoration"
import Hotjar from "@hotjar/browser"

const fontPreloads = [
  "/fonts/acumin-pro/AcuminPro-Regular.otf",
  "/fonts/acumin-pro/AcuminPro-MediumItalic.otf",
  "/fonts/acumin-pro/AcuminPro-Italic.otf",
  "/fonts/acumin-pro/AcuminPro-MediumItalic.otf",
  "/fonts/acumin-pro/AcuminPro-SemiBold.otf",
  "/fonts/acumin-pro/AcuminPro-SemiBoldItalic.otf",
  "/fonts/acumin-pro/AcuminPro-Bold.otf",
  "/fonts/termina/Termina-Regular.otf",
  "/fonts/termina/Termina-Heavy.otf",
  "/fonts/ibm-plex/IBMPlexMono-Regular.ttf",
]

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: styles },
    {
      rel: "icon",
      href: "https://assets.website-files.com/5f6294c0c7a8cdd643b1c820/5f6294c0c7a8cd5e06b1c938_Asset%201%405x.png",
      type: "image/png",
    },
    ...fontPreloads.map((fontFile) => {
      const value: LinkDescriptor = {
        rel: "preload",
        href: fontFile,
        as: "font",
        crossOrigin: "anonymous",
      }
      return value
    }),
  ]
}

export const meta: MetaFunction = ({ data }: { data: LoaderData }) =>
  data?.meta || {}

export type LoaderData = {
  algolia?: SearchProps
  ENV: PUBLIC_ENV
  gaTrackingId: string | undefined
  meta: HtmlMetaDescriptor
  theme: Theme | null
  url: string
}

export const loader = async ({ request }: LoaderArgs) => {
  const themeSession = await getThemeSession(request)

  const redirectPath = returnRedirectForRoute(new URL(request.url).pathname)

  if (redirectPath !== undefined) {
    return redirect(redirectPath, {
      status: 301,
      headers: {
        ...request.headers,
      },
    })
  }

  if (process.env.NODE_ENV === "production" && process.env.HOTJAR_SITE_ID) {
    const hotjarVersion = 6
    Hotjar.init(parseInt(process.env.HOTJAR_SITE_ID), hotjarVersion)
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
    algolia,
    ENV: getPublicEnv(),
    gaTrackingId: process.env.GA_TRACKING_ID,
    meta: getSocialMetas({
      title: getMetaTitle(),
      url: request.url,
    }),
    theme: themeSession.getTheme(),
    url: request.url,
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
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  useElementScrollRestoration(scrollContainerRef)

  const data = useLoaderData<typeof loader>()

  const [theme, setTheme] = useTheme()
  const toggleTheme = useCallback(() => {
    setTheme((currentTheme) =>
      currentTheme === Theme.DARK ? Theme.LIGHT : Theme.DARK
    )
  }, [setTheme])

  const location = useLocation()
  useEffect(() => {
    if (data.gaTrackingId != null) {
      gtag.pageview(location.pathname, data.gaTrackingId)
    }
  }, [location, data.gaTrackingId])

  return (
    <html
      lang="en"
      className={clsx("h-full min-h-full overflow-hidden", theme ?? "")}
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <DynamicLinks />
        <Links />
        <ThemeHead ssrTheme={Boolean(data.theme)} />
      </head>
      <body className="root">
        {data.gaTrackingId != null ? (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${data.gaTrackingId}`}
            />
            <script
              async
              id="gtag-init"
              src={`/gtag-init?gaTrackingId=${data.gaTrackingId}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.ENV = ${JSON.stringify(data.ENV)};`,
              }}
            />
          </>
        ) : null}

        <ThemeBody ssrTheme={Boolean(data.theme)} />
        <NavigationBar
          menuItems={nav}
          onDarkModeToggle={toggleTheme}
          algolia={data.algolia}
        />
        <div className="flex-auto overflow-auto" ref={scrollContainerRef}>
          <TopLoader />
          <Outlet />
          <Footer
            discordUrl={externalLinks.discord}
            discourseUrl={externalLinks.discourse}
            flowUrl={externalLinks.flow}
            githubUrl={externalLinks.github}
          />
        </div>
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  )
}

export default function AppWithProviders() {
  const data = useLoaderData<typeof loader>()

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
