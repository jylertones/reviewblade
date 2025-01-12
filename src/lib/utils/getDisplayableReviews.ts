import type { ReviewResponse } from '$lib/api/getPullReviews';
import { compareAsc } from 'date-fns';
import { reviewStateToTyped } from './reviewStateToTyped';

export function getDisplayableReviews(
	pullRequestReviews: ReviewResponse['data'],
) {
	return pullRequestReviews
		.filter(
			(review) =>
				review.body_html ||
				['APPROVED', 'CHANGES_REQUESTED'].includes(review.state),
		)
		.map((review) => ({
			name: review.user.login,
			state: reviewStateToTyped(review.state),
			submitted_at: review.submitted_at,
		}))
		.sort((r1, r2) => compareAsc(r1.submitted_at, r2.submitted_at));
}
