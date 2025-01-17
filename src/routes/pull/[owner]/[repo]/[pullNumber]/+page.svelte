<script lang="ts">
	import Badge, { type BadgeProps } from '$lib/components/Badge.svelte';
	import Box from '$lib/components/Box.svelte';
	import Button from '$lib/components/Button.svelte';
	import CheckRunsList from '$lib/components/CheckRunsList.svelte';
	import Flex from '$lib/components/Flex.svelte';
	import ReviewFile from '$lib/components/ReviewFile.svelte';
	import { getAwaitingReviews } from '$lib/utils/getAwaitingReviews';
	import { getDisplayableReviews } from '$lib/utils/getDisplayableReviews';
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

	let checksExpanded = $state(false);
	function handleChecksExpand() {
		checksExpanded = !checksExpanded;
	}
	const ExpandedChecksIcon = $derived(
		checksExpanded ? ChevronDown : ChevronRight,
	);

	const reviews = [
		...getAwaitingReviews(data.pullRequest),
		...getDisplayableReviews(data.pullRequestReviews),
	];

	function handleCopy() {
		navigator.clipboard.writeText(data.pullRequest.head.ref);
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

	<Flex direction="row" justify="space-between">
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
				<Github /> View on GitHub
			</Button>
		</div>
	</Flex>
</section>

<section>
	<h2>Description</h2>

	<UserSubmittedText text={data.body} />
</section>

<section>
	<Box>
		<BoxBody>
			<Flex gap={16} align="center">
				<h2>Checks</h2>
				<div class="checks-summary">
					{#await data.checkRuns then checks}
						<CheckRunsSummary checkRuns={checks.check_runs} />
					{/await}
				</div>
				<Button
					variant="icon"
					aria-controls="expand-checks"
					aria-expanded={checksExpanded}
					onClick={handleChecksExpand}><ExpandedChecksIcon /></Button
				>
			</Flex>

			{#await data.checkRuns then checks}
				{#if checksExpanded}
					<div id="expand-checks">
						<CheckRunsList checkRuns={checks.check_runs} />
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
	}

	.checks-summary {
		flex: 2;
	}
</style>
