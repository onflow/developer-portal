import displayNames from "../route-presets/display-names"

export const getDisplayName = (route: string): string => {
  const name = displayNames[route]
  return name ? name : route
}
