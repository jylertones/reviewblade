import type { CheckRun } from '$lib/types';

export function sortCheckRuns(checkRuns: CheckRun[]): CheckRun[] {
	return checkRuns.sort((runA, runB) => {
		if (runA.conclusion === 'failure') {
			return -1;
		}

		if (runB.conclusion === 'failure') {
			return 1;
		}

		if (runA.conclusion === 'action_required') {
			return -1;
		}

		if (runB.conclusion === 'action_required') {
			return 1;
		}

		if (runA.conclusion === 'cancelled' || runA.conclusion === 'timed_out') {
			return -1;
		}

		if (runB.conclusion === 'cancelled' || runB.conclusion === 'timed_out') {
			return 1;
		}

		if (runA.status === 'in_progress') {
			return -1;
		}

		if (runB.status === 'in_progress') {
			return 1;
		}

		if (runA.status === 'queued') {
			return -1;
		}

		if (runB.status === 'queued') {
			return 1;
		}

		if (runA.status === 'pending') {
			return -1;
		}

		if (runB.status === 'pending') {
			return 1;
		}

		if (runA.status === 'requested') {
			return -1;
		}

		if (runB.status === 'requested') {
			return 1;
		}

		if (runA.status === 'waiting') {
			return -1;
		}

		if (runB.status === 'waiting') {
			return 1;
		}

		return runA.name.localeCompare(runB.name);
	});
}
