import { RestEndpointMethodTypes } from "@octokit/plugin-rest-endpoint-methods";

export type CheckRunsRequest =
  RestEndpointMethodTypes["checks"]["listSuitesForRef"]["parameters"];
export type CheckRunsResponse =
  RestEndpointMethodTypes["checks"]["listSuitesForRef"]["response"];
export type CheckRuns = CheckRunsResponse["data"]["check_suites"];
export type CheckRun = CheckRuns[0];

export type CompareRequest =
  RestEndpointMethodTypes["repos"]["compareCommits"]["parameters"];
export type CompareResponse =
  RestEndpointMethodTypes["repos"]["compareCommits"]["response"];
export type Compare = CompareResponse["data"];

export type PullRequestRequest =
  RestEndpointMethodTypes["pulls"]["get"]["parameters"];
export type PullRequestResponse =
  RestEndpointMethodTypes["pulls"]["get"]["response"];
export type PullRequest = PullRequestResponse["data"];

export type PullRequestCommentsRequest =
  RestEndpointMethodTypes["pulls"]["listReviewComments"]["parameters"];
export type PullRequestCommentsResponse =
  RestEndpointMethodTypes["pulls"]["listReviewComments"]["response"];
export type PullRequestComments = PullRequestCommentsResponse["data"];
export type PullRequestComment = PullRequestComments[0];

export type PullRequestReviewsRequest =
  RestEndpointMethodTypes["pulls"]["listReviews"]["parameters"];
export type PullRequestReviewsResponse =
  RestEndpointMethodTypes["pulls"]["listReviews"]["response"];
export type PullRequestReviews = PullRequestReviewsResponse["data"];
export type PullRequestReview = PullRequestReviews[0];

export type SearchPullRequestListRequest =
  RestEndpointMethodTypes["search"]["issuesAndPullRequests"]["parameters"];
export type SearchPullRequestListResponse =
  RestEndpointMethodTypes["search"]["issuesAndPullRequests"]["response"];
export type SearchPullRequestList =
  SearchPullRequestListResponse["data"]["items"];
export type SearchPullRequestListItem = SearchPullRequestList[0];

export type MergePullRequestRequest =
  RestEndpointMethodTypes["pulls"]["merge"]["parameters"];
export type MergePullRequestResponse =
  RestEndpointMethodTypes["pulls"]["merge"]["response"];
export type MergePullRequestResult = MergePullRequestResponse["data"];
