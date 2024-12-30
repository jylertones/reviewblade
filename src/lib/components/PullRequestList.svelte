<script lang="ts">
	import type { PullRequestResponse } from '$lib/api/getPullRequests';
	import PullRequestListItem from './PullRequestListItem.svelte';

	type PullRequestListProps = {
		pullRequests: PullRequestResponse;
		isError: boolean;
	};

	const { pullRequests, isError }: PullRequestListProps = $props();
</script>

{#if isError}
	<div>
		<h2>There was an error retrieving pull requests</h2>
	</div>
{/if}

<ul class="list">
	{#each pullRequests as pr}
		<PullRequestListItem pullRequest={pr} />
	{/each}
</ul>

<style>
	.list {
		list-style: none;
		padding-inline-start: 0;
	}
</style>
