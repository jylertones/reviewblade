import { CheckRun } from "~/types/api";
import { Flex } from "../Flex/Flex";
import { createEffect, createMemo, For } from "solid-js";
import { sortCheckRuns } from "~/utils/sortCheckRuns";
import { CheckRunsIcon } from "../CheckRunsIcon/CheckRunsIcon";

import * as styles from "./CheckRunsSummary.css";

export type CheckRunsSummaryProps = {
  checkRuns?: CheckRun[];
};

export function CheckRunsSummary(props: CheckRunsSummaryProps) {
  const groupedRuns = createMemo(() => {
    const sortedRuns = sortCheckRuns(props.checkRuns ?? []);

    const reducedRuns = sortedRuns.reduce((acc, run) => {
      const key = `${run.status}-${run.conclusion}`;
      if (!acc.has(key)) {
        acc.set(key, []);
      }

      acc.get(key)!.push(run);

      return acc;
    }, new Map<string, CheckRun[]>());

    console.log({ sortedRuns, reducedRuns });

    return reducedRuns;
  });

  return (
    <ul class={styles.checkRunsList}>
      <For each={Array.from(groupedRuns().values())}>
        {(runs) => (
          <li>
            <Flex gap={4} align="center">
              <CheckRunsIcon
                status={runs[0].status}
                conclusion={runs[0].conclusion}
              />
              <span>{runs.length}</span>
            </Flex>
          </li>
        )}
      </For>
    </ul>
  );
}
