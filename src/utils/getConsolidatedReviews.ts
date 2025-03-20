import { compareAsc } from "date-fns";
import { PullRequest, PullRequestReviews } from "~/types/api";
import { getAwaitingReviews } from "./getAwaitingReviews";
import { getDisplayableReviews } from "./getDisplayableReviews";

export function getConsolidatedReviews(
  pullRequest: PullRequest,
  pullRequestReviews: PullRequestReviews,
) {
  return [
    ...getAwaitingReviews(pullRequest),
    ...getDisplayableReviews(pullRequestReviews),
  ]
    .sort((reviewA, reviewB) =>
      compareAsc(
        reviewB.submittedAt ?? new Date(),
        reviewA.submittedAt ?? new Date(),
      ),
    )
    .filter((review, index, array) => {
      const firstReviewWithName = array.findIndex(
        (r) => r.name === review.name,
      );
      return index === firstReviewWithName;
    });
}
