import { expect, test, describe } from "vitest"
import {
  stripSlahes,
  stripStartingSlahes,
  stripTrailingSlahes,
} from "./strip-slashes"

describe("stripSlahes", () => {
  test("Single starting slash", () => {
    expect(stripSlahes("/foo")).toEqual("foo")
  })

  test("Multiple starting slashes", () => {
    expect(stripSlahes("///foo")).toEqual("foo")
  })

  test("Single trailing slashes", () => {
    expect(stripSlahes("foo/")).toEqual("foo")
  })

  test("Multiple trailing slashes", () => {
    expect(stripSlahes("foo////")).toEqual("foo")
  })

  test("Intermediate slashes", () => {
    expect(stripSlahes("//foo/bar//bazz//")).toEqual("foo/bar/bazz")
  })
})

describe("stripStartingSlahes", () => {
  test("Single starting slash", () => {
    expect(stripStartingSlahes("/foo")).toEqual("foo")
  })

  test("Multiple starting slashes", () => {
    expect(stripStartingSlahes("///foo")).toEqual("foo")
  })

  test("Intermediate slashes", () => {
    expect(stripStartingSlahes("//foo/bar//bazz//")).toEqual("foo/bar//bazz//")
  })
})

describe("stripTrailingSlahes", () => {
  test("Single trailing slashes", () => {
    expect(stripTrailingSlahes("foo/")).toEqual("foo")
  })

  test("Multiple trailing slashes", () => {
    expect(stripTrailingSlahes("foo////")).toEqual("foo")
  })

  test("Intermediate slashes", () => {
    expect(stripTrailingSlahes("//foo/bar//bazz//")).toEqual("//foo/bar//bazz")
  })
})
