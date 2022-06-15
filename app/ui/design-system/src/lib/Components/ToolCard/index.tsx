import { ReactComponent as StarIcon } from "../../../../images/action/star"
import PortIconSrc from "../../../../images/tools/tool-port.svg"
import CliIconSrc from "../../../../images/tools/tool-cli.svg"
import FclIconSrc from "../../../../images/tools/tool-fcl.svg"
import EmulatorIconSrc from "../../../../images/tools/tool-emulator.svg"
import VsCodeIconSrc from "../../../../images/tools/tool-vscode.svg"
import TestingIconSrc from "../../../../images/tools/tool-testing.svg"
import Tag from "../Tag"

export const TOOL_ICONS = {
  port: PortIconSrc,
  cli: CliIconSrc,
  fcl: FclIconSrc,
  emulator: EmulatorIconSrc,
  vscode: VsCodeIconSrc,
  testing: TestingIconSrc,
}

export type ToolIcon =
  | { iconSrc: string; iconType?: never }
  | { iconSrc?: never; iconType: keyof typeof TOOL_ICONS }

export type ToolCardProps = {
  title: string
  authorIcon: string
  authorName: string
  tags: string[]
  link: string
  stars: number
  description: string
} & ToolIcon

export function ToolCard({
  title,
  authorIcon,
  authorName,
  tags,
  link,
  stars,
  iconType,
  iconSrc,
  description,
}: ToolCardProps) {
  return (
    <a
      className="flex gap-4 rounded-lg bg-white py-6 px-8 hover:shadow-2xl dark:bg-primary-gray-dark dark:hover:shadow-2xl-dark"
      href={link}
    >
      <div>
        <img
          src={iconType ? TOOL_ICONS[iconType] : iconSrc}
          alt={title}
          width={64}
        />
      </div>
      <div className="grow">
        <h5 className="text-h5">{title}</h5>
        <div className="flex items-center">
          <div className="flex shrink-0 items-center gap-2 pr-3 md:pr-4">
            <div className="h-6 w-6">
              <img src={authorIcon} alt={authorName} className="w-full" />
            </div>
            <div className="dark:gray-400 md:leading-1 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
              {authorName}
            </div>
          </div>
          <div className="shrink-0 pr-1 line-clamp-1">
            {tags.map((tag, i) => (
              <Tag name={tag} key={i} />
            ))}
          </div>
          <div className="flex shrink-0 items-center">
            <StarIcon className="scale-50 text-amber-400" />
            <div className="text-sm text-gray-500 dark:text-gray-300">
              {stars}
            </div>
          </div>
        </div>
        <div className="pt-2 text-gray-700 line-clamp-2 dark:text-gray-300">
          {description}
        </div>
      </div>
    </a>
  )
}
