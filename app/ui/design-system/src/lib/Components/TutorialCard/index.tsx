import clsx from "clsx"
import { ReactComponent as CalendarIcon } from "../../../../images/action/date-calendar"
import { ReactComponent as TutorialIcon } from "../../../../images/content/drafting-tools"
import Tag from "../Tag"

export type TutorialCardProps = {
  className?: string
  heading: string
  tags: string[]
  description: string
  lastUpdated: string
  level?: string
  imageUri: string
  link: string
}

const TutorialCard = ({
  className,
  heading,
  tags,
  description,
  lastUpdated,
  level,
  imageUri,
  link,
}: TutorialCardProps) => {
  return (
    <a
      href={link}
      className={clsx(
        "flex h-[300px] w-full flex-col overflow-hidden rounded-lg bg-white hover:shadow-2xl dark:bg-primary-gray-dark dark:hover:shadow-2xl-dark md:w-[272px]",
        className
      )}
    >
      <img src={imageUri} alt="" className="h-[110px] object-cover" />
      <div className="p-4">
        <div className="text-lg font-bold md:text-xl">{heading}</div>
        <div className="my-2">
          {tags.map((tag) => (
            <Tag key={tag} name={tag} />
          ))}
        </div>
        {description}
        <div className="mt-6 flex justify-between text-xs text-primary-gray-300 dark:text-primary-gray-200">
          <div className="flex items-center">
            <CalendarIcon className="mr-1 scale-75" />
            Updated: {lastUpdated}
          </div>
          {level && (
            <div className="flex items-center">
              <TutorialIcon className="mr-2" />
              {level}
            </div>
          )}
        </div>
      </div>
    </a>
  )
}

export default TutorialCard
