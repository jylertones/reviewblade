import { Title } from "@solidjs/meta";
import { createSignal } from "solid-js";
import { Button } from "~/components/Button/Button";
import { Flex } from "~/components/Flex/Flex";
import { Input } from "~/components/Input/Input";
import { Label } from "~/components/Label/Label";
import { Text } from "~/components/Text/Text";
import { getApiKey, setApiKey } from "~/utils/apiKeyUtils";

export default function SettingsPage() {
  let [gitHubToken, setLocalGitHubToken] = createSignal(getApiKey() ?? "");

  function handleFormSubmit(event: SubmitEvent) {
    event.preventDefault();
    setApiKey(gitHubToken());
  }

  function handleClearData() {
    localStorage.clear();
    window.location.href = "/";
  }

  return (
    <>
      <Title>Settings</Title>
      <h1>Settings</h1>

      <form onsubmit={handleFormSubmit}>
        <Flex direction="column" gap={16}>
          <Flex direction="column" gap={4}>
            <div>
              <Label for="github_token">GitHub Token</Label>
              <Input
                id="github_token"
                name="github_token"
                type="text"
                value={gitHubToken()}
                onChange={(e) => setLocalGitHubToken(e.target.value)}
              />
            </div>
            <Text size="p2" variant="subtle">
              This token is generated in GitHub and is used to retrieve your
              pull requests. It is stored on your machine and is not transferred
              to or retained by ReviewBlade.
            </Text>
          </Flex>

          <Button type="submit" variant="primary">
            Save
          </Button>

          <Flex direction="column" gap={8}>
            <h2>Delete data</h2>
            <Text>
              If you want to delete your data, you may do so through your
              browser by clearing site data for this site, or you may click the
              button below.
            </Text>

            <Button onClick={handleClearData}>Delete data</Button>
          </Flex>
        </Flex>
      </form>
    </>
  );
}
