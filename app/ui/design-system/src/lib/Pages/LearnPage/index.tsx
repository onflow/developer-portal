import { ReactComponent as Filter } from "../../../../images/action/filter2"
import { LandingHeader } from "../../Components/LandingHeader"
import { SocialLinksSignup } from "../../Components"
import { ButtonLink } from "../../Components/Button"
import { TutorialCardProps } from "../../Components/TutorialCard"
import PageBackground from "../shared/PageBackground"
import PageSections from "../shared/PageSections"
import PageSection from "../shared/PageSection"
import { useMemo, useState } from "react"
import {
  LargeVideoCard,
  LargeVideoCardProps,
} from "../../Components/VideoCard/LargeVideoCard"
import {
  SmallVideoCard,
  SmallVideoCardProps,
} from "../../Components/VideoCard/SmallVideoCard"
import { ToggleButton } from "../../Components/ToggleButton"
import { PaginatedTutorialCardList } from "../../Components/TutorialCard/PaginatedTutorialCardList"

export type LearnPageProps = {
  allTutorials: TutorialCardProps[]
  cadenceHref: string
  cadenceTutorials: TutorialCardProps[]
  nftTutorials: TutorialCardProps[]
  videos: {
    primary: LargeVideoCardProps
    secondary: SmallVideoCardProps[]
  }
  youtubeHref: string
}

export function LearnPage({
  allTutorials = [],
  cadenceHref,
  cadenceTutorials,
  nftTutorials,
  videos,
  youtubeHref,
}: LearnPageProps) {
  const [filters, setFilters] = useState<string[]>([])

  const allTutorialsFiltered = useMemo(
    () =>
      filters.length > 0
        ? allTutorials.filter(({ tags }) =>
            filters.some((filter) => tags.includes(filter))
          )
        : allTutorials,
    [allTutorials, filters]
  )

  const tags: Array<string> = Array.from(
    new Set(
      allTutorials.reduce(
        (acc, { tags }) => [...acc, ...tags],
        [] as Array<string>
      )
    )
  ).sort()

  return (
    <PageBackground>
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

        <PageSection className="flex-col items-stretch">
          <div className="container">
            <div className="mb-6 flex items-baseline justify-between">
              <h2 className="text-h2">Cadence</h2>
              <ButtonLink
                variant="secondary"
                className="hidden whitespace-nowrap md:flex"
                href={cadenceHref}
                rightIcon="right"
                size="sm"
              >
                Go to Cadence
              </ButtonLink>
            </div>
            <PaginatedTutorialCardList tutorials={cadenceTutorials} />
            <ButtonLink
              className="mt-6 w-full whitespace-nowrap md:hidden"
              href={cadenceHref}
              rightIcon="right"
              size="sm"
            >
              Go to Cadence
            </ButtonLink>
          </div>
        </PageSection>

        <PageSection className="flex-col items-stretch ">
          <div className="container">
            <h2 className="text-h2 f mb-6">NFTs</h2>
            <PaginatedTutorialCardList tutorials={nftTutorials} />
          </div>
        </PageSection>

        <PageSection>
          <div className="container">
            <div className="mb-6 flex items-baseline justify-between">
              <h2 className="text-h2">Featured videos</h2>
              <ButtonLink
                variant="secondary"
                className="hidden whitespace-nowrap md:flex"
                href={youtubeHref}
                rightIcon="external"
                size="sm"
              >
                Go to Youtube
              </ButtonLink>
            </div>
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
            <ButtonLink
              className="mt-6 w-full whitespace-nowrap md:hidden"
              href={youtubeHref}
              rightIcon="external"
              size="sm"
            >
              Go to Youtube
            </ButtonLink>
          </div>
        </PageSection>

        <PageSection>
          <div className="container">
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
                      setFilters(filters.filter((value) => value !== tag))
                    } else {
                      setFilters([...filters, tag])
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
            <PaginatedTutorialCardList
              listId={filters}
              tutorials={allTutorialsFiltered}
            />
          </div>
        </PageSection>
      </PageSections>

      <div className="flex-col items-center">
        <div className="my-24">
          <SocialLinksSignup />
        </div>
      </div>
    </PageBackground>
  )
}
