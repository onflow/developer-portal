import clsx from 'clsx';
import { ToolName, TOOLS } from '../Internal/tools';
import {
  InternalLandingHeaderCard,
  InternalLandingHeaderCardProps,
} from './InternalLandingHeaderCard';

const TOOL_GRADIENT_CLASSES = {
  cadence: 'tool-gradient-cadence',
};

export type InternalLandingHeaderProps = {
  toolName: ToolName;
  description: string;
  headerCards: InternalLandingHeaderCardProps[];
};

export function InternalLandingHeader({
  toolName,
  description,
  headerCards,
}: InternalLandingHeaderProps) {
  const tool = TOOLS[toolName];
  const Icon = tool.iconLanding;

  return (
    <div
      className={clsx(
        'flex min-h-[715px] flex-col items-center py-10  text-white',
        // @ts-expect-error please fix
        TOOL_GRADIENT_CLASSES[toolName]
      )}
    >
      <div className="mb-14 max-w-[42rem] flex-col px-10 md:mb-4 md:justify-center md:text-center">
        <div className="flex origin-top-left scale-75 md:scale-100 md:justify-center">
          <Icon />
        </div>
        <h1 className="mt-2 mb-4 text-h2 md:mt-10">{tool.name}</h1>
        {description}
      </div>

      <div className="w-full">
        <div className="mx-auto max-w-[1220px] px-4 md:px-8">
          <div className="hidden mb-4 text-2xl font-bold md:block">
            Getting Started
          </div>
          <div className="flex flex-col gap-10 md:flex-row">
            {headerCards.map((headerCard) => (
              <InternalLandingHeaderCard
                key={headerCard.title}
                {...headerCard}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
