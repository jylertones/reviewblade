import { compareAsc } from 'date-fns';
import { getAwaitingReviews } from './getAwaitingReviews';
import { getDisplayableReviews } from './getDisplayableReviews';
import type { PullRequestResponse } from '$lib/api/getPullRequest';
import type { ReviewResponse } from '$lib/api/getPullReviews';

export function getConsolidatedReviews(
	pullRequest: PullRequestResponse,
	pullRequestReviews: ReviewResponse,
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
