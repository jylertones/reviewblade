import type { PullRequestResponse } from '$lib/api/getPullRequest';

export type PullRequestMergeState = 'checks_fail' | 'ready' | '';

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
