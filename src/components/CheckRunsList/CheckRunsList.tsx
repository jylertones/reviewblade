import { For } from "solid-js";
import { CheckRun } from "~/types/api";
import { sortCheckRuns } from "~/utils/sortCheckRuns";

import * as styles from "./CheckRunsList.css";
import { CheckRunsListItem } from "./CheckRunsListItem";

export type CheckRunsListProps = {
  checkRuns?: CheckRun[];
};

export function CheckRunsList(props: CheckRunsListProps) {
  const sortedRuns = sortCheckRuns(props.checkRuns ?? []);

  return (
    <ul class={styles.ul}>
      <For each={sortedRuns}>
        {(check) => <CheckRunsListItem check={check} />}
      </For>
    </ul>
  );
}
