import { CheckRun } from "~/types/api";

import * as styles from "./CheckRunsList.css";
import { createMemo, Show } from "solid-js";
import { Flex } from "../Flex/Flex";
import { CheckRunsIcon } from "../CheckRunsIcon/CheckRunsIcon";
import { Button } from "../Button/Button";
import RefreshIcon from "lucide-solid/icons/refresh-cw";
import { getRepoPathFromUrl } from "~/utils/getRepoPathFromUrl";
import { retryWorkflowFailedJobs } from "~/api/retryWorkflowFailedJobs";
import { getWorkflowRunIdFromCheckRun } from "~/utils/getWorkflowRunIdFromCheckRun";
import { retryJob } from "~/api/retryJob";

export type CheckRunsListItemProps = {
  check: CheckRun;
};

export function CheckRunsListItem({ check }: CheckRunsListItemProps) {
  const { repo, owner } = getRepoPathFromUrl(
    check.html_url ?? check.pull_requests[0].url,
  );
  const retryCheckRunMutation = retryJob();

  const isRetryableCheck = createMemo(() =>
    ["cancelled", "failure", "timed_out"].includes(check.conclusion ?? ""),
  );

  async function handleRetry() {
    try {
      await retryCheckRunMutation.mutateAsync({
        job_id: check.id,
        repo,
        owner,
      });
      alert("Check is being retried");
    } catch (e) {
      alert("Check retry failed");
    }
  }

  return (
    <li class={styles.li}>
      <Show
        when={check.details_url !== "undefined"}
        fallback={
          <Flex gap={8}>
            <CheckRunsIcon
              status={check.status}
              conclusion={check.conclusion}
            />
            <span>{check.name}</span>
          </Flex>
        }
      >
        <Flex gap={8}>
          <CheckRunsIcon status={check.status} conclusion={check.conclusion} />
          <a href={check.details_url!} target="_blank">
            {check.name}
          </a>
          <Show when={isRetryableCheck()}>
            <Button variant="icon" onClick={handleRetry}>
              <RefreshIcon size={16} />
            </Button>
          </Show>
        </Flex>
      </Show>
    </li>
  );
}
