import type { LoaderFunction } from "@remix-run/node";
import type { FlipCellProps } from "../../../../../libs/design-system/dist/lib/Components/Flips/FlipCell";
export type LoaderData = FlipCellProps[];
import { Octokit } from "@octokit/core";

export const loader: LoaderFunction = async () => {
  const octokit = new Octokit({
    auth: process.env.PERSONAL_ACCESS_TOKEN,
  });

  const pullRequestResponse = await octokit
    .request("GET /repos/{owner}/{repo}/pulls", {
      owner: "onflow",
      repo: "flow",
    })
    .then((response) => response.data);

  // Fetch PRs from onflow/flow repo, then filter only PRs with 'Flip' labels
  const flipInfo = pullRequestResponse.filter((pr) =>
    pr.labels.filter((label) => label.name == "FLIP")
  );

  // Convert from github API output to FlipCellProp
  const flipCellProps: LoaderData = flipInfo.map((pr) => ({
    numComments: 0, // TODO: We need to create another API call for this
    heading: pr.title,
    tags: pr.labels.map((label) => label.name ?? ""), // TODO: fix null assertions
    participant: {
      profileImage: pr.user?.avatar_url ?? "", // TODO: fix null assertions
      name: pr.user?.login ?? "",
    },
    date: pr.created_at,
    forumLink: pr.html_url,
  }));

  return flipCellProps;
};
