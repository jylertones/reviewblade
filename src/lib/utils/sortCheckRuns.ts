import type { CheckRun } from '$lib/types';

export function sortCheckRuns(checkRuns: CheckRun[]): CheckRun[] {
	return checkRuns.sort((runA, runB) => {
		if (runA.conclusion === 'failure' && runB.conclusion !== 'failure') {
			return -1;
		}

		if (runB.conclusion === 'failure' && runA.conclusion !== 'failure') {
			return 1;
		}

		if (
			runA.conclusion === 'action_required' &&
			runB.conclusion !== 'action_required'
		) {
			return -1;
		}

		if (
			runB.conclusion === 'action_required' &&
			runA.conclusion !== 'action_required'
		) {
			return 1;
		}

		if (
			(runA.conclusion === 'cancelled' || runA.conclusion === 'timed_out') &&
			runB.conclusion !== 'cancelled' &&
			runB.conclusion !== 'timed_out'
		) {
			return -1;
		}

		if (
			(runB.conclusion === 'cancelled' || runB.conclusion === 'timed_out') &&
			runA.conclusion !== 'cancelled' &&
			runA.conclusion !== 'timed_out'
		) {
			return 1;
		}

		if (runA.status === 'in_progress' && runB.status !== 'in_progress') {
			return -1;
		}

		if (runB.status === 'in_progress' && runA.status !== 'in_progress') {
			return 1;
		}

		if (runA.status === 'queued' && runB.status !== 'queued') {
			return -1;
		}

		if (runB.status === 'queued' && runA.status !== 'queued') {
			return 1;
		}

		if (runA.status === 'pending' && runB.status !== 'pending') {
			return -1;
		}

		if (runB.status === 'pending' && runA.status !== 'pending') {
			return 1;
		}

		if (runA.status === 'requested' && runB.status !== 'requested') {
			return -1;
		}

		if (runB.status === 'requested' && runA.status !== 'requested') {
			return 1;
		}

		if (runA.status === 'waiting' && runB.status !== 'waiting') {
			return -1;
		}

		if (runB.status === 'waiting' && runA.status !== 'waiting') {
			return 1;
		}

		return runA.name.localeCompare(runB.name);
	});
}
