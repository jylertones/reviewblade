import { createMemo, Show } from "solid-js";
import { getPullReviews } from "~/api/getPullReviews";
import { SearchPullRequestListItem } from "~/types/api";
import { PullRequestApprovalState } from "~/types/states";
import { getRepoPathFromUrl } from "~/utils/getRepoPathFromUrl";
import { Flex } from "../Flex/Flex";
import MessageSquare from "lucide-solid/icons/message-square";
import Github from "lucide-solid/icons/github";
import { formatDistance } from "date-fns";
import { ReviewStateIcon } from "../ReviewStateIcon/ReviewStateIcon";

import * as styles from "./PullRequestListItem.css";
import { A } from "@solidjs/router";

type PullRequestListItemProps = {
  pullRequest: SearchPullRequestListItem;
};

export function PullRequestListItem(props: PullRequestListItemProps) {
  const { owner, repo } = getRepoPathFromUrl(props.pullRequest.html_url);
  const pullReviewsQuery = getPullReviews({
    owner,
    repo,
    pull_number: props.pullRequest.number,
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
          <A
            href={`/pull/${owner}/${repo}/${props.pullRequest.number}`}
            data-keyboard-focusable
            data-github-link={props.pullRequest.html_url}
          >
            {props.pullRequest.title}
          </A>
        </div>
        <div class={styles.secondLine}>
          Created{" "}
          {formatDistance(new Date(props.pullRequest.created_at), new Date(), {
            addSuffix: true,
          })}{" "}
          by {props.pullRequest.user?.login}
        </div>
      </div>

      <div class={styles.right}>
        <Flex gap={16} align="center">
          <Show when={props.pullRequest.comments > 0}>
            <Flex gap={4} align="center">
              <MessageSquare class={styles.messageSquare} />
              <span>{props.pullRequest.comments}</span>
            </Flex>
          </Show>
          <a href={props.pullRequest.html_url}>
            <Github class={styles.gitHubLink} />
          </a>
        </Flex>
      </div>
    </li>
  );
}
