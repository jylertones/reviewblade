<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Flex from '$lib/components/Flex.svelte';
	import Input from '$lib/components/Input.svelte';
	import Label from '$lib/components/Label.svelte';
	import Text from '$lib/components/Text.svelte';
	import { hasApiKey, setApiKey } from '$lib/utils/apiKeyUtils';

	const needsSetup = !hasApiKey();
	let apiKey = $state('');

	function handleSubmitApiKey(event: SubmitEvent) {
		event.preventDefault();
		setApiKey(apiKey);
		window.location.href = '/pulls';
	}
</script>

<h1>Welcome to ReviewBlade</h1>

<Flex direction="column" gap={16}>
	<Text>
		Welcome to this small tool that I made to help me keep track of my pull
		requests on GitHub.
	</Text>

	<Text>
		This tool stores no data on your machine. Your data lives on GitHub and your
		communication is with GitHub directly. Even your GitHub token is not stored
		on any ReviewBlade server. It is stored on your local machine and is only
		sent to GitHub.
	</Text>

	{#if needsSetup}
		<Text>
			To get started, generate an access token and input it below. At the
			moment, classic personal access tokens are highly recommended because
			GitHub does not allow fine-grained tokens to access Checks (such as tests
			and workflows) that happen on a pull request. To see your personal access
			tokens, go to your GitHub settings, then Developer settings, then Personal
			access tokens. Or <a
				href="https://github.com/settings/tokens"
				target="_blank"
				>click on this link to go directly to your personal access tokens</a
			>href.
		</Text>

		<form>
			<Flex direction="column" gap={16}>
				<div>
					<Label for="github_token">GitHub Token</Label>
					<Input name="github_token" id="github_token" bind:value={apiKey} />
				</div>
				<Button variant="primary" onClick={handleSubmitApiKey}
					>Save and View Pull Requests</Button
				>
			</Flex>
		</form>
	{/if}
</Flex>
