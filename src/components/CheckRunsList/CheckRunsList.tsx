import { For } from "solid-js";
import { CheckRun } from "~/types/api";
import { sortCheckRuns } from "~/utils/sortCheckRuns";
import { Flex } from "../Flex/Flex";
import { CheckRunsIcon } from "../CheckRunsIcon/CheckRunsIcon";

import * as styles from "./CheckRunsList.css";

export type CheckRunsListProps = {
  checkRuns?: CheckRun[];
};

export function CheckRunsList(props: CheckRunsListProps) {
  const sortedRuns = sortCheckRuns(props.checkRuns ?? []);

  return (
    <ul class={styles.ul}>
      <For each={sortedRuns}>
        {(check) => (
          <li class={styles.li}>
            <a href={check.url} target="_blank">
              <Flex gap={8}>
                <CheckRunsIcon
                  status={check.status}
                  conclusion={check.conclusion}
                />
                <span>{check.name}</span>
              </Flex>
            </a>
          </li>
        )}
      </For>
    </ul>
  );
}
