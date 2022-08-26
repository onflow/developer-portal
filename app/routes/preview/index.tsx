import type { ActionFunction } from "@remix-run/node"
import { useActionData, Form } from "@remix-run/react" // or cloudflare/deno
// import { redirect } from "@remix-run/node";
import parseGHUrl from "parse-github-url"
import { getMdxPage } from "~/cms/utils/mdx"
// function getPageData(formData: FormData) {
//     return {
//         id: 0
//     }
// }

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const values = Object.fromEntries(formData)
  const GH = parseGHUrl(values.previewHref as string)
  if (GH?.name && GH?.filepath) {
    const page = await getMdxPage(
      {
        source: data.source,
        path: data.contentPath,
      },
      { request, forceFresh: process.env.FORCE_REFRESH === "true" }
    )
  }
  // const pageData = await getPageData(formData);
}

export default function Preview() {
  const actionData = useActionData()

  return (
    <div>
      <div>
        <Form method="post" reloadDocument={false}>
          Paste path to file in Github:{" "}
          <input
            name="previewHref"
            className="text-primary-gray-dark"
            type="text"
          />
          <button>Preview</button>
        </Form>
        <>{JSON.stringify(actionData, null, 2)}</>
        {actionData?.errors?.description ? (
          <p style={{ color: "red" }}>{actionData.errors.description}</p>
        ) : null}
      </div>
    </div>
  )
}
