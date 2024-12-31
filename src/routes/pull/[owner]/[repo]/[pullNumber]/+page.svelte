<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Flex from '$lib/components/Flex.svelte';
	import type { PageData } from './$types';
	import { Github } from 'lucide-svelte';
	import Prism from 'prismjs';
	import 'prismjs/themes/prism.css';

	let { data }: { data: PageData } = $props();
	console.log({ body: data.body });
</script>

<svelte:head>
	<title>{data.pullRequest.title}</title>
</svelte:head>

<h1>{data.pullRequest.title}</h1>

<Button variant="primary" href={data.pullRequest._links.html.href} target="_blank" rel="noopener">
	<Github /> View on GitHub
</Button>

<h2>Description</h2>

<!-- eslint-disable-next-line svelte/no-at-html-tags -->
{@html data.body}
<br />
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

<style>
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
</style>
