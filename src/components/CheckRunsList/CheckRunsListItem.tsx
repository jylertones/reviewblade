import { CheckRun } from "~/types/api";

import * as styles from "./CheckRunsList.css";
import { createMemo, Show } from "solid-js";
import { Flex } from "../Flex/Flex";
import { CheckRunsIcon } from "../CheckRunsIcon/CheckRunsIcon";
import { Button } from "../Button/Button";
import { retryCheckRun } from "~/api/retryCheckRun";
import RefreshIcon from "lucide-solid/icons/refresh-cw";
import { getRepoPathFromUrl } from "~/utils/getRepoPathFromUrl";

export type CheckRunsListItemProps = {
  check: CheckRun;
};

export function CheckRunsListItem({ check }: CheckRunsListItemProps) {
  const { repo, owner } = getRepoPathFromUrl(check.html_url);
  const retryCheckRunMutation = retryCheckRun();

  const isRetryableCheck = createMemo(() =>
    ["cancelled", "failure", "timed_out"].includes(check.conclusion ?? ""),
  );

  function handleRetry() {
    try {
      const { repo, owner } = getRepoPathFromUrl(check.html_url);
      retryCheckRunMutation.mutateAsync({
        check_run_id: check.id,
        repo,
        owner,
      });
    } catch (e) {}
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
        <a href={check.details_url!} target="_blank">
          <Flex gap={8}>
            <CheckRunsIcon
              status={check.status}
              conclusion={check.conclusion}
            />
            <span>{check.name}</span>
            <Show when={isRetryableCheck}>
              <Button variant="icon" onClick={handleRetry}>
                <RefreshIcon size={16} />
              </Button>
            </Show>
          </Flex>
        </a>
      </Show>
    </li>
  );
}
