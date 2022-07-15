import { expect, it } from "vitest"
import { markdownToToc } from "./generate-toc"

it(`simple case`, () => {
  let subject = `
# Acme

beta

## Charlie

delta

## Echo

end

  `

  expect(markdownToToc(subject)).toMatchInlineSnapshot(`
    [
      {
        "hash": "#acme",
        "title": "Acme",
      },
      {
        "hash": "#charlie",
        "title": "Charlie",
      },
      {
        "hash": "#echo",
        "title": "Echo",
      },
    ]
  `)
})

it(`simple case with frontmatter`, () => {
  let subject = `---
title: Example
---

# Acme

beta

## Charlie

delta

## Echo

end
  `

  expect(markdownToToc(subject)).toMatchInlineSnapshot(`
    [
      {
        "hash": "#acme",
        "title": "Acme",
      },
      {
        "hash": "#charlie",
        "title": "Charlie",
      },
      {
        "hash": "#echo",
        "title": "Echo",
      },
    ]
  `)
})

it(`backticks`, () => {
  let subject = `
## Avoid using \`AuthAccount\` as a function parameter
bar
  `

  expect(markdownToToc(subject)![0]!.title).toBe(
    `Avoid using AuthAccount as a function parameter`
  )
})
