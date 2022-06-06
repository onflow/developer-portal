import { ReactComponent as Filter } from '../../../../images/action/filter2.svg';
import { LandingHeader } from '../../Components/LandingHeader';
import { SocialLinksSignup, Pagination } from '../../Components';
import { ButtonLink } from '../../Components/Button';
import TutorialCard, { TutorialCardProps } from '../../Components/TutorialCard';
import PageSections from '../shared/PageSections';
import PageSection from '../shared/PageSection';
import { useCallback, useState } from 'react';
import {
  LargeVideoCard,
  LargeVideoCardProps,
} from '../../Components/VideoCard/LargeVideoCard';
import {
  SmallVideoCard,
  SmallVideoCardProps,
} from '../../Components/VideoCard/SmallVideoCard';
import { ToggleButton } from '../../Components/ToggleButton';

export type LearnPageProps = {
  featuredTutorials: Array<{
    title: string;
    href: string;
    linkText: string;
    tutorials: TutorialCardProps[];
  }>;
  allTutorials: TutorialCardProps[];
  videos: {
    primary: LargeVideoCardProps;
    secondary: SmallVideoCardProps[];
  };
};

export function LearnPage({
  featuredTutorials = [],
  allTutorials = [],
  videos,
}: LearnPageProps) {
  const [filters, _setFilters] = useState<string[]>([]);
  const [page, setPage] = useState(1);

  const setFilters = useCallback((nextFilters) => {
    _setFilters(nextFilters);
    setPage(1);
  }, []);

  const filteredTutorials =
    filters.length > 0
      ? allTutorials.filter(({ tags }) =>
          filters.some((filter) => tags.includes(filter))
        )
      : allTutorials;

  const tags = Array.from(
    new Set(allTutorials.reduce((acc, { tags }) => [...acc, ...tags], []))
  );

  return (
    <div className="container w-full bg-primary-gray-50 p-6 dark:bg-black">
      <PageSections>
        <PageSection className="pt-0">
          <LandingHeader
            gradient="tools"
            title="Learn"
            buttonText="Button Text"
            buttonUrl="#fixme"
            callout="Featured"
            description="Lorem ipsum dolor sit amet proin gravida lorem ipsum dolor sit."
          />
        </PageSection>

        {featuredTutorials.map((section) => (
          <PageSection key={section.title} className="flex-col items-stretch">
            <div className="mb-6 flex items-baseline justify-between">
              <h2 className="text-h2">{section.title}</h2>
              <ButtonLink
                variant="secondary"
                className="hidden whitespace-nowrap md:flex"
                href={section.href}
                next
                size="sm"
              >
                Go to Cadence
              </ButtonLink>
            </div>
            <div className="flex flex-col flex-nowrap	gap-6 overflow-hidden md:flex-row">
              {section.tutorials.map((tutorialProps, index) => (
                <TutorialCard
                  className="w-full md:min-w-[282px]"
                  key={index}
                  {...tutorialProps}
                />
              ))}
            </div>
            <ButtonLink
              className="mt-6 w-full whitespace-nowrap md:hidden"
              href={section.href}
              next
              size="sm"
            >
              Go to Cadence
            </ButtonLink>
          </PageSection>
        ))}

        <PageSection>
          <h2 className="text-h2 mb-6">Featured videos</h2>
          <div className="flex flex-col items-stretch gap-4 md:basis-1/2 md:flex-row md:items-center">
            <div className="shrink-0 grow">
              <LargeVideoCard {...videos.primary} />
            </div>
            <div className="flex flex-col gap-4">
              {videos.secondary.map((videoProps) => (
                <SmallVideoCard key={videoProps.link} {...videoProps} />
              ))}
            </div>
          </div>
        </PageSection>

        <PageSection>
          <h2 className="text-h2 mb-6">All content</h2>
          <div className="mb-6 flex flex-wrap gap-4">
            <div className="flow flow-col inline-flex items-center justify-center py-2 text-center text-base font-semibold">
              <Filter className="mr-2" /> Filter
            </div>
            {tags.map((tag) => (
              <ToggleButton
                key={tag}
                onClick={() => {
                  if (filters.includes(tag)) {
                    setFilters(filters.filter((value) => value !== tag));
                  } else {
                    setFilters([...filters, tag]);
                  }
                }}
                isSelected={filters.includes(tag)}
              >
                {tag}
              </ToggleButton>
            ))}
            {filters.length > 0 && (
              <button
                className="font-semibold text-primary-blue"
                onClick={() => setFilters([])}
              >
                Clear all
              </button>
            )}
          </div>
          <div className="hidden md:block">
            <div className="mb-6 grid grid-cols-4	gap-6">
              {filteredTutorials
                .slice((page - 1) * 12, page * 12)
                .map((tutorialProps, index) => (
                  <TutorialCard
                    key={index}
                    className="w-full"
                    {...tutorialProps}
                  />
                ))}
            </div>
            <Pagination
              itemCount={filteredTutorials.length}
              page={page}
              pageSize={12}
              setPage={setPage}
            />
          </div>
          <div className="block md:hidden">
            <div className="mb-6 flex flex-col gap-6 overflow-hidden">
              {filteredTutorials
                .slice((page - 1) * 4, page * 4)
                .map((tutorialProps, index) => (
                  <TutorialCard
                    key={index}
                    className="w-full"
                    {...tutorialProps}
                  />
                ))}
            </div>
            <Pagination
              itemCount={filteredTutorials.length}
              page={page}
              pageSize={4}
              setPage={setPage}
            />
          </div>
        </PageSection>
      </PageSections>

      <div className="flex-col items-center">
        <div className="my-24">
          <SocialLinksSignup />
        </div>
      </div>
    </div>
  );
}
