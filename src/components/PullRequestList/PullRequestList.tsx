import { For, Show } from "solid-js";
import { SearchPullRequestList } from "~/types/api";
import "./PullRequestList.css";
import { PullRequestListItem } from "../PullRequestListItem/PullRequestListItem";

import * as styles from "./PullRequestList.css";

export type PullRequestListProps = {
  title?: string;
  pullRequests: SearchPullRequestList;
  isError: boolean;
  noRequestsMessage: string;
};

export function PullRequestList({
  isError,
  noRequestsMessage,
  pullRequests,
  title,
}: PullRequestListProps) {
  return (
    <>
      <Show when={isError}>
        <div>
          <h2>There was an error retrieving pull requests</h2>
        </div>
      </Show>

      <div class={styles.wrapper}>
        <Show when={title}>
          <div class={styles.header}>{title}</div>
        </Show>
        <Show
          when={pullRequests.length > 0}
          fallback={
            <div class={styles.noRequestsMessage}>
              <p>{noRequestsMessage}</p>
            </div>
          }
        >
          <ul class={styles.list}>
            <For each={pullRequests}>
              {(pr) => <PullRequestListItem pullRequest={pr} />}
            </For>
          </ul>
        </Show>
      </div>
    </>
  );
}
