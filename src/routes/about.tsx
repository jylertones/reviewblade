import { useNavigate } from "@solidjs/router";
import { createSignal, Show } from "solid-js";
import { Button } from "~/components/Button/Button";
import { Flex } from "~/components/Flex/Flex";
import { Input } from "~/components/Input/Input";
import { Label } from "~/components/Label/Label";
import { Text } from "~/components/Text/Text";
import { hasApiKey, setApiKey } from "~/utils/apiKeyUtils";

export default function About() {
  const needsSetup = !hasApiKey();
  let [apiKeyLocal, setApiKeyLocal] = createSignal("");
  const navigate = useNavigate();

  function handleSubmitApiKey(event: SubmitEvent) {
    event.preventDefault();
    setApiKey(apiKeyLocal());
    navigate("/pulls");
  }

  return (
    <>
      <h1>Welcome to ReviewBlade</h1>

      <Flex direction="column" gap={16}>
        <Text>
          Welcome to this small tool that I made to help me keep track of my
          pull requests on GitHub.
        </Text>

        <Text>
          This tool stores no data on your machine. Your data lives on GitHub
          and your communication is with GitHub directly. Even your GitHub token
          is not stored on any ReviewBlade server. It is stored on your local
          machine and is only sent to GitHub.
        </Text>

        <Show when={needsSetup}>
          <Text>
            To get started, generate an access token and input it below. At the
            moment, classic personal access tokens are highly recommended
            because GitHub does not allow fine-grained tokens to access Checks
            (such as tests and workflows) that happen on a pull request. To see
            your personal access tokens, go to your GitHub settings, then
            Developer settings, then Personal access tokens. Or{" "}
            <a href="https://github.com/settings/tokens" target="_blank">
              click on this link to go directly to your personal access tokens
            </a>
            .
          </Text>

          <form>
            <Flex direction="column" gap={16}>
              <div>
                <Label for="github_token">GitHub Token</Label>
                <Input
                  name="github_token"
                  id="github_token"
                  value={apiKeyLocal()}
                  onChange={(e) => setApiKeyLocal(e.target.value)}
                />
              </div>
              <Button variant="primary" onClick={handleSubmitApiKey}>
                Save and View Pull Requests
              </Button>
            </Flex>
          </form>
        </Show>
      </Flex>
    </>
  );
}
