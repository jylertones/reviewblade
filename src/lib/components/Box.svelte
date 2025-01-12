<script lang="ts">
	import type { Snippet } from 'svelte';

	export type BoxProps = {
		children: Snippet<[]>;
	};

	const { children }: BoxProps = $props();
</script>

<div>
	{@render children()}
</div>

<style>
	div {
		inline-size: 100%;
		padding: 1rem;
		background-color: var(--background-color-secondary);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--border-radius);
		font-size: var(--font-body-size-2);
	}
</style>
