import clsx from "clsx"
import { ButtonLink } from "../Button"
import Tag from "../Tag"
import {
  LinkCard2ColumnItem,
  LinkCard2ColumnItemProps,
} from "./LinkCard2ColumnItem"

export type LinkCard2ColumnProps = {
  buttonText: string
  buttonUrl: string
  description: string
  items: LinkCard2ColumnItemProps[]
  tags?: string[]
  title: string
  bottomRounded?: boolean
}

export function LinkCard2Column({
  buttonText,
  buttonUrl,
  description,
  items,
  tags,
  title,
  bottomRounded = true,
}: LinkCard2ColumnProps) {
  const classes = clsx(
    "container flex flex-col items-start px-4 py-12 rounded-lg bg-primary-gray-100/30 dark:bg-primary-gray-dark md:flex-row md:px-20 md:py-20",
    {
      "rounded-br-none rounded-bl-none": !bottomRounded,
    }
  )

  return (
    <div className={classes}>
      <div className="flex flex-col items-start flex-1 md:mr-20">
        {tags && (
          <div className="mb-1">
            {tags.map((tag) => (
              <Tag key={tag} name={tag} />
            ))}
          </div>
        )}
        <h2 className="my-2 text-h2 md:mb-3">{title}</h2>
        <p className="max-w-[18rem] overflow-hidden text-ellipsis	text-primary-gray-400 dark:text-primary-gray-100 lg:max-w-[36rem] xl:max-w-[38rem]">
          {description}
        </p>
        <ButtonLink
          href={buttonUrl}
          className="px-8 py-3 mt-2 mb-10 md:mt-10"
          variant="primary-no-darkmode"
        >
          {buttonText}
        </ButtonLink>
      </div>
      <div className="flex flex-col items-stretch flex-1 w-full">
        {items.map((item) => (
          <LinkCard2ColumnItem key={item.title} {...item} />
        ))}
      </div>
    </div>
  )
}
