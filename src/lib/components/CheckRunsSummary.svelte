<script lang="ts">
	import type { CheckRun } from '$lib/types';
	import { sortCheckRuns } from '$lib/utils/sortCheckRuns';
	import CheckRunIcon from './CheckRunIcon.svelte';
	import Flex from './Flex.svelte';

	type CheckRunsListProps = {
		checkRuns: CheckRun[];
	};

	const { checkRuns }: CheckRunsListProps = $props();

	const sortedRuns = sortCheckRuns(checkRuns);
	const groupedRuns = sortedRuns.reduce((acc, run) => {
		const key = `${run.status}-${run.conclusion}`;
		if (!acc.has(key)) {
			acc.set(key, []);
		}

		acc.get(key)!.push(run);

		return acc;
	}, new Map<string, CheckRun[]>());
</script>

<ul>
	{#each groupedRuns.values() as runs}
		<li>
			<Flex gap={4} align="center"
				><CheckRunIcon
					status={runs[0].status}
					conclusion={runs[0].conclusion}
				/><span>{runs.length}</span></Flex
			>
		</li>
	{/each}
</ul>

<style>
	ul {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		list-style: none;
		padding: 0;
		margin-block: 0;
	}
</style>
