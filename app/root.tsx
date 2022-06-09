import type {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import clsx from "clsx";
import {
  Theme,
  ThemeBody,
  ThemeHead,
  ThemeProvider,
  useTheme,
} from "~/cms/utils/theme.provider";
import { getUser } from "./session.server";
import styles from "./styles/main.css";
import { getThemeSession } from "./theme.server";

import { Footer } from "../libs/design-system/src";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Flow Documentation",
  viewport: "width=device-width,initial-scale=1",
});

export type LoaderData = {
  user: Awaited<ReturnType<typeof getUser>>;
  theme: Theme | null;
};

export const loader: LoaderFunction = async ({ request }) => {
  const themeSession = await getThemeSession(request);

  return json<LoaderData>({
    user: await getUser(request),
    theme: themeSession.getTheme(),
  });
};

function App() {
  const data = useLoaderData<LoaderData>();
  const [theme] = useTheme();

  return (
    <html lang="en" className={clsx("h-full", theme ?? "")}>
      <head>
        <Meta />
        <Links />
        <ThemeHead ssrTheme={Boolean(data.theme)} />
      </head>
      <body
        className={clsx(
          "h-full flex-col justify-between bg-white text-gray-900 dark:bg-black dark:text-white"
        )}
      >
        <ThemeBody ssrTheme={Boolean(data.theme)} />
        {/* <MainNav /> */}
        <Outlet />
        <Footer />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default function AppWithProviders() {
  const data = useLoaderData<LoaderData>();

  return (
    <ThemeProvider specifiedTheme={data.theme}>
      <App />
    </ThemeProvider>
  );
}
