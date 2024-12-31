<script lang="ts">
	import Flex from '$lib/components/Flex.svelte';
	import PullRequestList from '$lib/components/PullRequestList.svelte';

	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Pull requests</title>
</svelte:head>

<h1>Pull requests</h1>

<Flex gap={16} direction="column">
	<PullRequestList
		title={`My pull requests (${data.myPullRequests.length})`}
		pullRequests={data.myPullRequests}
		isError={data.isError}
	/>

	<PullRequestList
		title={`My reviews (${data.myReviewPullRequests.length})`}
		pullRequests={data.myReviewPullRequests}
		isError={data.isError}
	/>
</Flex>
