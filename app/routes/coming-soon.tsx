import { MetaFunction } from "@remix-run/node"
import { PageBackground } from "~/ui/design-system"
import PageSection from "~/ui/design-system/src/lib/Pages/shared/PageSection"
import PageSections from "~/ui/design-system/src/lib/Pages/shared/PageSections"

export const meta: MetaFunction = () => {
  return { title: `Coming soon` }
}

export default function ComingSoon() {
  return (
    <PageBackground gradient="tools">
      <PageSections>
        <PageSection className="min-h-[2000px] pt-0 pb-0">
          <div className="container mx-auto flex flex-col justify-items-stretch py-16 md:py-32">
            <h1 className="text-h1 mb-14 max-w-full overflow-hidden text-ellipsis !text-4xl md:mt-12 md:!text-7xl md:!leading-tight">
              Coming soon
            </h1>
          </div>
        </PageSection>
      </PageSections>
    </PageBackground>
  )
}
