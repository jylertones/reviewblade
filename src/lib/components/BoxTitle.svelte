<script lang="ts">
	import type { Snippet } from 'svelte';

	export type BoxTitleProps = {
		children: Snippet<[]>;
	};

	const { children }: BoxTitleProps = $props();
</script>

<div class="box-title">
	{@render children()}
</div>

<style>
	.box-title {
		padding: 0.5rem 1rem;
		background-color: var(--background-color-tertiary);

		border-start-start-radius: var(--border-radius);
		border-start-end-radius: var(--border-radius);

		&:only-child {
			border-end-start-radius: var(--border-radius);
			border-end-end-radius: var(--border-radius);
		}
	}
</style>
