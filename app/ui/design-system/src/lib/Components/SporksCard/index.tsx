import clsx from "clsx"
import { format, parseISO } from "date-fns"
import { useState } from "react"
import { ReactComponent as CopyIcon } from "../../../../images/action/copy"
import { ReactComponent as ChevronDownIcon } from "../../../../images/arrows/chevron-down"
import { ReactComponent as ChevronUpIcon } from "../../../../images/arrows/chevron-up"
import { SporkMetadata } from "../../interfaces"

export type SporksCardProps = {
  heading: string
  timestamp: string
  sporkMetadata: SporkMetadata
  upcoming?: boolean
}

const CardItem = ({ label, data }: { label: string; data: any }) => (
  <div className="group flex items-center justify-between p-4">
    <div className="break-all">
      <span className="block uppercase text-primary-gray-300">{label}</span>
      {data}
    </div>
    <div
      className="hidden cursor-pointer text-primary-blue hover:text-primary-gray-400 group-hover:hidden md:group-hover:block"
      role="button"
      title={`Copy ${data}`}
      onClick={() => navigator.clipboard.writeText(data.toString())}
    >
      <CopyIcon />
    </div>
  </div>
)

// TODO: Use headlessui disclosure: https://headlessui.dev/react/disclosure
const Spork = ({ heading, timestamp, sporkMetadata }: SporksCardProps) => {
  const {
    accessNode,
    date,
    rootHeight,
    rootParentId,
    rootStateCommit,
    gitCommit,
  } = sporkMetadata
  const [isExpanded, setIsExpanded] = useState(false)
  const cardStyles = clsx(
    "flex-col items-center justify-between px-4 rounded-2xl hover:shadow-2xl hover:bg-primary-gray-50 dark:hover:bg-primary-gray-400/50 dark:hover:shadow-2xl-dark md:px-8",
    {
      "bg-white dark:bg-primary-gray-dark": isExpanded,
      "dark:bg-black": !isExpanded,
    }
  )

  return (
    <div className={cardStyles}>
      <div
        role="button"
        className="flex cursor-pointer justify-between px-2 py-6 ease-in"
        tabIndex={0}
        aria-pressed="false"
        onClick={() => setIsExpanded((prev) => !prev)}
      >
        <div className="flex items-center">
          <span className="pr-4 text-2xl font-bold">{heading}</span>
          <span className="border-l border-primary-gray-100 pl-4 text-primary-gray-300 dark:border-primary-gray-400">
            {format(parseISO(timestamp), "MMMM d")}
          </span>
        </div>
        <div className="dark:text-primary-gray-200">
          {isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </div>
      </div>
      {isExpanded && (
        <div className="flex-col pb-4">
          <CardItem label="Access Node" data={accessNode} />
          <CardItem label="Date" data={format(parseISO(date), "LLL d, yyyy")} />
          <CardItem label="Root Height" data={rootHeight} />
          <CardItem label="Root Parent ID" data={rootParentId} />
          <CardItem label="Root State Commit" data={rootStateCommit} />
          <CardItem label="Git Commit" data={gitCommit} />
        </div>
      )}
    </div>
  )
}

const UpcomingSpork = ({
  heading,
  timestamp,
}: Pick<SporksCardProps, "heading" | "timestamp">) => {
  return (
    <div className="flex-col items-center justify-between rounded-2xl bg-white px-4 py-6 dark:bg-primary-gray-dark md:px-8">
      <div className="flex flex-col items-center justify-start px-2 md:flex-row">
        <span className="text-2xl font-bold md:pr-4">{heading}</span>
        <hr className="my-4 inline-block w-6 md:hidden" />
        <span className="border-primary-gray-100 dark:border-primary-gray-400 md:border-l md:pl-4">
          TBD
        </span>
      </div>
    </div>
  )
}

const SporksCard = ({
  heading,
  timestamp,
  sporkMetadata,
  upcoming = false,
}: SporksCardProps) => {
  return upcoming ? (
    <UpcomingSpork heading={heading} timestamp={timestamp} />
  ) : (
    <Spork
      heading={heading}
      timestamp={timestamp}
      sporkMetadata={sporkMetadata}
    />
  )
}

export default SporksCard
