<script lang="ts">
	import type { PullRequestResponse } from '$lib/api/getPullRequests';
	import { getPullReviews } from '$lib/api/getPullReviews';
	import { getRepoPathFromPr } from '$lib/utils/getRepoPathFromPr';
	import { formatDistance } from 'date-fns';
	import type { PullRequestApprovalState } from '$lib/constants/reviews';
	import ReviewStateIcon from './ReviewStateIcon.svelte';
	import { Github } from 'lucide-svelte';

	type PullRequestListItemProps = {
		pullRequest: PullRequestResponse[0];
	};

	const { pullRequest }: PullRequestListItemProps = $props();
	const { owner, repo } = getRepoPathFromPr(pullRequest);

	let isPullReviewsError = $state(false);
	let isPullReviewsLoading = $state(true);
	let pullReviewState = $state('waiting' as PullRequestApprovalState);
	$effect(() => {
		async function getPullReviewData() {
			try {
				const pullReviews = await getPullReviews({ owner, repo, pull_number: pullRequest.number });
				isPullReviewsError = false;

				pullReviewState = pullReviews.reduce((acc, curr) => {
					if ([acc, curr.state].includes('CHANGES_REQUESTED')) {
						return 'changes_requested';
					}
					if (curr.state === 'APPROVED') {
						return 'approved';
					}

					return acc;
				}, 'waiting' as PullRequestApprovalState);
			} catch (e) {
				isPullReviewsError = true;
				console.error(e);
			} finally {
				isPullReviewsLoading = false;
			}
		}

		getPullReviewData();
	});
</script>

<li class="list-item">
	{#if !isPullReviewsLoading && !isPullReviewsError}
		<ReviewStateIcon state={pullReviewState} />
	{:else}
		<span class="status-icon"></span>
	{/if}

	<div class="stack">
		<div class="title">
			<a href={`/pull/${owner}/${repo}/${pullRequest.number}`} data-keyboard-focusable
				>{pullRequest.title}</a
			>
		</div>
		<div class="second-line">
			Created {formatDistance(new Date(pullRequest.created_at), new Date(), { addSuffix: true })} by
			{pullRequest.user?.login}
		</div>
	</div>

	<div class="right">
		<a href={pullRequest.url} class="github-link"><Github /></a>
	</div>
</li>

<style>
	.list-item {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 1rem;

		&:hover {
			background-color: var(--background-color-secondary);
		}

		&:hover .github-link,
		&:focus-within .github-link {
			display: block;
		}

		&:last-child {
			border-block-end: 1px solid var(--color-space-cadet);
		}
	}

	.stack {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		flex: 2;
	}

	.title {
		font-size: var(--font-body-size-1);
		line-height: 1;
		margin: 0;
	}

	.second-line {
		color: var(--text-secondary-color);
		font-size: var(--font-body-size-2);
	}

	.right {
		flex: 1;
		display: flex;
		justify-content: flex-end;
	}

	.github-link {
		display: none;
	}
</style>
