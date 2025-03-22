import { createMemo, For, Suspense } from "solid-js";
import { getCompare } from "~/api/getCompare";
import { Flex } from "../Flex/Flex";
import { ReviewFile } from "../ReviewFile/ReviewFile";

export type PullRequestDiffProps = {
  owner: string;
  repo: string;
  base?: string;
  head?: string;
};

export function PullRequestDiff(props: PullRequestDiffProps) {
  const diffQuery = createMemo(() =>
    getCompare(
      {
        owner: props.owner,
        repo: props.repo,
        base: props.base ?? "",
        head: props.head ?? "",
      },
      {
        enabled: Boolean(props.base && props.head),
      },
    ),
  );

  return (
    <Suspense fallback="Loading diff...">
      <Flex direction="column" gap={16}>
        <For each={diffQuery().data?.data.files ?? []}>
          {(file) => <ReviewFile file={file} />}
        </For>
      </Flex>
    </Suspense>
  );
}
