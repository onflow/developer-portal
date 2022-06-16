import { TabMenu } from ".."
import { ButtonLink } from "../Button"
import { ToolCard, ToolCardProps } from "../ToolCard"

export type ToolsAndConceptsProps = {
  tools: ToolCardProps[]
  concepts?: ToolCardProps[] // Not sure what this looks like yet.
}

const ToolsAndConcepts = ({ tools, concepts }: ToolsAndConceptsProps) => {
  const getHeading = () => {
    return concepts && concepts.length > 0 ? "Tools and Concepts" : "Tools"
  }

  return (
    <div className="container">
      <div className="text-h2 mb-2">{getHeading()}</div>
      <p className="text-primary-gray-400 dark:text-primary-gray-100">
        Core concepts and tools you’ll need to get started building on Flow
      </p>
      {concepts && concepts.length > 0 && (
        <TabMenu tabs={["Tools", "Concepts"]} onTabChange={() => null} />
      )}
      <div className="mt-9 grid gap-4 md:grid-cols-2 md:gap-8">
        {tools.map((tool: ToolCardProps, index) => (
          <ToolCard {...tool} key={index} />
        ))}
      </div>
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
    </div>
  )
}

export default ToolsAndConcepts
