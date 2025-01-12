<script lang="ts">
	import Badge, { type BadgeProps } from '$lib/components/Badge.svelte';
	import Box from '$lib/components/Box.svelte';
	import Button from '$lib/components/Button.svelte';
	import Text from '$lib/components/Text.svelte';
	import CheckRunsList from '$lib/components/CheckRunsList.svelte';
	import Flex from '$lib/components/Flex.svelte';
	import ReviewFile from '$lib/components/ReviewFile.svelte';
	import ReviewStateIcon from '$lib/components/ReviewStateIcon.svelte';
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

	let { data }: { data: PageData } = $props();

	type Status = 'open' | 'closed' | 'merged';
	const statusMap: Record<
		Status,
		{ label: string; variant: BadgeProps['variant'] }
	> = {
		open: { label: 'Open', variant: 'default' },
		closed: { label: 'Closed', variant: 'warning' },
		merged: { label: 'Merged', variant: 'success' },
	};

	const status: Status = data.pullRequest.merged_at
		? 'merged'
		: data.pullRequest.state;

	let checksExpanded = $state(false);
	function handleChecksExpand() {
		checksExpanded = !checksExpanded;
	}
	const ExpandedIcon = $derived(checksExpanded ? ChevronDown : ChevronRight);

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
			<Button
				href={data.pullRequest._links.html.href}
				target="_blank"
				rel="noopener"
			>
				<Github /> View on GitHub
			</Button>
		</div>
	</Flex>
</section>

<section>
	<h2>Description</h2>

	<div class="description-body">
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html data.body}
	</div>
</section>

<section>
	<Box>
		<Flex gap={8}>
			<h2>Approvals</h2>

			{#each reviews as review}
				<Flex gap={4}>
					<ReviewStateIcon state={review.state} />
					<Text>{review.name}</Text>
				</Flex>
			{/each}
			{#if reviews.length === 0}
				<Text>None</Text>
			{/if}
		</Flex>
	</Box>
</section>

<section>
	<Box>
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
				onClick={handleChecksExpand}><ExpandedIcon /></Button
			>
		</Flex>

		{#await data.checkRuns then checks}
			{#if checksExpanded}
				<div id="expand-checks">
					<CheckRunsList checkRuns={checks.check_runs} />
				</div>
			{/if}
		{/await}
	</Box>
</section>

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

	/* These are introduced by GitHub markdown */
	:global {
		.contains-task-list {
			list-style: none;
			padding-inline-start: 1rem;
		}
	}

	.description-body :global {
		code {
			background-color: var(--background-color-tertiary);
			font-size: var(--font-body-size-2);
			padding-inline: 0.25rem;
			padding-block: 0.25rem;
			border-radius: var(--border-radius);
		}

		pre {
			background-color: var(--background-color-tertiary);
			padding: 0.5rem;
			border-radius: var(--border-radius);
		}

		pre > code {
			background-color: transparent;
			padding: 0;
			border-radius: 0;
		}
	}
</style>
