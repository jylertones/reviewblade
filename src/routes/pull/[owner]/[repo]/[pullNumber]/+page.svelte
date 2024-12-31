<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import type { PageData } from './$types';
	import { Github } from 'lucide-svelte';
	import Prism from 'prismjs';
	import 'prismjs/themes/prism.css';

	let { data }: { data: PageData } = $props();
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

<h2>Files</h2>
{#await data.pullRequestDiff}
	Loading diff...
{:then diff}
	{#each diff.files ?? [] as file}
		<div>
			<h3>{file.filename}</h3>
			<code style="white-space: pre-wrap;">
				<!-- eslint-disable-next-line svelte/no-at-html-tags -->
				{@html Prism.highlight(file.patch!, Prism.languages.javascript, 'javascript')}
			</code>
		</div>
	{/each}
{:catch error}
	Error loading diff: {error.message}
{/await}
