<script lang="ts">
	import Prism from 'prismjs';
	import Flex from './Flex.svelte';
	import Button from './Button.svelte';
	import { ChevronDown, ChevronRight } from 'lucide-svelte';

	type ReviewFileProps = {
		file: {
			filename: string;
			patch?: string;
			status: 'added' | 'removed' | 'modified' | 'renamed' | 'copied' | 'changed' | 'unchanged';
			previous_filename?: string;
		};
	};

	const { file }: ReviewFileProps = $props();
	let expanded = $state(['added', 'modified'].includes(file.status));
	const ExpandedIcon = $derived(expanded ? ChevronDown : ChevronRight);
</script>

<div class="file">
	<Flex justify="space-between"
		><h3>{file.filename}</h3>
		<Flex gap={4}>
			<div>
				{#if file.status === 'added'}added
				{:else if file.status === 'removed'}removed
				{:else if file.status === 'renamed'}renamed from {file.previous_filename}
				{/if}
			</div>
			<Button
				variant="icon"
				onClick={() => {
					expanded = !expanded;
				}}><ExpandedIcon /></Button
			>
		</Flex></Flex
	>

	{#if file.patch && expanded}
		<code style="white-space: pre-wrap;">
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			{@html Prism.highlight(file.patch, Prism.languages.javascript, 'javascript')}
		</code>
	{/if}
</div>

<style>
	.file {
		inline-size: 100%;
		padding: 1rem;
		background-color: var(--background-color-secondary);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--border-radius);
	}
</style>
