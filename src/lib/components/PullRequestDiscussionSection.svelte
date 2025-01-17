<script lang="ts">
	import type { PullRequestCommentsResponse } from '$lib/api/getPullRequestComments';
	import type { ReviewResponse } from '$lib/api/getPullReviews';
	import type { ConsolidatedComment } from '$lib/types';
	import { combineReviewsAndComments } from '$lib/utils/combineReviewsAndComments';

	import Box from './Box.svelte';
	import BoxBody from './BoxBody.svelte';
	import Button from './Button.svelte';
	import Flex from './Flex.svelte';
	import PullRequestDiscussion from './PullRequestDiscussion.svelte';
	import { ChevronDown, ChevronRight } from 'lucide-svelte';

	export type PullRequestDiscussionProps = {
		reviews: Promise<ReviewResponse['data']>;
		comments: Promise<PullRequestCommentsResponse>;
	};

	const { reviews, comments }: PullRequestDiscussionProps = $props();

	let combinedComments: ConsolidatedComment[] = $state([]);
	$effect(() => {
		Promise.all([reviews, comments]).then(([reviewsData, commentsData]) => {
			combinedComments = combineReviewsAndComments(reviewsData, commentsData);
		});
	});

	let discussionExpanded = $state(false);
	const ExpandedDiscussionIcon = $derived(
		discussionExpanded ? ChevronDown : ChevronRight,
	);

	function handleDiscussionExpand() {
		discussionExpanded = !discussionExpanded;
	}
</script>

<section>
	<Box>
		<BoxBody>
			<Flex gap={16} direction="column">
				<Flex gap={8} justify="space-between">
					<h2>Discussion ({combinedComments.length})</h2>
					<Button
						variant="icon"
						aria-controls="expand-discussion"
						aria-expanded={discussionExpanded}
						onClick={handleDiscussionExpand}><ExpandedDiscussionIcon /></Button
					>
				</Flex>

				{#if discussionExpanded}
					<div id="expand-discussion">
						<PullRequestDiscussion comments={combinedComments} />
					</div>
				{/if}
			</Flex>
		</BoxBody>
	</Box>
</section>
