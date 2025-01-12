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
</script>

<ul>
	{#each sortedRuns as check}
		<li>
			<a href={check.details_url} target="_blank">
				<Flex gap={8}
					><CheckRunIcon
						status={check.status}
						conclusion={check.conclusion}
					/><span>{check.name}</span></Flex
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
