<script lang="ts">
	import { LoaderCircle } from 'lucide-svelte';
	import type { Snippet } from 'svelte';

	type ButtonProps = {
		type?: 'button' | 'submit';
		variant?: 'primary' | 'default' | 'icon';
		onClick?: (event: SubmitEvent) => void;
		href?: string;
		children: Snippet<[]>;
		loading?: boolean;

		// Other props spread over the button
		'aria-controls'?: string;
		'aria-expanded'?: boolean;
		rel?: HTMLAnchorElement['rel'];
		target?: HTMLAnchorElement['target'];
	};

	const {
		variant = 'default',
		type = 'button',
		onClick,
		href,
		children,
		loading = false,
		...other
	}: ButtonProps = $props();
	const tag = href ? 'a' : 'button';
</script>

<svelte:element
	this={tag}
	role={tag === 'a' ? 'link' : 'button'}
	onclick={onClick}
	{href}
	{type}
	data-variant={variant}
	{...other}
>
	{#if loading}
		<LoaderCircle class="rotate" />
	{/if}
	{@render children()}
</svelte:element>

<style>
	button,
	a {
		display: inline-flex;
		gap: 0.25rem;
		align-items: center;
		min-width: fit-content;

		block-size: 2rem;
		padding-inline: 1rem;

		background-color: var(--button-default-background-color);
		border: 1px solid var(--button-default-border-color);
		border-radius: var(--border-radius);

		color: var(--button-default-color);
	}

	button:hover,
	a:hover,
	button[data-variant='icon']:hover,
	a[data-variant='icon']:hover {
		text-decoration: none;
		background-color: var(--button-default-hover-background-color);
		cursor: pointer;
	}

	button[data-variant='primary'],
	a[data-variant='primary'] {
		background-color: var(--button-primary-background-color);
		border: 1px solid var(--button-primary-border-color);

		color: var(--button-primary-color);
		font-weight: medium;
	}

	button[data-variant='primary']:hover,
	a[data-variant='primary']:hover {
		background-color: var(--button-primary-hover-background-color);
	}

	button[data-variant='icon'],
	a[data-variant='icon'] {
		inline-size: 2rem;
		block-size: 2rem;
		padding: 0.5rem;
		justify-content: center;
		border: 0;
		background-color: transparent;
		color: var(--button-default-color);
	}

	:global {
		.rotate {
			animation: rotate 2s linear infinite;
			margin-inline-end: 0.25rem;
		}

		@keyframes rotate {
			0% {
				transform: rotate(0deg);
			}
			100% {
				transform: rotate(360deg);
			}
		}
	}
</style>
