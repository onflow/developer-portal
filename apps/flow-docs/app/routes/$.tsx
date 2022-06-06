// import { InternalSidebar } from "@flow-docs/ui";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData, useCatch } from "@remix-run/react";
import {json} from '@remix-run/node'
import { getMdxPage, useMdxComponent } from "~/cms/utils/mdx";

// import { TEMP_SIDEBAR_CONFIG } from "@flow-docs/ui";

// const pathedRoutes = (path: string) => {
//   return true 
// }

function getContentPathForSlug(slug: string | undefined): [string, string] {
  if (!slug) return ["", ""];
  const repo = slug.split("/")[0];
  const fileOrDirPath = slug.split("/").slice(1).join("/");
  return [repo, fileOrDirPath];
}

// Provide meta tags for this page.
// - https://remix.run/api/conventions#meta
export const meta: MetaFunction = ({ data }) => {
  return { title: data.page.frontmatter.title };
};

// Provide stylesheet for this page.
// - https://remix.run/api/conventions#links
// export const links: LinksFunction = () => {
//   return [{ rel: "stylesheet", href: stylesUrl }];
// };

// Use this function to provide data for the route.
// - https://remix.run/api/conventions#loader
export const loader: LoaderFunction = async ({ params, request }) => {
  const [repo, fileOrDirPath] = getContentPathForSlug(params["*"]);

  // because this is our catch-all thing, we'll do an early return for anything
  // that has a other route setup. The response will be handled there.
  // if (pathedRoutes(new URL(request.url).pathname)) {
  //   return new Response()
  // }

  const page = await getMdxPage(
    {
      repo,
      fileOrDirPath,
    },
    { request, forceFresh: process.env.FORCE_REFRESH === "true" }
  );

  if (!page) {
    throw json({ noPage: true }, {status: 404 })
  }

  return {
    page,
  };
};

export default function () {
  const data = useLoaderData();
  const { code, frontmatter } = data.page;
  const Component = useMdxComponent({ code, frontmatter });

  return (
    <div className="flex flex-col md:flex-row">
      {/* <InternalSidebar config={TEMP_SIDEBAR_CONFIG} /> */}
      <Component />
    </div>
  );
}

export function CatchBoundary() {
  const caught = useCatch()
  console.error('CatchBoundary', caught)
  if (caught.data.noPage) {
    return <div>No Page</div>
  }
  throw new Error(`Unhandled error: ${caught.status}`)
}