import {
  PullRequestCommentsRequest,
  PullRequestCommentsResponse,
} from "~/types/api";
import { createQuery } from "@tanstack/solid-query";
import { QueryKeys } from "~/utils/queryKeys";
import { octokit } from "~/utils/octokit";
import { fiveMinutesMs } from "~/utils/staleTimes";

// export type GetPullRequsetCommentsParams = {
//   owner: string;
//   repo: string;
//   pullNumber: number;
// };

// export type PullRequestCommentsResponse =
//   Endpoints["GET /repos/{owner}/{repo}/pulls/{pull_number}/comments"]["response"]["data"];

// export async function _getPullRequestComments({
//   owner,
//   repo,
//   pullNumber,
// }: GetPullRequsetCommentsParams) {
//   const getPullRequestCommentsApiUrl = `https://api.github.com/repos/${owner}/${repo}/pulls/${pullNumber}/comments`;

//   const response = await request({
//     url: getPullRequestCommentsApiUrl,
//     method: "GET",
//     headers: {
//       Accept: "application/vnd.github.full+json",
//     },
//   });

//   return (await response.json()) as PullRequestCommentsResponse;
// }

export function getPullRequestComments(
  params: PullRequestCommentsRequest,
  queryParams?: { enabled?: boolean },
) {
  return createQuery<PullRequestCommentsResponse>(() => ({
    queryKey: [QueryKeys.PULL_REQUEST_COMMENTS, params],
    queryFn: async () => await octokit.rest.pulls.listReviewComments(params),
    staleTime: fiveMinutesMs,
    ...queryParams,
  }));
}
