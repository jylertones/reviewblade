import type { CheckRunsResponse } from './api/getCheckRuns';
import type { PullRequestApprovalState } from './constants/reviews';

export type CheckRun = CheckRunsResponse['check_runs'][0];

export type ConsolidatedComment = {
	id: number;
	author: {
		name?: string;
		login: string;
		id: number;
		avatarUrl: string;
	};
	body: string;
	createdAt?: Date;
	state: PullRequestApprovalState;

	replies?: ConsolidatedComment[];
	diff?: {
		diff: string;
		startLine?: number | null;
		lastLine?: number | null;
		path: string;
		subjectType?: 'line' | 'file';
		reactions: {
			'+1': number;
			'-1': number;
			laugh: number;
			confused: number;
			heart: number;
			hooray: number;
			eyes: number;
			rocket: number;
		};
	};
};

export type DiffChunk = {
	startLineNumber: number;
	leadingLine: string;
	patch: string;
};

export type AwaitingReview = {
	name: string;
	state: PullRequestApprovalState;
	submittedAt?: Date;
};
