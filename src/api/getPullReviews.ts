import { createQuery } from "@tanstack/solid-query";
import {
  PullRequestReviewsRequest,
  PullRequestReviewsResponse,
} from "~/types/api";
import { octokit } from "~/utils/octokit";
import { QueryKeys } from "~/utils/queryKeys";
import { fiveMinutesMs } from "~/utils/staleTimes";

// export type ReviewParameters =
//   Endpoints["GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews"]["parameters"];
// export type ReviewResponse =
//   Endpoints["GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews"]["response"]["data"];

// export async function getPullReviews(
//   parameters: ReviewParameters,
// ): Promise<ReviewResponse> {
//   const getReviewRequestApiUrl = `https://api.github.com/repos/${parameters.owner}/${parameters.repo}/pulls/${parameters.pull_number}/reviews`;

//   const response = await request({
//     url: getReviewRequestApiUrl,
//     method: "GET",
//     headers: {
//       Accept: "application/vnd.github.full+json",
//     },
//   });

//   return (await response.json()) as ReviewResponse;
// }

export function getPullReviews(
  params: PullRequestReviewsRequest,
  queryParams?: { enabled?: boolean },
) {
  return createQuery<PullRequestReviewsResponse>(() => ({
    queryKey: [QueryKeys.PULL_REVIEWS, params],
    queryFn: async () => await octokit.rest.pulls.listReviews(params),
    staleTime: fiveMinutesMs,
    ...queryParams,
  }));
}
