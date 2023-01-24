import { afterAll, afterEach, beforeAll, beforeEach, expect } from "vitest"
import { compileMdx } from "~/cms/compile.mdx.server"

beforeAll(() => {})

afterAll(() => {})

afterEach(() => {})

beforeEach(() => {})

it("Test parse no comment mdx", async () => {
  const mdxData = `# Transaction Lifecycle 
  This document walks through each stage of a transaction's lifecycle as it moves through the Flow network.
  **Table of Contents**
  `
  const page = await compileMdx(
    {
      path: "/path/to/file",
      textContent: mdxData,
    },
    []
  )
  expect(page.code).not.toContain("DON'T EDIT THIS SECTION")
}, 15000)

it("Test parse <!-- comment mdx", async () => {
  const mdxData = `# Transaction Lifecycle 
  This document walks through each stage of a transaction's lifecycle as it moves through the Flow network.
  
  <!--- START doctoc generated TOC please keep comment here to allow auto update --->
  <!--- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE --->
  **Table of Contents**
  `
  const page = await compileMdx(
    {
      path: "/path/to/file",
      textContent: mdxData,
    },
    []
  )

  expect(page.code).not.toContain("DON'T EDIT THIS SECTION")
}, 15000)

it("Test parse <!-- comment mdx", async () => {
  const mdxData = `# Transaction Lifecycle 
  This document walks through each stage of a transaction's lifecycle as it moves through the Flow network.
  
  <!-- START doctoc generated TOC please keep comment here to allow auto update -->
  <!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
  **Table of Contents**
  `
  const page = await compileMdx(
    {
      path: "/path/to/file",
      textContent: mdxData,
    },
    []
  )
  expect(page.code).not.toContain("DON'T EDIT THIS SECTION")
}, 15000)
