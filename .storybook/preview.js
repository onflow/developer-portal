import "../app/tailwind.css"
import tailwindConfig from "../tailwind.config"
import { useGlobals } from "@storybook/addons"

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: "light",
    values: [
      {
        name: "light",
        value: "#ffffff",
      },
      {
        name: "dark",
        value: "#000000",
      },
    ],
  },
  viewport: {
    viewports: {
      xs: {
        name: "xs",
        styles: {
          width: tailwindConfig.theme.screens.xs,
          height: "667px",
        },
      },
      sm: {
        name: "sm",
        styles: {
          width: tailwindConfig.theme.screens.sm,
          height: "667px",
        },
      },
      md: {
        name: "md",
        styles: {
          width: tailwindConfig.theme.screens.md,
          height: "1024px",
        },
      },
      lg: {
        name: "lg",
        styles: {
          width: tailwindConfig.theme.screens.lg,
          height: "900px",
        },
      },
      xl: {
        name: "xl",
        styles: {
          width: tailwindConfig.theme.screens.xl,
          height: "1440px",
        },
      },
    },
  },
}

const withDarkMode = (Story, context) => {
  // TODO: For some reason `globals` is not populated on the initial
  // load of the page, so a hard refresh will not see that dark mode is enabled
  // until the background value is toggled again.
  // Listening for `GLOBALS_UPDATED` via `useChannel` doesn't help here. Nor
  // does trying to check in `useEffect`. This must be a storybook bug?
  // https://github.com/storybookjs/storybook/issues/15632

  const [globals] = useGlobals()
  const isDarkMode = globals.backgrounds?.value === "#000000"

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <Story {...context} />
    </div>
  )
}

export const decorators = [withDarkMode]
