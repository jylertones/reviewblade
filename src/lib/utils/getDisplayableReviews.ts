import type { ReviewResponse } from '$lib/api/getPullReviews';
import { compareAsc } from 'date-fns';
import { reviewStateToTyped } from './reviewStateToTyped';
import type { AwaitingReview } from '$lib/types';

export function getDisplayableReviews(
	pullRequestReviews: ReviewResponse,
): AwaitingReview[] {
	return pullRequestReviews
		.filter(
			(review) =>
				review.user &&
				(review.body_html ||
					['APPROVED', 'CHANGES_REQUESTED'].includes(review.state)),
		)
		.map((review) => ({
			name: review.user!.login,
			state: reviewStateToTyped(review.state),
			submittedAt: review.submitted_at
				? new Date(review.submitted_at)
				: new Date(),
		}))
		.sort((r1, r2) => compareAsc(r2.submittedAt, r1.submittedAt));
}
