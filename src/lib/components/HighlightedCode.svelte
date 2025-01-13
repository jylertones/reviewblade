<script lang="ts">
	import { codeToHtml, type StringLiteralUnion } from 'shiki';
	import type { BundledLanguage } from 'shiki/bundle/web';

	export type HighlightedCodeProps = {
		code: string;
		extension: StringLiteralUnion<BundledLanguage, string>;
	};

	let { code, extension }: HighlightedCodeProps = $props();

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

<code bind:this={patchElement}>{code}</code>

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
