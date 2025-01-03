export type PullRequestApprovalState = 'approved' | 'waiting' | 'changes_requested' | 'commented';

export type CheckRunConclusion =
	| 'success'
	| 'failure'
	| 'neutral'
	| 'cancelled'
	| 'skipped'
	| 'timed_out'
	| 'action_required';

export type CheckRunState =
	| 'queued'
	| 'in_progress'
	| 'completed'
	| 'waiting'
	| 'requested'
	| 'pending';
