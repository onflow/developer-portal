import React from "react"
export function InternalPage() {
  return (
    <div className="mdx-content">
      <table>
        <thead>
          <tr>
            <th align="left">Node Operator</th>
            <th align="left">SDKs</th>
            <th align="left">TOOLS</th>
            <th align="left">Left-aligned</th>
            <th align="center">Center-aligned</th>
            <th align="right">Right-aligned</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td align="left">Text</td>
            <td align="left">Text</td>
            <td align="left">Text</td>
            <td align="left">git status</td>
            <td align="center">git status</td>
            <td align="right">git status</td>
          </tr>
          <tr>
            <td align="left">Text</td>
            <td align="left">Text</td>
            <td align="left">Text</td>
            <td align="left">git diff</td>
            <td align="center">git diff</td>
            <td align="right">git diff</td>
          </tr>
        </tbody>
      </table>

      <br />

      <p>
        This is a reference
        <sup>
          <a href="#user-content-fn-1">
            <span className="mr-1 undefined">[1]</span>
          </a>
        </sup>
      </p>

      <p>
        This is another reference
        <sup>
          <a href="#user-content-fn-1">
            <span className="mr-1 undefined">[1]</span>
          </a>
        </sup>
      </p>

      <section data-footnotes="true" className="footnotes">
        <h2 id="footnotes" className="mt-6 mb-6 text-2xl font-semibold sr-only">
          <div className="flex group -ml-11">
            <a
              href="#footnotes"
              title="Footnotes"
              className="flex items-center justify-center w-8 h-8 mr-3 scale-75 bg-gray-100 rounded-md hover:bg-gray-200 group-hover:visible dark:bg-primary-gray-dark dark:hover:bg-gray-700 md:invisible md:scale-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  fill="#3B3CFF"
                  d="M9.778 13.511L8.41 14.867a2.222 2.222 0 01-3.122 0 2.178 2.178 0 010-3.084L7.894 9.2a2.222 2.222 0 013.123 0c.264.263.456.59.555.95.055-.045.105-.095.15-.15l.717-.711a3.273 3.273 0 00-.64-.9 3.334 3.334 0 00-4.688 0L4.5 10.994a3.283 3.283 0 000 4.662 3.333 3.333 0 004.689 0l2.028-2.012h-.278a4.441 4.441 0 01-1.161-.133z"
                ></path>
                <path
                  fill="#3B3CFF"
                  d="M15.894 4.344a3.333 3.333 0 00-4.688 0L9.178 6.356h.272c.394 0 .786.052 1.167.155l1.366-1.355a2.222 2.222 0 013.122 0 2.178 2.178 0 010 3.083L12.5 10.822a2.222 2.222 0 01-3.122 0 2.144 2.144 0 01-.556-.95c-.055.038-.107.08-.155.128l-.717.711c.16.334.376.639.639.9a3.333 3.333 0 004.689 0l2.605-2.583a3.29 3.29 0 000-4.661l.011-.023z"
                ></path>
              </svg>
            </a>
            Footnotes
          </div>
        </h2>
        <ol>
          <li id="user-content-fn-1">
            <p>
              This is a reference{' '}
              <a href="#user-content-fnref-1">
                <span className="mr-1 data-footnote-backref">↩</span>
              </a>
            </p>
          </li>
          <li id="user-content-fn-1">
            <p>
              This is another reference{' '}
              <a href="#user-content-fnref-2">
                <span className="mr-1 data-footnote-backref">↩</span>
              </a>
            </p>
          </li>
        </ol>
      </section>
    </div>
  );
}
