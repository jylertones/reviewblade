import type { PullRequestApprovalState } from '$lib/constants/reviews';

export function reviewStateToTyped(
	rawReviewState:
		| string
		| 'CHANGES_REQUESTED'
		| 'COMMENTED'
		| 'APPROVED'
		| 'PENDING',
): PullRequestApprovalState {
	switch (rawReviewState) {
		case 'APPROVED':
			return 'approved';
		case 'CHANGES_REQUESTED':
			return 'changes_requested';
		case 'COMMENTED':
			return 'commented';
	}

	return 'waiting';
}
