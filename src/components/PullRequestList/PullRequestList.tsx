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

export function PullRequestList(props: PullRequestListProps) {
  return (
    <>
      <Show when={props.isError}>
        <div>
          <h2>There was an error retrieving pull requests</h2>
        </div>
      </Show>

      <div class={styles.wrapper}>
        <Show when={props.title}>
          <div class={styles.header}>{props.title}</div>
        </Show>
        <Show
          when={props.pullRequests.length > 0}
          fallback={
            <div class={styles.noRequestsMessage}>
              <p>{props.noRequestsMessage}</p>
            </div>
          }
        >
          <ul class={styles.list}>
            <For each={props.pullRequests}>
              {(pr) => <PullRequestListItem pullRequest={pr} />}
            </For>
          </ul>
        </Show>
      </div>
    </>
  );
}
