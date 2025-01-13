<script lang="ts">
	import type { PullRequestApprovalState } from '$lib/constants/reviews';
	import Flex from './Flex.svelte';
	import ReviewStateIcon from './ReviewStateIcon.svelte';
	import Text from './Text.svelte';

	export type ApprovalsSummaryProps = {
		reviews: { name: string; state: PullRequestApprovalState }[];
	};

	const { reviews }: ApprovalsSummaryProps = $props();
</script>

{#each reviews as review}
	<Flex gap={4}>
		<ReviewStateIcon state={review.state} />
		<Text>{review.name}</Text>
	</Flex>
{/each}
{#if reviews.length === 0}
	<Text>None</Text>
{/if}
