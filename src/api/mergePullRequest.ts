import {
  MergePullRequestRequest,
  MergePullRequestResponse,
} from "~/types/types";
import { createMutation } from "@tanstack/solid-query";
import { octokit } from "~/utils/octokit";

// export type MergePullRequestParams = {
//   owner: string;
//   repo: string;
//   pullNumber: number;
// };

// export type MergePullRequestResponse =
//   Endpoints["PUT /repos/{owner}/{repo}/pulls/{pull_number}/merge"]["response"]["data"];

// export async function mergePullRequest({
//   owner,
//   repo,
//   pullNumber,
// }: MergePullRequestParams) {
//   const mergePullRequestApiUrl = `https://api.github.com/repos/${owner}/${repo}/pulls/${pullNumber}/merge`;

//   const response = await request({
//     url: mergePullRequestApiUrl,
//     method: "PUT",
//   });

//   return (await response.json()) as MergePullRequestResponse;
// }

export function mergePullRequest() {
  return createMutation<
    MergePullRequestResponse,
    Error,
    MergePullRequestRequest
  >(() => ({
    mutationFn: async (params: MergePullRequestRequest) =>
      await octokit.rest.pulls.merge(params),
  }));
}
