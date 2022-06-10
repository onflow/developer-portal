// TODO: Merge with Tag in pr #1

export type TagProps = {
  name: string
}

const Tag = ({ name }: TagProps) => (
  <span className="mr-2 rounded bg-primary-gray-50 px-1 py-1 font-mono text-xs text-primary-blue dark:bg-black dark:text-blue-dark">
    #{name}
  </span>
)

export default Tag
