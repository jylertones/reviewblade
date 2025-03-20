import { PullRequestRequest, PullRequestResponse } from "~/types/api";
import { createQuery } from "@tanstack/solid-query";
import { QueryKeys } from "~/utils/queryKeys";
import { octokit } from "~/utils/octokit";

// export type GetPullRequestParams = {
//   owner: string;
//   repo: string;
//   pullNumber: number;
// };

// export type PullRequestResponse =
//   Endpoints["GET /repos/{owner}/{repo}/pulls/{pull_number}"]["response"]["data"] & {
//     body_html: string;
//   };

// export async function _getPullRequest({
//   owner,
//   repo,
//   pullNumber,
// }: GetPullRequestParams) {
//   const getPullRequestApiUrl = `https://api.github.com/repos/${owner}/${repo}/pulls/${pullNumber}`;

//   const response = await request({
//     url: getPullRequestApiUrl,
//     method: "GET",
//     headers: {
//       Accept: "application/vnd.github.full+json",
//     },
//   });

//   return (await response.json()) as PullRequestResponse;
// }

export function getPullRequest(params: PullRequestRequest) {
  return createQuery<PullRequestResponse>(() => ({
    queryKey: [QueryKeys.PULL_REQUEST, params],
    queryFn: async () =>
      await octokit.rest.pulls.get({
        ...params,
        mediaType: { format: "full" },
      }),
  }));
}
