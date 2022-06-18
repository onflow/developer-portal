import clsx from "clsx"
// import { ReactComponent as FileCopyIcon } from "../../../../images/content/file-copy"
import Highlight, { defaultProps, Language, Prism } from "prism-react-renderer"
import darkTheme from "prism-react-renderer/themes/vsDark"
import lightTheme from "prism-react-renderer/themes/vsLight"
import { useEffect, useState } from "react"
import { Theme } from "~/cms/utils/theme.provider"
import { prismSwiftLang } from "./prism"

// Add swift to Prism. Is there a better way to do this?
// @ts-expect-error
Prism.languages.swift = prismSwiftLang
// @ts-expect-error
Prism.languages.swift["string-literal"].forEach(function (e) {
  // @ts-expect-error
  e.inside.interpolation.inside = Prism.languages.swift
})
// @ts-expect-error
Prism.languages.cadence = Prism.languages["swift"]

export function Code({
  innerClasses,
  theme,
  children,
}: {
  innerClasses: string
  theme: Theme | null
  children: JSX.Element
}) {
  const [highlightTheme, setHighlightTheme] = useState(lightTheme)
  const language =
    children.props.className?.replace(/language-/, "") || "language-javascript"

  useEffect(() => {
    // System theme is not set on initial SSR load, and component doesn't re-render on hydration. Is there a better way to do this?
    setHighlightTheme(theme === "dark" ? darkTheme : lightTheme)
  }, [theme])

  return (
    // @ts-expect-error: TODO: incorrect Highlight typing?
    <Highlight
      {...defaultProps}
      code={children?.props?.children}
      language={language as Language}
      theme={highlightTheme}
      Prism={Prism}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={clsx(
            className,
            "!m-0 flex h-full w-full overflow-hidden rounded-bl-lg rounded-br-lg !bg-white !p-0 text-xs dark:!bg-[#111111]"
          )}
          style={{
            ...style,
            textShadow: "none",
            boxShadow: "rgb(0 0 0 / 3%) 0px 11px 15px 0px inset",
          }}
        >
          <div className={clsx("overflow-auto p-3 font-mono", innerClasses)}>
            {tokens.map((line, i) => (
              <div
                key={i}
                {...getLineProps({ line, key: i })}
                className="table-row"
              >
                <div className="table-cell select-none pr-6 text-right opacity-50">
                  {i + 1}
                </div>
                <div className="table-cell">
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </pre>
      )}
    </Highlight>
  )
}
