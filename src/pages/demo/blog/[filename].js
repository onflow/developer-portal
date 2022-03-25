// THIS FILE HAS BEEN GENERATED WITH THE TINA CLI.
// This is a demo file once you have tina setup feel free to delete this file

import { staticRequest } from "tinacms";

import { TinaMarkdown } from "tinacms/dist/rich-text";

// The `props` here are based off our custom "Cta" MDX component
const Cta = (props) => {
  return <h2>{props.heading}</h2>;
};

// Be sure to provide the appropriate components for each template you define
const components = {
  Cta: Cta
};

export default function MyPage(props) {
  return (
    <div>
      <TinaMarkdown
        components={components}
        content={props.data.getPostDocument.data.body}
      />
    </div>
  );
}

// See /docs/features/data-fetching/ for more info on our getStaticProps/getStaticPaths data-fetching with NextJS
export const getStaticPaths = async () => {
  const tinaProps = await staticRequest({
    query: `{
        getPostList{
          edges {
            node {
              sys {
                filename
              }
            }
          }
        }
      }`,
    variables: {}
  });

  const paths = tinaProps.getPostList.edges.map((x) => {
    return { params: { filename: x.node.sys.filename } };
  });

  return {
    paths,
    fallback: "blocking"
  };
};

export const getStaticProps = async (ctx) => {
  const query = `query BlogPostQuery($relativePath: String!) {
    getPostDocument(relativePath: $relativePath) {
      data {
        title
        body
      }
    }
  }
  `;
  const variables = {
    relativePath: ctx.params.filename + ".mdx"
  };
  let data = {};

  data = await staticRequest({
    query,
    variables
  });

  return {
    props: {
      data,
      query,
      variables
    }
  };
};
