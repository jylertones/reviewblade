<script lang="ts">
	import { GitBranchPlus } from 'lucide-svelte';
</script>

<nav>
	<a href="/">
		<GitBranchPlus />
	</a>
	<a href="/">Home</a>
	<a href="/pulls">Pull Requests</a>
</nav>

<style>
	nav {
		display: flex;
		gap: 0.5rem;
		align-items: center;
	}
</style>
