<script lang="ts">
	import { codeToHtml, type StringLiteralUnion } from 'shiki';
	import type { BundledLanguage } from 'shiki/bundle/web';

	export type HighlightedCodeProps = {
		code: string;
		extension: StringLiteralUnion<BundledLanguage, string>;
		firstLineNumber?: number;
		header?: string;
	};

	let { code, firstLineNumber, extension, header }: HighlightedCodeProps =
		$props();

	let patchElement: HTMLElement | null = $state(null);

	$effect(() => {
		if (patchElement) {
			codeToHtml(code, {
				theme: 'tokyo-night',
				colorReplacements: {
					'#1a1b26': 'transparent',
				},
				lang: extension,
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

<code class="header">{header}</code>
<code
	bind:this={patchElement}
	style={`counter-set: lineNumber ${firstLineNumber ? firstLineNumber - 1 : 1}`}
	>{code}</code
>

<style>
	code {
		text-wrap: wrap;
		counter-reset: lineNumber;
	}

	.header {
		display: block;
		background-color: var(--background-color-tertiary);
		padding: 0.5rem;
		margin-block-start: 0.5rem;
	}

	code :global(.line::before) {
		content: counter(lineNumber);
		counter-increment: lineNumber;
		width: 2rem;
		margin-right: 1.5rem;
		display: inline-block;
		text-align: right;
		color: rgba(115, 138, 148, 0.4);
	}

	:global {
		code pre {
			margin: 0;
		}

		.line {
			text-wrap: wrap;
		}

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
