import { TabMenu } from '../';
import { ToolCard, ToolCardProps } from '../ToolCard';
import { ButtonLink } from '../Button';
import { ReactComponent as RightChevronIcon } from '../../../../images/arrows/chevron-right.svg';
import { ReactComponent as ExternalLinkIcon } from '../../../../images/content/external-link.svg';

export type ToolsAndConceptsProps = {
  tools: ToolCardProps[];
};

const ToolsAndConcepts = ({ tools }) => (
  <>
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
      >
        Submit a tool
        <ExternalLinkIcon />
      </ButtonLink>
      <ButtonLink
        className="w-full mb-4 md:w-1/2"
        href="/tools"
        variant="secondary"
      >
        View all tools <RightChevronIcon />
      </ButtonLink>
    </div>
  </>
);

export default ToolsAndConcepts;
