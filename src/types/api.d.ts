import { RestEndpointMethodTypes } from "@octokit/plugin-rest-endpoint-methods";

export type CheckRunsRequest =
  RestEndpointMethodTypes["checks"]["listForRef"]["parameters"];
export type CheckRunsResponse =
  RestEndpointMethodTypes["checks"]["listForRef"]["response"];
export type CheckRuns = CheckRunsResponse["data"]["check_runs"];
export type CheckRun = CheckRuns[0];

export type CompareRequest =
  RestEndpointMethodTypes["repos"]["compareCommits"]["parameters"];
export type CompareResponse =
  RestEndpointMethodTypes["repos"]["compareCommits"]["response"];
export type Compare = CompareResponse["data"];
export type File = NonNullable<Compare["files"]>[0];

export type PullRequestRequest =
  RestEndpointMethodTypes["pulls"]["get"]["parameters"];
export type PullRequestResponse =
  RestEndpointMethodTypes["pulls"]["get"]["response"];
export type PullRequest = PullRequestResponse["data"] & { body_html?: string };

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

export type RerunWorkflowFailedJobsRequest =
  RestEndpointMethodTypes["actions"]["reRunWorkflowFailedJobs"]["parameters"];
export type RerunWorkflowFailedJobsResponse =
  RestEndpointMethodTypes["actions"]["reRunWorkflowFailedJobs"]["response"];

export type RerunWorkflowJobRequest =
  RestEndpointMethodTypes["actions"]["reRunJobForWorkflowRun"]["parameters"];
export type RerunWorkflowJobResponse =
  RestEndpointMethodTypes["actions"]["reRunJobForWorkflowRun"]["response"];
