import type { PullRequestResponse } from '$lib/api/getPullRequest';
import type { PullRequestApprovalState } from '$lib/constants/reviews';

type AwaitingReview = {
	name: string;
	state: PullRequestApprovalState;
};

export function getAwaitingReviews(
	pullRequest: PullRequestResponse,
): AwaitingReview[] {
	const result: AwaitingReview[] = [];

	pullRequest.requested_reviewers?.forEach((reviewer) => {
		result.push({
			name: reviewer.login,
			state: 'waiting',
		});
	});

	pullRequest.requested_teams?.forEach((reviewer) => {
		result.push({
			name: reviewer.name,
			state: 'waiting',
		});
	});

	return result;
}
