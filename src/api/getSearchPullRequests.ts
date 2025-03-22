import { createQuery } from "@tanstack/solid-query";
import {
  SearchPullRequestListRequest,
  SearchPullRequestListResponse,
} from "~/types/api";
import { octokit } from "~/utils/octokit";
import { QueryKeys } from "~/utils/queryKeys";
import { fiveMinutesMs } from "~/utils/staleTimes";

// export type PullRequestParameters =
//   Endpoints["GET /search/issues"]["parameters"];
// export type PullRequestResponse =
//   Endpoints["GET /search/issues"]["response"]["data"]["items"];

// export async function getPullRequests(parameters: PullRequestParameters) {
//   const getPullRequestApiUrl = `https://api.github.com/search/issues?q=${encodeURIComponent(parameters.q)}`;

//   const response = await request({
//     url: getPullRequestApiUrl,
//     method: "GET",
//   });

//   return (await response.json()).items as PullRequestResponse;
// }

export function getSearchPullRequests(params: SearchPullRequestListRequest) {
  return createQuery<SearchPullRequestListResponse>(() => ({
    queryKey: [QueryKeys.SEARCH_PULL_REQUESTS, params],
    queryFn: async () =>
      await octokit.rest.search.issuesAndPullRequests(params),
    staleTime: fiveMinutesMs,
  }));
}
