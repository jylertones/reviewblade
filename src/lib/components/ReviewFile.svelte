<script lang="ts">
	import { codeToHtml, type StringLiteralUnion } from 'shiki';
	import Flex from './Flex.svelte';
	import Box from './Box.svelte';
	import Button from './Button.svelte';
	import { ChevronDown, ChevronRight } from 'lucide-svelte';
	import type { BundledLanguage } from 'shiki/bundle/web';

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

	let patchElement: HTMLElement | null = $state(null);

	$effect(() => {
		if (patchElement && file.patch && expanded) {
			const fileExtension = file.filename.split('.').pop();
			codeToHtml(file.patch, {
				theme: 'tokyo-night',
				colorReplacements: {
					'#1a1b26': 'transparent',
				},
				lang: fileExtension as StringLiteralUnion<BundledLanguage, string>,
				transformers: [
					{
						line(node) {
							let firstChild = node.children[0];

							while (firstChild.type === 'element') {
								firstChild = firstChild.children[0];
							}

							const firstChar = firstChild.value.substring(0, 1);
							if (firstChar === '+') {
								firstChild.value = firstChild.value.replace(/^\+/, ' ');
								this.addClassToHast(node, 'line-added');
							} else if (firstChar === '-') {
								firstChild.value = firstChild.value.replace(/^-/, ' ');
								this.addClassToHast(node, 'line-removed');
							}
						},
					},
				],
			}).then((html) => {
				if (patchElement) {
					patchElement.innerHTML = html;
				}
			});
		}
	});
</script>

<Box>
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
			<code bind:this={patchElement}>{file.patch}</code>
		{/if}
	</div>
</Box>

<style>
	:global {
		.line-added,
		.line-removed {
			display: inline-block;
			inline-size: 100%;
		}

		.line-added {
			background-color: var(--color-green-80);
		}

		.line-removed {
			background-color: var(--color-peach-80);
		}
	}
</style>
