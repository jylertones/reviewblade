import { For, Show } from "solid-js";
import { Flex } from "../Flex/Flex";
import { Text } from "../Text/Text";
import { ConsolidatedComment } from "~/types/local";
import { PullRequestComment } from "../PullRequestComment/PullRequestComment";

export type PullRequestDiscussionProps = {
  comments: ConsolidatedComment[];
};

export function PullRequestDiscussion(props: PullRequestDiscussionProps) {
  return (
    <Flex direction="column" gap={16}>
      <Show
        when={props.comments.length !== 0}
        fallback={<Text>🥱 No discussion yet</Text>}
      >
        <For each={props.comments}>
          {(comment) => <PullRequestComment comment={comment} />}
        </For>
      </Show>
    </Flex>
  );
}
