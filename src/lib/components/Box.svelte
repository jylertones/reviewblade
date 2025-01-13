<script lang="ts">
	import type { Snippet } from 'svelte';

	export type BoxProps = {
		children: Snippet<[]>;
	};

	const { children }: BoxProps = $props();
</script>

<div class="box">
	{@render children()}
</div>

<style>
	.box {
		inline-size: 100%;
		background-color: var(--background-color-secondary);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--border-radius);
	}
</style>
