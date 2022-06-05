import { ButtonLink } from '../Button';
import TabMenu from '../TabMenu';
import FlipCell, { FlipCellHeader, FlipCellProps } from './FlipCell';

export type FlipsProps = {
  flips: FlipCellProps[];
};

export default function Flips({ flips }: FlipsProps) {
  return (
    <div className="container">
      <div className="flex items-center justify-between">
        <div className="text-h2">FLIPs</div>
        <ButtonLink
          next={true}
          href="https://github.com/onflow"
          variant="secondary"
          target="_blank"
          rel="noreferrer"
        >
          Go to GitHub
        </ButtonLink>
      </div>
      <p className="mt-4 mb-6 max-w-[480px] text-primary-gray-400 dark:text-primary-gray-100">
        Flow improvement proposals can be submitted through a PR and are
        intended to propose changes to Flow's network and standards
      </p>

      <div className="mb-6">
        <TabMenu tabs={['Tools', ' Concepts']} onTabChange={() => null} />
      </div>

      <FlipCellHeader />
      <div className="flex flex-col gap-4">
        {flips.map((flip, index) => (
          <div key={index}>
            <FlipCell {...flip} />
          </div>
        ))}
      </div>
    </div>
  );
}
