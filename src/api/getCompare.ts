import { createQuery } from "@tanstack/solid-query";
import { QueryKeys } from "~/utils/queryKeys";
import { octokit } from "~/utils/octokit";
import { CompareRequest, CompareResponse } from "~/types/api";

export type GetCompareParams = {
  owner: string;
  repo: string;
  base: string;
  head: string;
};

// export async function _getCompare({
//   owner,
//   repo,
//   base,
//   head,
// }: GetCompareParams) {
//   const getCompareApiUrl = `https://api.github.com/repos/${owner}/${repo}/compare/${base}...${head}`;

//   const response = await request({
//     url: getCompareApiUrl,
//     method: "GET",
//   });

//   return (await response.json()) as CompareResponse;
// }

export function getCompare(
  params: CompareRequest,
  queryParams?: { enabled: boolean },
) {
  return createQuery<CompareResponse>(() => ({
    queryKey: [QueryKeys.COMPARE, params],
    queryFn: async () =>
      await octokit.rest.repos.compareCommits({
        owner: params.owner,
        repo: params.repo,
        base: params.base,
        head: params.head,
      }),
    enabled: queryParams?.enabled,
  }));
}
