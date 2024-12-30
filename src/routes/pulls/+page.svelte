<script lang="ts">
	import PullRequestList from '$lib/components/PullRequestList.svelte';

	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Pull requests</title>
</svelte:head>

<h1>Pull requests</h1>

<h2>My pull requests ({data.myPullRequests.length})</h2>
<PullRequestList pullRequests={data.myPullRequests} isError={data.isError} />

<h2>My reviews ({data.myReviewPullRequests.length})</h2>
<PullRequestList pullRequests={data.myReviewPullRequests} isError={data.isError} />
