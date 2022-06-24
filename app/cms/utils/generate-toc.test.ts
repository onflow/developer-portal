import { markdownToToc } from "./generate-toc"

test(`simple case`, () => {
  let subject = `
# Acme

beta

## Charlie

delta

## Echo

end

  `

  expect(markdownToToc(subject)).toMatchInlineSnapshot(`
    Array [
      Object {
        "hash": "#acme",
        "title": "Acme",
      },
      Object {
        "hash": "#charlie",
        "title": "Charlie",
      },
      Object {
        "hash": "#echo",
        "title": "Echo",
      },
    ]
  `)
})

test(`backticks`, () => {
  let subject = `
## Avoid using \`AuthAccount\` as a function parameter
bar
  `

  expect(markdownToToc(subject)![0].title).toBe(
    `Avoid using AuthAccount as a function parameter`
  )
})
