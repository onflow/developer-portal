import { GITHUB_URL } from "../../constants"
import { ButtonLink } from "../Button"
import TabMenu from "../TabMenu"
import FlipCell, { FlipCellHeader, FlipCellProps } from "./FlipCell"
import { useState } from "react"

export type FlipsProps = {
  openFlips: FlipCellProps[]
  goodPlacesToStartFlips: FlipCellProps[]
}

export default function Flips({
  openFlips,
  goodPlacesToStartFlips,
}: FlipsProps) {
  const [selectedTab, setSelectedTab] = useState(0)

  return (
    <div className="container">
      <div className="flex items-center justify-between">
        <div className="text-h2">FLIPs</div>
        <ButtonLink
          rightIcon="right"
          href={GITHUB_URL}
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
        <TabMenu
          tabs={[
            { name: "Open FLIPS", link: "#" },
            { name: " Good places to start", link: "#" },
          ]}
          onTabChange={setSelectedTab}
        />
        <div className="py-6">
          <FlipCellHeader />
          <div className="flex flex-col gap-4">
            {(selectedTab === 0 ? openFlips : goodPlacesToStartFlips)
              .sort((a, b) => (a.numComments > b.numComments ? -1 : 1))
              .slice(0, 5)
              .map((flip, index) => (
                <div key={index}>
                  <FlipCell {...flip} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
