import { PullRequest } from "~/types/api";
import { AwaitingReview } from "~/types/local";

export function getAwaitingReviews(pullRequest: PullRequest): AwaitingReview[] {
  const result: AwaitingReview[] = [];

  pullRequest.requested_reviewers?.forEach((reviewer) => {
    result.push({
      name: reviewer.login,
      state: "waiting",
    });
  });

  pullRequest.requested_teams?.forEach((reviewer) => {
    result.push({
      name: reviewer.name,
      state: "waiting",
    });
  });

  return result;
}
