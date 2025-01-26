import type { CheckRunsResponse } from '$lib/api/getCheckRuns';
import type { PullRequestResponse } from '$lib/api/getPullRequest';
import type { ReviewResponse } from '$lib/api/getPullReviews';

export type PullRequestMergeState = 'checks_fail' | 'ready' | '';

const BAD_RUN_CONCLUSIONS = ['failure', 'timed_out', 'action_required', null];

export function getPullRequestMergeState({
	pullRequest,
}: {
	pullRequest: PullRequestResponse;
}) {
	// It's possible that the pull request doesn't need checks or approvals to pass
	if (pullRequest.mergeable && pullRequest.mergeable_state === 'clean') {
		return 'ready';
	}

	if (pullRequest.mergeable_state === 'unstable') {
		return 'checks_fail';
	}

	if (pullRequest.mergeable_state === 'blocked') {
		return 'needs_review';
	}

	if (!pullRequest.mergeable) {
		return pullRequest.mergeable_state;
	}

	return 'ready';
}
