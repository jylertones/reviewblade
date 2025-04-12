import { createMutation, useQueryClient } from "@tanstack/solid-query";
import {
  RerunWorkflowFailedJobsRequest,
  RerunWorkflowFailedJobsResponse,
} from "~/types/api";
import { octokit } from "~/utils/octokit";
import { QueryKeys } from "~/utils/queryKeys";

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

export function retryWorkflowFailedJobs() {
  const queryClient = useQueryClient();

  return createMutation<
    RerunWorkflowFailedJobsResponse,
    Error,
    RerunWorkflowFailedJobsRequest
  >(() => ({
    mutationFn: async (params: RerunWorkflowFailedJobsRequest) =>
      await octokit.rest.actions.reRunWorkflowFailedJobs(params),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.CHECK_RUNS],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.PULL_REQUEST],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.SEARCH_PULL_REQUESTS],
      });
    },
  }));
}
