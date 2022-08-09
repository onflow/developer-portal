import { expect, test } from "vitest"
import { findMostSpecificPath } from "./find-most-specific-path"

test.each<{
  /**
   * Descriptive name for the test
   */
  name: string

  /**
   * The path to check for a match against.
   */
  pathToMatch: string

  /**
   * The list of paths to check against.
   */
  paths: string[]

  /**
   * The expected result
   */
  expected: string | undefined
}>([
  {
    name: "Multiple possible matches, more specific, not exact",
    pathToMatch: "foo/bar/baz/buzz/something",
    paths: ["foo", "foo/bar", "foo/bar/baz/buzz"],
    expected: "foo/bar/baz/buzz",
  },
  {
    name: "Multiple possible matches, more specific and exact",
    pathToMatch: "foo/bar/baz/buzz",
    paths: ["foo", "foo/bar", "foo/bar/baz/buzz"],
    expected: "foo/bar/baz/buzz",
  },
  {
    name: "Multiple possible matches, less specific",
    pathToMatch: "foo/bar/baz",
    paths: ["foo", "foo/bar", "foo/bar/baz/buzz"],
    expected: "foo/bar",
  },
  {
    name: "Trailing slash",
    pathToMatch: "foo/bar/",
    paths: ["foo", "foo/bar", "foo/bar/baz/buzz"],
    expected: "foo/bar",
  },
  {
    name: "Trailing slash with exact match",
    pathToMatch: "foo/bar/",
    paths: ["foo", "foo/bar", "foo/bar/", "foo/bar/baz/buzz"],
    expected: "foo/bar/",
  },
  {
    name: "No match",
    pathToMatch: "blah",
    paths: ["foo", "foo/bar", "foo/bar/baz/buzz"],
    expected: undefined,
  },
  {
    name: "Absolute paths with relative input",
    pathToMatch: "a/b",
    paths: ["/a", "/a/b", "/a/b/c", "x/y/z"],
    expected: undefined,
  },
  {
    name: "Absolute paths with absolute input",
    pathToMatch: "/a/b",
    paths: ["/a", "/a/b", "/a/b/c", "x/y/z"],
    expected: "/a/b",
  },
  {
    name: "Root path",
    pathToMatch: "variable-transaction-fees",
    paths: ["", "foo/bar"],
    expected: "",
  },
])("$name", ({ pathToMatch, paths, expected }) => {
  expect(findMostSpecificPath(pathToMatch, paths)).toEqual(expected)
})
