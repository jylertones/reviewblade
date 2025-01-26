import type { CheckRunsResponse } from '$lib/api/getCheckRuns';
import type { PullRequestResponse } from '$lib/api/getPullRequest';
import type { ReviewResponse } from '$lib/api/getPullReviews';

export type PullRequestMergeState = 'checks_fail' | 'ready' | '';

const BAD_RUN_CONCLUSIONS = ['failure', 'timed_out', 'action_required', null];

export function getPullRequestMergeState({
	pullRequest,
	reviews,
	checkRuns,
}: {
	pullRequest: PullRequestResponse;
	reviews: ReviewResponse['data'];
	checkRuns: CheckRunsResponse;
}) {
	// It's possible that the pull request doesn't need checks or approvals to pass
	if (pullRequest.mergeable && pullRequest.mergeable_state === 'clean') {
		return 'ready';
	}

	if (
		checkRuns.check_runs.some(
			(run) =>
				run.status !== 'completed' ||
				BAD_RUN_CONCLUSIONS.includes(run.conclusion),
		)
	) {
		return 'checks_fail';
	}

	if (!reviews.some((review) => review.state === 'APPROVED')) {
		return 'needs_review';
	}

	if (!pullRequest.mergeable) {
		return pullRequest.mergeable_state;
	}

	return 'ready';
}
