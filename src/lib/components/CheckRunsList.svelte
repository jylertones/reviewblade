<script lang="ts">
	import type { CheckRunsResponse } from '$lib/api/getCheckRuns';
	import CheckRunIcon from './CheckRunIcon.svelte';
	import Flex from './Flex.svelte';

	type CheckRun = CheckRunsResponse['check_runs'][0];

	type CheckRunsListProps = {
		checkRuns: CheckRun[];
	};

	const { checkRuns }: CheckRunsListProps = $props();

	const sortedRuns = checkRuns.sort((runA, runB) => {
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
</script>

<ul>
	{#each sortedRuns as check}
		<li>
			<a href={check.details_url} target="_blank">
				<Flex gap={8}
					><CheckRunIcon status={check.status} conclusion={check.conclusion} /><span
						>{check.name}</span
					></Flex
				></a
			>
		</li>
	{/each}
</ul>

<style>
	ul {
		list-style: none;
		padding: 0;
		margin-block: 0;
	}

	li:not(:last-child) {
		margin-block-end: 0.25rem;
	}
</style>
