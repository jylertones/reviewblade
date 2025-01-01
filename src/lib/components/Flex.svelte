<script lang="ts">
	import type { Snippet } from 'svelte';

	type FlexProps = {
		children: Snippet<[]>;
		align?: 'center' | 'start' | 'end';
		direction?: 'row' | 'column';
		gap?: 2 | 4 | 8 | 16 | 24 | 32;
		justify?:
			| 'start'
			| 'end'
			| 'center'
			| 'space-between'
			| 'space-around'
			| 'space-evenly'
			| 'normal';
	};

	const {
		children,
		gap,
		direction = 'row',
		align = 'center',
		justify = 'normal',
	}: FlexProps = $props();
</script>

<div
	class={['flex', `gap-${gap}`, `align-${align}`, `direction-${direction}`, `justify-${justify}`]}
>
	{@render children()}
</div>

<style>
	.flex {
		display: flex;
	}

	.gap-2 {
		gap: 0.125rem;
	}

	.gap-4 {
		gap: 0.25rem;
	}

	.gap-8 {
		gap: 0.5rem;
	}

	.gap-16 {
		gap: 1rem;
	}

	.gap-24 {
		gap: 1.5rem;
	}

	.gap-32 {
		gap: 2rem;
	}

	.align-center {
		align-items: center;
	}

	.align-start {
		align-items: start;
	}

	.align-end {
		align-items: end;
	}

	.direction-row {
		flex-direction: row;
	}

	.direction-column {
		flex-direction: column;
		justify-content: stretch;
	}

	.justify-start {
		justify-content: start;
	}

	.justify-end {
		justify-content: end;
	}

	.justify-center {
		justify-content: center;
	}

	.justify-space-between {
		justify-content: space-between;
	}

	.justify-space-around {
		justify-content: space-around;
	}

	.justify-space-evenly {
		justify-content: space-evenly;
	}
</style>
