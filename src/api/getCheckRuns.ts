import { RestEndpointMethodTypes } from "@octokit/plugin-rest-endpoint-methods";
import { createQuery } from "@tanstack/solid-query";
import { CheckRunsRequest, CheckRunsResponse } from "~/types/types";
import { octokit } from "~/utils/octokit";
import { QueryKeys } from "~/utils/queryKeys";

// export async function _getCheckRuns({ owner, repo, ref }: GetCheckRunsParams) {
//   return;

//   const getCheckSuitesApiUrl = `https://api.github.com/repos/${owner}/${repo}/commits/${head}/check-runs?per_page=100`;

//   const response = await request({
//   	url: getCheckSuitesApiUrl,
//   	method: 'GET',
//   });

//   return (await response.json()) as CheckRunsResponse;
// }

export function getCheckRuns(params: CheckRunsRequest) {
  return createQuery<CheckRunsResponse>(() => ({
    queryKey: [QueryKeys.CHECK_RUNS, params],
    queryFn: async () =>
      await octokit.rest.checks.listSuitesForRef({
        owner: params.owner,
        repo: params.repo,
        ref: params.ref,
      }),
  }));
}
