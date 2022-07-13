import { getRepoVersions } from "./versions.server"

test("version", async () => {
  const result = await getRepoVersions("onflow", "mock-developer-doc")
  expect(result).toMatchInlineSnapshot(`
    Array [
      "2.0.0",
      "1.1.0",
    ]
  `)
})
