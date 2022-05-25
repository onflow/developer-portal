import { useState } from "react"
import { TextInput } from "./text-input"

export function SearchBar({
  onSubmit
}: {
  onSubmit: (text: string) => void
}) {
  const [value, setValue] = useState<string>("")
  return (
    <form
      className="mb-8"
      onSubmit={(e) => {
        onSubmit(value)
        e.preventDefault()
      }
    }>
      <div className="relative">
      <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
      <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
      </div>
      <TextInput
        value={value}
        updateValue={setValue}
        placeholder={"e.g. 0x123456abcdefg"}
      />
      <button
        type="submit"
        className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Submit
        </button>
      </div>
    </form>
  )
}





