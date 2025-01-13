<script lang="ts">
	import type { PullRequestCommentsResponse } from '$lib/api/getPullRequestComments';
	import type { ReviewResponse } from '$lib/api/getPullReviews';
	import type { ConsolidatedComment } from '$lib/types';
	import { formatDistance } from 'date-fns';
	import Flex from './Flex.svelte';
	import { reviewStateToTyped } from '$lib/utils/reviewStateToTyped';
	import ReviewStateIcon from './ReviewStateIcon.svelte';
	import Text from './Text.svelte';
	import BoxTitle from './BoxTitle.svelte';
	import Box from './Box.svelte';
	import BoxBody from './BoxBody.svelte';
	import PullRequestComment from './PullRequestComment.svelte';

	export type PullRequestDiscussionProps = {
		reviews: Promise<ReviewResponse['data']>;
		comments: Promise<PullRequestCommentsResponse>;
	};

	const { reviews, comments }: PullRequestDiscussionProps = $props();

	let combinedComments: ConsolidatedComment[] = $state([]);
	$effect(() => {
		Promise.all([reviews, comments]).then(([reviewsData, commentsData]) => {
			combinedComments = [
				...reviewsData
					.filter(
						(review) =>
							review.user !== null &&
							(review.body_html !== '' || review.state !== 'COMMENTED'),
					)
					.map((review) => ({
						id: review.id,
						author: {
							name: review.user!.name ?? undefined,
							login: review.user!.login,
							id: review.user!.id,
							avatarUrl: review.user!.avatar_url,
						},
						body: review.body_html ?? '',
						createdAt: review.submitted_at
							? new Date(review.submitted_at)
							: undefined,
						state: reviewStateToTyped(review.state),
					})),
				...commentsData.reduce((acc, comment) => {
					const newComment = {
						id: comment.id,
						author: {
							name: comment.user.name ?? undefined,
							login: comment.user.login,
							id: comment.user.id,
							avatarUrl: comment.user.avatar_url,
						},
						state: 'commented',
						body: comment.body_html ?? '',
						createdAt: new Date(comment.created_at),
						diff: comment.in_reply_to_id
							? undefined
							: {
									diff: comment.diff_hunk,
									startLine: comment.start_line,
									lastLine: comment.line,
									path: comment.path,
									subjectType: comment.subject_type,
									reactions: comment.reactions,
								},
					};

					if (comment.in_reply_to_id) {
						const parentComment = acc.find(
							(c) => c.id === comment.in_reply_to_id,
						);
						if (parentComment) {
							parentComment.replies = [
								...(parentComment.replies || []),
								newComment,
							];
						}
					} else {
						acc.push(newComment);
					}

					return acc;
				}, [] as ConsolidatedComment[]),
			].sort((a, b) => {
				if (a.createdAt && b.createdAt) {
					return a.createdAt.getTime() - b.createdAt.getTime();
				}

				return 0;
			});
		});
	});
</script>

<Flex direction="column" gap={16}>
	{#each combinedComments as comment}
		<PullRequestComment {comment} />
	{/each}
</Flex>
