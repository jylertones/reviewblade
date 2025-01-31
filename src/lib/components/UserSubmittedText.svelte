<script lang="ts">
	export type UserSubmittedText = {
		text: string;
	};

	const { text }: UserSubmittedText = $props();
</script>

<div>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html text}
</div>

<style>
	/* These are introduced by GitHub markdown */
	div :global {
		a {
			color: var(--text-link-color);
			text-decoration: none;
		}

		p {
			line-height: 1.4;
		}

		code {
			background-color: var(--background-color-tertiary);
			font-size: var(--font-body-size-2);
			padding-inline: 0.25rem;
			padding-block: 0.25rem;
			border-radius: var(--border-radius);
		}

		pre {
			background-color: var(--background-color-tertiary);
			padding: 0.5rem;
			border-radius: var(--border-radius);
		}

		pre > code {
			background-color: transparent;
			padding: 0;
			border-radius: 0;
		}

		.contains-task-list {
			list-style: none;
			padding-inline-start: 1rem;
		}

		.width-fit {
			max-inline-size: 100%;
		}

		.details-reset {
			background-color: var(--background-color-secondary);
			border: 1px solid var(--border-color);
			border-radius: var(--border-radius);
			padding: 1rem;
		}

		summary {
			padding-block-end: 0.5rem;
		}
	}
</style>
