import { parseVersions } from "./versions.server"

test(`parseVersions with valid input`, () => {
  expect(parseVersions(["1.2.3", "4.5.6"])).toMatchInlineSnapshot(`
    Array [
      "1.2.3",
      "4.5.6",
    ]
  `)
})

test(`parseVersions invalid input`, () => {
  expect(() => parseVersions(["foo", "bar"]))
    .toThrowErrorMatchingInlineSnapshot(`
    "[
      {
        \\"validation\\": \\"regex\\",
        \\"code\\": \\"invalid_string\\",
        \\"message\\": \\"Invalid\\",
        \\"path\\": [
          0
        ]
      },
      {
        \\"validation\\": \\"regex\\",
        \\"code\\": \\"invalid_string\\",
        \\"message\\": \\"Invalid\\",
        \\"path\\": [
          1
        ]
      }
    ]"
  `)
})

test(`parseVersions invalid input`, () => {
  expect(() => parseVersions([1, 2, 3])).toThrowErrorMatchingInlineSnapshot(`
    "[
      {
        \\"code\\": \\"invalid_type\\",
        \\"expected\\": \\"string\\",
        \\"received\\": \\"number\\",
        \\"path\\": [
          0
        ],
        \\"message\\": \\"Expected string, received number\\"
      },
      {
        \\"code\\": \\"invalid_type\\",
        \\"expected\\": \\"string\\",
        \\"received\\": \\"number\\",
        \\"path\\": [
          1
        ],
        \\"message\\": \\"Expected string, received number\\"
      },
      {
        \\"code\\": \\"invalid_type\\",
        \\"expected\\": \\"string\\",
        \\"received\\": \\"number\\",
        \\"path\\": [
          2
        ],
        \\"message\\": \\"Expected string, received number\\"
      }
    ]"
  `)
})

test(`parseVersions empty input`, () => {
  expect(() => parseVersions([])).toThrowErrorMatchingInlineSnapshot(`
    "[
      {
        \\"code\\": \\"too_small\\",
        \\"minimum\\": 1,
        \\"type\\": \\"array\\",
        \\"inclusive\\": true,
        \\"message\\": \\"Array must contain at least 1 element(s)\\",
        \\"path\\": []
      }
    ]"
  `)
})
