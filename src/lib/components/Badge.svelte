<script lang="ts">
	import type { Snippet } from 'svelte';

	export type BadgeProps = {
		variant?: 'default' | 'success' | 'warning';
		children: Snippet<[]>;
	};

	const { variant = 'default', children, ...other }: BadgeProps = $props();
</script>

<div class="badge" data-variant={variant} {...other}>
	{@render children()}
</div>

<style>
	.badge {
		display: inline-flex;
		gap: 0.25rem;
		align-items: center;

		block-size: 2rem;
		padding-inline: 1rem;

		border: 1px solid var(--badge-default-border-color);
		border-radius: 100px;
	}

	.badge[data-variant='default'] {
		background-color: var(--badge-info-background-color);
		border-color: var(--badge-info-border-color);
		color: var(--badge-info-color);
	}

	.badge[data-variant='success'] {
		background-color: var(--badge-success-background-color);
		border-color: var(--badge-success-border-color);
		color: var(--badge-success-color);
	}

	.badge[data-variant='warning'] {
		background-color: var(--badge-warning-background-color);
		border-color: var(--badge-warning-border-color);
		color: var(--badge-warning-color);
	}
</style>
