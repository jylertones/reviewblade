<script lang="ts">
	import type { ConsolidatedComment } from '$lib/types';
	import Flex from './Flex.svelte';
	import PullRequestComment from './PullRequestComment.svelte';
	import Text from './Text.svelte';

	export type PullRequestDiscussion = {
		comments: ConsolidatedComment[];
	};

	const { comments }: PullRequestDiscussion = $props();
</script>

<Flex direction="column" gap={16}>
	{#if comments.length === 0}
		<Text>🥱 No discussion yet</Text>
	{:else}
		{#each comments as comment}
			<PullRequestComment {comment} />
		{/each}
	{/if}
</Flex>
