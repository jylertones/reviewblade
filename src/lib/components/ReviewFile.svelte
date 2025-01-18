<script lang="ts">
	import Flex from './Flex.svelte';
	import Box from './Box.svelte';
	import Text from './Text.svelte';
	import Button from './Button.svelte';
	import { ChevronDown, ChevronRight } from 'lucide-svelte';
	import BoxBody from './BoxBody.svelte';
	import HighlightedCode from './HighlightedCode.svelte';
	import { getFileExtension } from '$lib/utils/getFileExtension';
	import { type DiffChunk } from '$lib/types';

	type ReviewFileProps = {
		file: {
			filename: string;
			patch?: string;
			status:
				| 'added'
				| 'removed'
				| 'modified'
				| 'renamed'
				| 'copied'
				| 'changed'
				| 'unchanged';
			previous_filename?: string;
		};
	};

	const { file }: ReviewFileProps = $props();
	let expanded = $state(['added', 'modified'].includes(file.status));
	const ExpandedIcon = $derived(expanded ? ChevronDown : ChevronRight);
	const expandButtonId = `expand-file-${file.filename.replace(/[\\/\\.]/g, '-')}`;

	const lines = file.patch?.split('\n') ?? [];
	const chunks = lines.reduce((acc, line) => {
		const matches = line.match(/(@@ -(\d+),\d+ \+\d+,\d+ @@).*/);
		if (matches) {
			acc.push({
				leadingLine: line,
				startLineNumber: Number(matches[2]),
				patch: '',
			});
		} else if (acc[acc.length - 1].patch === '') {
			acc[acc.length - 1].patch = line;
		} else {
			acc[acc.length - 1].patch += '\n' + line;
		}

		return acc;
	}, [] as DiffChunk[]);
</script>

<Box>
	<BoxBody>
		<Flex justify="space-between"
			><Flex direction="column"
				><div>{file.filename}</div>
				{#if file.status === 'renamed'}
					<Text class="renamed-file" variant="subtle">
						renamed from {file.previous_filename}
					</Text>{/if}</Flex
			>
			<Flex gap={4}>
				<div>
					{#if file.status === 'added'}added
					{:else if file.status === 'removed'}removed
					{/if}
				</div>
				<Button
					variant="icon"
					aria-controls={expandButtonId}
					onClick={() => {
						expanded = !expanded;
					}}><ExpandedIcon /></Button
				>
			</Flex></Flex
		>

		<div id={expandButtonId}>
			{#if file.patch && expanded}
				{#each chunks as chunk}
					<HighlightedCode
						code={chunk.patch}
						extension={getFileExtension(file.filename)}
						firstLineNumber={chunk.startLineNumber}
						header={chunk.leadingLine}
					/>
				{/each}
			{/if}
		</div>
	</BoxBody>
</Box>

<style>
	.renamed-file {
		margin-inline-start: 2rem;
	}
</style>
