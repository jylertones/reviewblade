import {
  MergePullRequestRequest,
  MergePullRequestResponse,
  RetryCheckRunRequest,
  RetryCheckRunResponse,
} from "~/types/api";
import { createMutation, useQueryClient } from "@tanstack/solid-query";
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

export function retryCheckRun() {
  const queryClient = useQueryClient();

  return createMutation<RetryCheckRunResponse, Error, RetryCheckRunRequest>(
    () => ({
      mutationFn: async (params: RetryCheckRunRequest) =>
        await octokit.rest.checks.rerequestRun(params),

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
    }),
  );
}
