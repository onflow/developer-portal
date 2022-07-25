import displayNames from "../route-data/display-names"

export const getDisplayName = (route: string): string => {
  const name = displayNames[route]
  return name ? name : route
}
