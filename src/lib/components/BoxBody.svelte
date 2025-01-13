<script lang="ts">
	import type { Snippet } from 'svelte';

	export type BoxBodyProps = {
		children: Snippet<[]>;
	};

	const { children }: BoxBodyProps = $props();
</script>

<div class="box-body">
	{@render children()}
</div>

<style>
	.box-body {
		padding: 0.5rem 1rem;
		font-size: var(--font-body-size-2);
	}
</style>
