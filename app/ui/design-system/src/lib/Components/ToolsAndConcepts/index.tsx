import clsx from "clsx"
import { TabMenu } from ".."
import { ButtonLink } from "../Button"
import { ToolCard, ToolCardProps } from "../ToolCard"

export type ToolsAndConceptsProps = {
  tools: ToolCardProps[]
  bottomButtons?: boolean
  headerButtontext?: string
  concepts?: ToolCardProps[] // Not sure what this looks like yet.
}

const ToolsAndConcepts = ({
  tools,
  concepts,
  headerButtontext = "",
  bottomButtons = true,
}: ToolsAndConceptsProps) => {
  const getHeading = () => {
    return concepts && concepts.length > 0 ? "Tools and Concepts" : "Tools"
  }

  return (
    <div className="container">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-h2 mb-2">{getHeading()}</div>
          <p>
            Core concepts and tools you’ll need to get started building on Flow
          </p>
        </div>
        {!!headerButtontext.length && (
          <div className="hidden md:block">
            <ButtonLink href="#" variant="secondary" rightIcon="right">
              {headerButtontext}
            </ButtonLink>
          </div>
        )}
      </div>
      {concepts && concepts.length > 0 && (
        <TabMenu tabs={["Tools", "Concepts"]} onTabChange={() => null} />
      )}
      <div className="mt-9 grid gap-4 md:grid-cols-2 md:gap-8">
        {tools.map((tool: ToolCardProps) => (
          <ToolCard {...tool} key={tool.title} />
        ))}
      </div>
      {!!bottomButtons && (
        <div className="mt-9 flex flex-col justify-between md:flex-row">
          <ButtonLink
            href="https://google.com"
            className="mb-4 w-full md:mr-9 md:w-1/2"
            rightIcon="external"
          >
            Submit a tool
          </ButtonLink>
          <ButtonLink
            className="mb-4 w-full md:w-1/2"
            href="/tools"
            variant="secondary"
            rightIcon="right"
          >
            View all tools
          </ButtonLink>
        </div>
      )}
    </div>
  )
}

export default ToolsAndConcepts
