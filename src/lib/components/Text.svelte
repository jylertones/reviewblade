<script lang="ts">
	import type { Snippet } from 'svelte';

	export type TextProps = {
		children: Snippet<[]>;
		size?: 'p1' | 'p2';
		variant?: 'default' | 'subtle';
	};

	let { size = 'p1', variant, children }: TextProps = $props();
</script>

<p data-size={size} data-variant={variant}>{@render children()}</p>

<style>
	p {
		margin: 0;
		max-inline-size: 45em;
	}

	:global(p) + p {
		margin-block-start: 1rem;
	}

	p[data-size='p1'] {
		font-size: var(--font-body-size-1);
		color: var(--text-p1-color);
	}

	p[data-size='p2'] {
		font-size: var(--font-body-size-2);
		color: var(--text-p2-color);
	}

	p[data-variant='subtle'] {
		color: var(--text-secondary-color);
	}
</style>
