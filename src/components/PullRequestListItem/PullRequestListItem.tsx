import { createMemo, Show } from "solid-js";
import { getPullReviews } from "~/api/getPullReviews";
import { SearchPullRequestListItem } from "~/types/api";
import { PullRequestApprovalState } from "~/types/states";
import { getRepoPathFromPullRequest } from "~/utils/getRepoPathFromPullRequest";
import { Flex } from "../Flex/Flex";
import MessageSquare from "lucide-solid/icons/message-square";
import Github from "lucide-solid/icons/github";
import { formatDistance } from "date-fns";
import { ReviewStateIcon } from "../ReviewStateIcon/ReviewStateIcon";

import * as styles from "./PullRequestListItem.css";

type PullRequestListItemProps = {
  pullRequest: SearchPullRequestListItem;
};

export function PullRequestListItem({ pullRequest }: PullRequestListItemProps) {
  const { owner, repo } = getRepoPathFromPullRequest(pullRequest);
  const pullReviewsQuery = getPullReviews({
    owner,
    repo,
    pull_number: pullRequest.number,
  });

  const pullReviewState = createMemo(() =>
    (pullReviewsQuery?.data?.data ?? []).reduce((acc, curr) => {
      if ([acc, curr.state].includes("CHANGES_REQUESTED")) {
        return "changes_requested";
      }
      if (curr.state === "APPROVED") {
        return "approved";
      }

      return acc;
    }, "waiting" as PullRequestApprovalState),
  );

  return (
    <li class={styles.listItem}>
      <Show
        when={!pullReviewsQuery.isLoading && !pullReviewsQuery.isError}
        fallback={<span class="status-icon"></span>}
      >
        <ReviewStateIcon state={pullReviewState()} />
      </Show>

      <div class={styles.stack}>
        <div class={styles.title}>
          <a
            href={`/pull/${owner}/${repo}/${pullRequest.number}`}
            data-keyboard-focusable
          >
            {pullRequest.title}
          </a>
        </div>
        <div class={styles.secondLine}>
          Created{" "}
          {formatDistance(new Date(pullRequest.created_at), new Date(), {
            addSuffix: true,
          })}{" "}
          by
          {pullRequest.user?.login}
        </div>
      </div>

      <div class={styles.right}>
        <Flex gap={16} align="center">
          <Show when={pullRequest.comments > 0}>
            <Flex gap={4} align="center">
              <MessageSquare class={styles.messageSquare} />
              <span>{pullRequest.comments}</span>
            </Flex>
          </Show>
          <a href={pullRequest.html_url}>
            <Github class={styles.gitHubLink} />
          </a>
        </Flex>
      </div>
    </li>
  );
}
