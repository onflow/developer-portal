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
  homePage?: boolean
}

export function LinkCard2Column({
  buttonText,
  buttonUrl,
  description,
  items,
  tags,
  title,
  bottomRounded = true,
  homePage = false,
}: LinkCard2ColumnProps) {
  const classes = clsx(
    "flex flex-col items-start px-4 py-8 rounded-lg bg-primary-gray-100/30 md:flex-row md:px-20",
    homePage
      ? "md:py-24 dark:bg-[#2F353FA8]"
      : "md:py-12 dark:bg-primary-gray-dark",
    {
      "rounded-br-none rounded-bl-none": !bottomRounded,
    }
  )

  return (
    <div className="container">
      <div className={classes}>
        <div className="flex flex-1 flex-col items-start md:mr-20">
          {tags && (
            <div className="mb-1">
              {tags.map((tag) => (
                <Tag key={tag} name={tag} />
              ))}
            </div>
          )}
          <h2 className="text-h2 my-2 md:mb-3">{title}</h2>
          <p className="max-w-xs overflow-hidden text-ellipsis text-primary-gray-400 dark:text-primary-gray-100">
            {description}
          </p>
          <ButtonLink
            href={buttonUrl}
            className="mb-10 mt-8 md:mt-10"
            variant="primary-no-darkmode"
          >
            {buttonText}
          </ButtonLink>
        </div>
        <div className="flex w-full flex-1 flex-col items-stretch">
          {items.map((item) => (
            <LinkCard2ColumnItem
              key={item.title}
              {...item}
              homePage={homePage}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
