import { vi } from "vitest"

vi.mock("downloadFiles", () => {
  return (fileData: any) => {
    console.log("downloadin' files ...", fileData)
  }
})

it("is the beginning of tests...", () => {
  console.log("yes")
})
