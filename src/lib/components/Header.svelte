<script lang="ts">
	import { hasApiKey } from '$lib/utils/apiKeyUtils';
	import logo from '$lib/assets/logo_dark.svg';

	const needsSetup = !hasApiKey();
</script>

<div class="nav-wrapper">
	<div class="layout-wrapper">
		<nav>
			<a href="/">
				<img src={logo} alt="ReviewBlade" height="28" />
			</a>
			{#if needsSetup}
				<a href="/" class="right">Setup</a>
			{:else}
				<a href="/">Home</a>
				<a href="/pulls">Pull Requests</a>
				<a href="/settings" class="right">Settings</a>
			{/if}
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
		justify-items: space-between;

		max-inline-size: var(--layout-width);
		margin: 0 auto;
	}

	a {
		display: inline-flex;
		gap: 0.25rem;
		align-items: center;
	}

	.right {
		flex: 2;
		justify-content: right;
	}
</style>
