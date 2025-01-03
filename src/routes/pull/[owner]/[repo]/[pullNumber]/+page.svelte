<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import CheckRunsList from '$lib/components/CheckRunsList.svelte';
	import Flex from '$lib/components/Flex.svelte';
	import ReviewStateIcon from '$lib/components/ReviewStateIcon.svelte';
	import { getAwaitingReviews } from '$lib/utils/getAwaitingReviews';
	import { getDisplayableReviews } from '$lib/utils/getDisplayableReviews';
	import type { PageData } from './$types';
	import { ArrowRight, Copy, Github } from 'lucide-svelte';
	import Prism from 'prismjs';
	import 'prismjs/themes/prism.css';

	let { data }: { data: PageData } = $props();

	const reviews = [
		...getAwaitingReviews(data.pullRequest),
		...getDisplayableReviews(data.pullRequestReviews),
	];

	function handleCopy() {
		navigator.clipboard.writeText(data.pullRequest.head.ref);
	}

	console.log({ reviews, prReviews: data.pullRequestReviews });
</script>

<svelte:head>
	<title>{data.pullRequest.title}</title>
</svelte:head>

<section>
	<h1>{data.pullRequest.title}</h1>

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
			<Button href={data.pullRequest._links.html.href} target="_blank" rel="noopener">
				<Github /> View on GitHub
			</Button>
		</div>
	</Flex>
</section>

<section>
	<h2>Approvals</h2>

	{#each reviews as review}
		<Flex gap={4}>
			<ReviewStateIcon state={review.state} />
			<span>{review.name}</span>
		</Flex>
	{/each}
	{#if reviews.length === 0}
		None
	{/if}
</section>

<section>
	<h2>Description</h2>

	<div class="description-body">
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html data.body}
	</div>
</section>

<section>
	<h2>Checks</h2>
	{#await data.checkRuns}
		Loading checks...
	{:then checks}
		<CheckRunsList checkRuns={checks.check_runs} />
	{:catch error}
		Error loading checks: {error.message}
	{/await}
</section>

<section>
	<h2>Files</h2>
	{#await data.pullRequestDiff}
		Loading diff...
	{:then diff}
		<Flex direction="column" gap={16}>
			{#each diff.files ?? [] as file}
				<div class="file">
					<h3>{file.filename}</h3>
					<code style="white-space: pre-wrap;">
						<!-- eslint-disable-next-line svelte/no-at-html-tags -->
						{@html Prism.highlight(file.patch!, Prism.languages.javascript, 'javascript')}
					</code>
				</div>
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

	.file {
		inline-size: 100%;
		padding: 1rem;
		background-color: var(--background-color-secondary);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--border-radius);
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
