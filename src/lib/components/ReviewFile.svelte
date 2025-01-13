<script lang="ts">
	import Flex from './Flex.svelte';
	import Box from './Box.svelte';
	import Button from './Button.svelte';
	import { ChevronDown, ChevronRight } from 'lucide-svelte';
	import BoxBody from './BoxBody.svelte';
	import HighlightedCode from './HighlightedCode.svelte';
	import { getFileExtension } from '$lib/utils/getFileExtension';

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
</script>

<Box>
	<BoxBody>
		<Flex justify="space-between"
			>{file.filename}
			<Flex gap={4}>
				<div>
					{#if file.status === 'added'}added
					{:else if file.status === 'removed'}removed
					{:else if file.status === 'renamed'}renamed from {file.previous_filename}
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
				<HighlightedCode
					code={file.patch}
					extension={getFileExtension(file.filename)}
				/>
			{/if}
		</div>
	</BoxBody>
</Box>
