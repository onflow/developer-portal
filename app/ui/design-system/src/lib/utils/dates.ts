import { format, parseISO } from "date-fns"

export function dateYYMMDD(str: string) {
  const parsedDate = parseISO(str)
  return format(parsedDate, "yy/M/d")
}
