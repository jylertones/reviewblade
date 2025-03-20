import { ConsolidatedComment } from "~/types/local";
import { Box } from "../Box/Box";
import { BoxTitle } from "../BoxTitle/BoxTitle";
import { Flex } from "../Flex/Flex";
import { ReviewStateIcon } from "../ReviewStateIcon/ReviewStateIcon";
import { Text } from "../Text/Text";
import { formatDistance } from "date-fns";
import { For, Show } from "solid-js";
import { BoxBody } from "../BoxBody/BoxBody";
import { UserSubmittedText } from "../UserSubmittedText/UserSubmittedText";
import { getFileExtension } from "~/utils/getFileExtension";
import { HighlightedCode } from "../HighlightedCode/HighlightedCode";

export type PullRequestCommentProps = {
  comment: ConsolidatedComment;
};

export function PullRequestComment(props: PullRequestCommentProps) {
  return (
    <Box>
      <BoxTitle>
        <Flex gap={4} align="center">
          <ReviewStateIcon state={props.comment.state} />
          <Text size="p2">
            {props.comment.author.login} {props.comment.state}
          </Text>
          <Text variant="subtle" size="p2">
            {props.comment.createdAt &&
              formatDistance(props.comment.createdAt, new Date())}{" "}
            ago
          </Text>
        </Flex>
      </BoxTitle>
      <Show
        when={props.comment.body || props.comment.replies || props.comment.diff}
      >
        <BoxBody>
          <Show when={props.comment.diff}>
            <div>{props.comment.diff!.path}</div>
            <HighlightedCode
              code={props.comment.diff!.diff}
              extension={getFileExtension(props.comment.diff!.path)}
            />
          </Show>

          <Show when={props.comment.body}>
            <UserSubmittedText text={props.comment.body} />
          </Show>

          <Show when={props.comment.replies}>
            <For each={props.comment.replies}>
              {(reply) => <PullRequestComment comment={reply} />}
            </For>
          </Show>
        </BoxBody>
      </Show>
    </Box>
  );
}
