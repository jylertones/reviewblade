<script lang="ts">
	import Flex from '$lib/components/Flex.svelte';
	import PullRequestList from '$lib/components/PullRequestList.svelte';

	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	function handleKeyUp(event: KeyboardEvent) {
		const focusedItem = document.activeElement;
		const allFocusableListItems = document.querySelectorAll(
			'[data-keyboard-focusable]',
		);
		const focusedItemIndex = focusedItem
			? Array.from(allFocusableListItems).indexOf(focusedItem)
			: -1;

		if (event.key === 'ArrowUp' || event.key === 'k') {
			if (focusedItemIndex === -1) return;

			allFocusableListItems[Math.max(0, focusedItemIndex - 1)].focus();

			return;
		}

		if (event.key === 'ArrowDown' || event.key === 'j') {
			allFocusableListItems[
				Math.min(allFocusableListItems.length - 1, focusedItemIndex + 1)
			].focus();
			return;
		}
	}
</script>

<svelte:window onkeyup={handleKeyUp} />

<svelte:head>
	<title>Pull requests</title>
</svelte:head>

<Flex gap={16} direction="column">
	<h1>Pull requests</h1>

	<PullRequestList
		title={`My pull requests (${data.myPullRequests.length})`}
		pullRequests={data.myPullRequests}
		isError={data.isError}
		noRequestsMessage="👌 You don't have any outstanding pull requests"
	/>

	<PullRequestList
		title={`My reviews (${data.myReviewPullRequests.length})`}
		pullRequests={data.myReviewPullRequests}
		isError={data.isError}
		noRequestsMessage="✅ You're all caught up with code reviews!"
	/>
</Flex>
