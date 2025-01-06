<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Flex from '$lib/components/Flex.svelte';
	import Label from '$lib/components/Label.svelte';
	import Input from '$lib/components/Input.svelte';
	import Text from '$lib/components/Text.svelte';
	import { getApiKey, setApiKey } from '$lib/utils/apiKeyUtils';

	let gitHubToken = $state(getApiKey() ?? '');

	function handleFormSubmit(event: SubmitEvent) {
		event.preventDefault();
		setApiKey(gitHubToken);
	}

	function handleClearData() {
		localStorage.clear();
		window.location.href = '/';
	}
</script>

<svelte:head>
	<title>Settings</title>
</svelte:head>

<h1>Settings</h1>
<form onsubmit={handleFormSubmit}>
	<Flex direction="column" gap={16}>
		<Flex direction="column" gap={4}>
			<div>
				<Label for="github_token">GitHub Token</Label>
				<Input id="github_token" name="github_token" type="text" bind:value={gitHubToken} />
			</div>
			<Text size="p2" variant="subtle">
				This token is generated in GitHub and is used to retrieve your pull requests. It is stored
				on your machine and is not transferred to or retained by ReviewBlade.
			</Text>
		</Flex>

		<Button type="submit" variant="primary">Save</Button>

		<Flex direction="column" gap={8}>
			<h2>Delete data</h2>
			<Text
				>If you want to delete your data, you may do so through your browser by clearing site data
				for this site, or you may click the button below.</Text
			>

			<Button onClick={handleClearData}>Delete data</Button>
		</Flex>
	</Flex>
</form>
