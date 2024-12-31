<script lang="ts">
	import type { PullRequestResponse } from '$lib/api/getPullRequests';
	import PullRequestListItem from './PullRequestListItem.svelte';

	type PullRequestListProps = {
		title?: string;
		pullRequests: PullRequestResponse;
		isError: boolean;
	};

	const { title, pullRequests, isError }: PullRequestListProps = $props();
</script>

{#if isError}
	<div>
		<h2>There was an error retrieving pull requests</h2>
	</div>
{/if}

<div class="list-wrapper">
	{#if title}<div class="list-header">{title}</div>{/if}
	<ul class="list">
		{#each pullRequests as pr}
			<PullRequestListItem pullRequest={pr} />
		{/each}
	</ul>
</div>

<style>
	.list-wrapper {
		inline-size: 100%;

		border: var(--border-width) solid var(--border-color);
		border-radius: var(--border-radius);
	}

	.list-header {
		background-color: var(--backgroud-color-secondary);
		padding: 1rem;
	}

	.list {
		list-style: none;
		padding: 0;
		margin: 0;
		background-color: var(--background-color-tertiary);
	}
</style>
