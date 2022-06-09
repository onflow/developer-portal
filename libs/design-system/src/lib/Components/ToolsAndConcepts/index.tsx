import { TabMenu } from '../';
import { ButtonLink } from '../Button';
import { ToolCard, ToolCardProps } from '../ToolCard';

export type ToolsAndConceptsProps = {
  tools: ToolCardProps[];
};

const ToolsAndConcepts = ({ tools }) => (
  <div className="container">
    <div className="mb-2 text-h2">Tools and Concepts</div>
    <p>Core concepts and tools you’ll need to get started building on Flow</p>
    <TabMenu tabs={['Tools', 'Concepts']} onTabChange={() => null} />
    <div className="grid gap-6 mt-9 md:grid-cols-2 md:gap-x-9 md:gap-y-6">
      {tools.map((tool) => (
        <ToolCard {...tool} />
      ))}
    </div>
    <div className="flex flex-col justify-between mt-9 md:flex-row">
      <ButtonLink
        href="https://google.com"
        className="w-full mb-4 md:mr-9 md:w-1/2"
        rightIcon="external"
      >
        Submit a tool
      </ButtonLink>
      <ButtonLink
        className="w-full mb-4 md:w-1/2"
        href="/tools"
        variant="secondary"
        rightIcon="right"
      >
        View all tools
      </ButtonLink>
    </div>
  </div>
);

export default ToolsAndConcepts;
