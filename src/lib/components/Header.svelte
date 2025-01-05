<script lang="ts">
	import { Sword } from 'lucide-svelte';
</script>

<div class="nav-wrapper">
	<div class="layout-wrapper">
		<nav>
			<a href="/">
				<Sword /> ReviewBlade
			</a>
			<a href="/">Home</a>
			<a href="/pulls">Pull Requests</a>
		</nav>
	</div>
</div>

<style>
	.nav-wrapper {
		background-color: var(--background-color-secondary);
	}

	.layout-wrapper {
		margin: 0 auto;
		inline-size: var(--layout-width);
		max-inline-size: 90vw;
	}

	nav {
		display: flex;
		gap: 1rem;
		align-items: center;
		padding-block: 0.5rem;

		max-inline-size: var(--layout-width);
		margin: 0 auto;
	}

	a {
		display: inline-flex;
		gap: 0.25rem;
		align-items: center;
	}
</style>
