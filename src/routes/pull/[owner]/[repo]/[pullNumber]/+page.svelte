<script lang="ts">
	import Badge, { type BadgeProps } from '$lib/components/Badge.svelte';
	import Box from '$lib/components/Box.svelte';
	import Button from '$lib/components/Button.svelte';
	import CheckRunsList from '$lib/components/CheckRunsList.svelte';
	import Flex from '$lib/components/Flex.svelte';
	import ReviewFile from '$lib/components/ReviewFile.svelte';
	import type { PageData } from './$types';
	import {
		ArrowRight,
		ChevronDown,
		ChevronRight,
		Copy,
		Github,
	} from 'lucide-svelte';
	import CheckRunsSummary from '$lib/components/CheckRunsSummary.svelte';
	import ApprovalsSummary from '$lib/components/ApprovalsSummary.svelte';
	import BoxBody from '$lib/components/BoxBody.svelte';
	import UserSubmittedText from '$lib/components/UserSubmittedText.svelte';
	import PullRequestDiscussionSection from '$lib/components/PullRequestDiscussionSection.svelte';
	import Text from '$lib/components/Text.svelte';
	import { getPullRequestMergeState } from '$lib/utils/getPullRequestMergeState';
	import { mergePullRequest } from '$lib/api/mergePullRequest';
	import { getConsolidatedReviews } from '$lib/utils/getConsolidatedReviews';

	let { data }: { data: PageData } = $props();

	type Status = 'open' | 'closed' | 'merged' | 'draft';
	const statusMap: Record<
		Status,
		{ label: string; variant: BadgeProps['variant'] }
	> = {
		draft: { label: 'Draft', variant: 'warning' },
		open: { label: 'Open', variant: 'default' },
		closed: { label: 'Closed', variant: 'warning' },
		merged: { label: 'Merged', variant: 'success' },
	};

	const status: Status = data.pullRequest.draft
		? 'draft'
		: data.pullRequest.merged_at
			? 'merged'
			: data.pullRequest.state;

	const isNextStepToMerge = data.pullRequest.state === 'open';
	const mergeState = getPullRequestMergeState({
		pullRequest: data.pullRequest,
	});

	let checksExpanded = $state(false);
	function handleChecksExpand() {
		checksExpanded = !checksExpanded;
	}
	const ExpandedChecksIcon = $derived(
		checksExpanded ? ChevronDown : ChevronRight,
	);

	const reviews = getConsolidatedReviews(
		data.pullRequest,
		data.pullRequestReviews,
	);

	function handleCopy() {
		navigator.clipboard.writeText(data.pullRequest.head.ref);
	}

	let isMerging = $state(false);
	async function handleMergePullRequest() {
		try {
			isMerging = true;
			const response = await mergePullRequest({
				owner: data.pullRequest.base.repo.owner.login,
				repo: data.pullRequest.base.repo.name,
				pullNumber: data.pullRequest.number,
			});

			if (response.merged) {
				alert('Pull request merged successfully');
				location.reload();
			} else {
				alert('Error merging pull request');
			}
		} catch (e) {
			console.error(e);
			alert('Error merging pull request');
		} finally {
			isMerging = false;
		}
	}
</script>

<svelte:head>
	<title>{data.pullRequest.title}</title>
</svelte:head>

<section>
	<Flex gap={8}>
		<Badge variant={statusMap[status].variant}>{statusMap[status].label}</Badge>
		<h1>{data.pullRequest.title}</h1>
	</Flex>

	<Flex direction="row" align="center" gap={4}>
		<Flex direction="row" align="center" gap={2}>
			<pre class="branch-name">{data.pullRequest.head.ref}</pre>
			<Button onClick={handleCopy} variant="icon"><Copy /></Button>
		</Flex>
		<ArrowRight />
		<pre class="branch-name">{data.pullRequest.base.ref}</pre>
	</Flex>
	<div>
		<Button href={data.pullRequest.html_url} target="_blank" rel="noopener">
			<Github />View on GitHub
		</Button>
	</div>
</section>

<section>
	<h2>Description</h2>

	<UserSubmittedText text={data.body} />
</section>

{#if isNextStepToMerge}
	<section>
		<Box>
			<BoxBody>
				<Flex direction="column">
					<h2>Merge</h2>
					{#if mergeState === 'ready'}
						<Flex gap={16}>
							<Text>This request is ready to merge!</Text>
							<Button
								variant="primary"
								onClick={handleMergePullRequest}
								loading={isMerging}
							>
								Merge pull request</Button
							>
						</Flex>
					{:else if mergeState === 'dirty'}
						<Text>This branch has conflicts with the upstream branch</Text>
					{:else if mergeState === 'checks_fail'}
						<Text
							>The merge request cannot be merged because some checks have not
							completed successfully</Text
						>
					{:else if mergeState === 'needs_review'}
						<Text
							>The merge request cannot be merged because it needs to be
							reviewed</Text
						>
					{:else}
						<Text
							>This merge request cannot be merged because it is blocked: {mergeState}</Text
						>
					{/if}
				</Flex>
			</BoxBody>
		</Box>
	</section>
{/if}

<section>
	<Box>
		<BoxBody>
			{#await data.checkRuns then checkRuns}
				<Flex gap={16} align="center">
					<h2>Checks</h2>
					<div class="checks-summary">
						<CheckRunsSummary checkRuns={checkRuns.check_runs} />
					</div>
					<Button
						variant="icon"
						aria-controls="expand-checks"
						aria-expanded={checksExpanded}
						onClick={handleChecksExpand}><ExpandedChecksIcon /></Button
					>
				</Flex>

				{#if checksExpanded}
					<div id="expand-checks">
						<CheckRunsList checkRuns={checkRuns.check_runs} />
					</div>
				{/if}
			{/await}
		</BoxBody>
	</Box>
</section>

<section>
	<Box>
		<BoxBody>
			<Flex gap={8}>
				<h2>Approvals</h2>

				<ApprovalsSummary {reviews} />
			</Flex>
		</BoxBody>
	</Box>
</section>

<PullRequestDiscussionSection
	reviews={Promise.resolve(data.pullRequestReviews)}
	comments={data.pullRequestComments}
/>

<section>
	<h2>Files</h2>
	{#await data.pullRequestDiff}
		Loading diff...
	{:then diff}
		<Flex direction="column" gap={16}>
			{#each diff.files ?? [] as file}
				<ReviewFile {file} />
			{/each}
		</Flex>
	{:catch error}
		Error loading diff: {error.message}
	{/await}
</section>

<style>
	.branch-name {
		font-size: var(--font-body-size-2);
		color: var(--text-secondary-color);

		text-overflow: ellipsis;
		overflow: hidden;
	}

	.checks-summary {
		flex: 2;
	}
</style>
