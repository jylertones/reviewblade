import { createMemo, For, Show } from "solid-js";
import { Text } from "../Text/Text";
import { ReviewStateIcon } from "../ReviewStateIcon/ReviewStateIcon";
import { Flex } from "../Flex/Flex";
import { PullRequest } from "~/types/api";
import { getPullReviews } from "~/api/getPullReviews";
import { getConsolidatedReviews } from "~/utils/getConsolidatedReviews";

export type ApprovalsSummaryProps = {
  pullRequest?: PullRequest;
};

export function ApprovalsSummary(props: ApprovalsSummaryProps) {
  const pullRequestReviewsQuery = createMemo(() =>
    getPullReviews(
      {
        owner: props.pullRequest?.base.repo.owner.login ?? "",
        repo: props.pullRequest?.base.repo.name ?? "",
        pull_number: props.pullRequest?.number ?? 0,
      },
      {
        enabled: props.pullRequest !== undefined,
      },
    ),
  );

  const reviews = () =>
    props.pullRequest === undefined
      ? []
      : getConsolidatedReviews(
          props.pullRequest,
          pullRequestReviewsQuery().data?.data ?? [],
        );

  return (
    <Show when={reviews() && reviews().length > 0} fallback={<Text>None</Text>}>
      <For each={reviews()}>
        {(review) => (
          <Flex gap={4}>
            <ReviewStateIcon state={review.state} />
            <Text>{review.name}</Text>
          </Flex>
        )}
      </For>
    </Show>
  );
}
