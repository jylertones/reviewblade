<script lang="ts">
	import type { Snippet } from 'svelte';

	export type LabelProps = {
		for: string;
		children: Snippet<[]>;
	};

	let { children, ...delegatedProps }: LabelProps = $props();
</script>

<label {...delegatedProps}>
	{@render children()}
</label>

<style>
	label {
		display: block;
		margin-bottom: 0.25rem;
	}
</style>
