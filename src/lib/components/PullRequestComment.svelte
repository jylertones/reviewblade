<script lang="ts">
	import type { ConsolidatedComment } from '$lib/types';
	import { formatDistance } from 'date-fns/fp';
	import Box from './Box.svelte';
	import BoxBody from './BoxBody.svelte';
	import BoxTitle from './BoxTitle.svelte';
	import Flex from './Flex.svelte';
	import ReviewStateIcon from './ReviewStateIcon.svelte';
	import Text from './Text.svelte';
	import PullRequestComment from './PullRequestComment.svelte';
	import HighlightedCode from './HighlightedCode.svelte';
	import { getFileExtension } from '$lib/utils/getFileExtension';
	import UserSubmittedText from './UserSubmittedText.svelte';

	export type PullRequestCommentProps = {
		comment: ConsolidatedComment;
	};

	const { comment }: PullRequestCommentProps = $props();
</script>

<Box>
	<BoxTitle>
		<Flex gap={4} align="center">
			<ReviewStateIcon state={comment.state} />
			<Text size="p2">{comment.author.login} {comment.state}</Text>
			<Text variant="subtle" size="p2">
				{comment.createdAt && formatDistance(comment.createdAt, new Date())} ago
			</Text>
		</Flex>
	</BoxTitle>
	{#if comment.body || comment.replies || comment.diff}
		<BoxBody>
			{#if comment.diff}
				<div>
					{comment.diff.path}
				</div>
				<HighlightedCode
					code={comment.diff.diff}
					extension={getFileExtension(comment.diff.path)}
				/>
			{/if}

			{#if comment.body}
				<UserSubmittedText text={comment.body} />
			{/if}

			{#if comment.replies}
				{#each comment.replies as reply}
					<PullRequestComment comment={reply} />
				{/each}
			{/if}
		</BoxBody>
	{/if}
</Box>
