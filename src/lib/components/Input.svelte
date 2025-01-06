<script lang="ts">
	export type InputProps = {
		id: string;
		type?: 'text' | 'password';
		name?: string;
		value: string;
		placeholder?: string;
		readonly?: boolean;
		autofocus?: boolean;
	};

	let { value = $bindable(''), ...other }: InputProps = $props();
</script>

<input bind:value {...other} />

<style>
	input {
		background-color: var(--background-color-secondary);
		color: var(--text-primary-color);
		border: 1px solid var(--border-color);
		padding: 0.5rem;
	}
</style>
