import AppLink from "~/ui/design-system/src/lib/Components/AppLink"
import { ErrorPage } from "~/ui/design-system/src/lib/Components/ErrorPage"

export function InternalErrorBoundary({ error }: { error: Error }) {
  const isDebugDisplayed = process.env.NODE_ENV !== "production"

  return (
    <ErrorPage
      title={"An unexpected error occured"}
      subtitle={
        isDebugDisplayed ? (
          <div>
            {error.message}
            <pre>{error.stack}</pre>
          </div>
        ) : (
          `This content could not be loaded`
        )
      }
      actions={
        <AppLink className="underline" to="/">
          Go home
        </AppLink>
      }
    />
  )
}
