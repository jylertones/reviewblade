import { RestEndpointMethodTypes } from "@octokit/plugin-rest-endpoint-methods";
import {
  createQuery,
  DefinedInitialDataOptions,
  UndefinedInitialDataOptions,
} from "@tanstack/solid-query";
import { CheckRunsRequest, CheckRunsResponse } from "~/types/api";
import { octokit } from "~/utils/octokit";
import { QueryKeys } from "~/utils/queryKeys";
import { oneMinuteMs } from "~/utils/staleTimes";

// export async function _getCheckRuns({ owner, repo, ref }: GetCheckRunsParams) {
//   return;

//   const getCheckSuitesApiUrl = `https://api.github.com/repos/${owner}/${repo}/commits/${head}/check-runs?per_page=100`;

//   const response = await request({
//   	url: getCheckSuitesApiUrl,
//   	method: 'GET',
//   });

//   return (await response.json()) as CheckRunsResponse;
// }

export function getCheckRuns(
  params: CheckRunsRequest,
  queryOptions?: { enabled?: boolean },
) {
  return createQuery<CheckRunsResponse>(() => ({
    queryKey: [QueryKeys.CHECK_RUNS, params],
    queryFn: async () =>
      await octokit.rest.checks.listForRef({
        owner: params.owner,
        repo: params.repo,
        ref: params.ref,
      }),
    enabled: queryOptions?.enabled,
    staleTime: oneMinuteMs,
  }));
}
