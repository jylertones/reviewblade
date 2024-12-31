<script lang="ts">
	import { GitBranchPlus } from 'lucide-svelte';
</script>

<div class="nav-wrapper">
	<nav>
		<a href="/">
			<GitBranchPlus />
		</a>
		<a href="/">Home</a>
		<a href="/pulls">Pull Requests</a>
	</nav>
</div>

<style>
	.nav-wrapper {
		background-color: var(--background-color-secondary);
	}

	nav {
		display: flex;
		gap: 0.5rem;
		align-items: center;
		padding-block: 0.5rem;

		max-inline-size: var(--layout-width);
		margin: 0 auto;
	}
</style>
