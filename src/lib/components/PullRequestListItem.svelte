<script lang="ts">
	import type { PullRequestResponse } from '$lib/api/getPullRequests';
	import { getPullReviews } from '$lib/api/getPullReviews';
	import { getRepoPathFromPr } from '$lib/utils/getRepoPathFromPr';
	import { Badge, BadgeAlert, BadgeCheck, BadgeInfo } from 'lucide-svelte';
	import { formatDistance } from 'date-fns';

	type PullRequestListItemProps = {
		pullRequest: PullRequestResponse[0];
	};

	type PullRequestApprovalState = 'approved' | 'waiting' | 'changes_requested' | 'commented';

	const mapApprovalStateToDisplay: Record<
		PullRequestApprovalState,
		{ label: string; icon: typeof Badge }
	> = {
		['waiting']: { label: 'Awaiting review', icon: Badge },
		['changes_requested']: { label: 'Changes requested', icon: BadgeAlert },
		['commented']: { label: 'Commented', icon: BadgeInfo },
		['approved']: { label: 'Approved', icon: BadgeCheck },
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
		{@const Icon = mapApprovalStateToDisplay[pullReviewState].icon}
		<Icon class="status-icon" data-status={pullReviewState} />
	{/if}
	<div class="stack">
		<div class="title">
			<a href={`/pull/${owner}/${repo}/${pullRequest.number}`}>{pullRequest.title}</a>
		</div>
		<div class="second-line">
			Created {formatDistance(new Date(pullRequest.created_at), new Date(), { addSuffix: true })} by
			{pullRequest.user?.login}
		</div>
	</div>
</li>

<style>
	.list-item {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem;

		&:hover {
			background-color: var(--background-color-secondary);
		}

		&:last-child {
			border-block-end: 1px solid var(--color-space-cadet);
		}
	}

	.stack {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
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

	:global {
		.status-icon {
			color: var(--text-secondary-color);
		}

		.status-icon[data-status='changes-requested'] {
			color: var(--color-warning);
		}

		.status-icon[data-status='approved'] {
			color: var(--color-success);
		}
	}
</style>
