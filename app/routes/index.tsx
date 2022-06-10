import { LandingHeaderHome } from "~/libs/design-system"

export default function Index() {
  return (
    <LandingHeaderHome
      description="The best docs ever."
      title="Developer Portal"
      tag="onflow"
      // @ts-expect-error please fix
      gradient="community"
    />
  )
}
