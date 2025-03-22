import { createMemo, createSignal, Show, Suspense } from "solid-js";
import { getPullRequestComments } from "~/api/getPullRequestComments";
import { getPullReviews } from "~/api/getPullReviews";
import { PullRequest } from "~/types/api";
import { Box } from "../Box/Box";
import { BoxBody } from "../BoxBody/BoxBody";
import { Flex } from "../Flex/Flex";
import { Button } from "../Button/Button";
import { Dynamic } from "solid-js/web";
import ChevronDown from "lucide-solid/icons/chevron-down";
import ChevronRight from "lucide-solid/icons/chevron-right";
import { combineReviewsAndComments } from "~/utils/combineReviewsAndComments";
import { PullRequestDiscussion } from "../PullRequestDiscussion/PullRequestDiscussion";

export type PullRequestDiscussionProps = {
  owner: string;
  repo: string;
  pullNumber: number;
};

export function PullRequestDiscussionSection(
  props: PullRequestDiscussionProps,
) {
  const reviewsQuery = createMemo(() =>
    getPullReviews(
      {
        owner: props.owner,
        repo: props.repo,
        pull_number: props.pullNumber,
        mediaType: { format: "full" },
      },
      {
        enabled:
          props.pullNumber !== undefined && Number.isInteger(props.pullNumber),
      },
    ),
  );
  const commentsQuery = createMemo(() =>
    getPullRequestComments(
      {
        owner: props.owner,
        repo: props.repo,
        pull_number: props.pullNumber,
        mediaType: { format: "full" },
      },
      {
        enabled:
          props.pullNumber !== undefined && Number.isInteger(props.pullNumber),
      },
    ),
  );

  const [isSectionExpanded, setIsSectionExpanded] = createSignal(false);

  const combinedComments = createMemo(() =>
    combineReviewsAndComments(
      reviewsQuery?.().data?.data ?? [],
      commentsQuery?.().data?.data ?? [],
    ),
  );

  function handleDiscussionExpand() {
    setIsSectionExpanded(!isSectionExpanded());
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <section>
        <Box>
          <BoxBody>
            <Flex gap={16} direction="column">
              <Flex gap={8} justify="space-between">
                <h2>Discussion ({combinedComments().length})</h2>
                <Button
                  variant="icon"
                  aria-controls="expand-discussion"
                  aria-expanded={isSectionExpanded()}
                  onClick={handleDiscussionExpand}
                >
                  <Dynamic
                    component={isSectionExpanded() ? ChevronDown : ChevronRight}
                  />
                </Button>
              </Flex>

              <Show when={isSectionExpanded()}>
                <div id="expand-discussion">
                  <PullRequestDiscussion comments={combinedComments()} />
                </div>
              </Show>
            </Flex>
          </BoxBody>
        </Box>
      </section>
    </Suspense>
  );
}
