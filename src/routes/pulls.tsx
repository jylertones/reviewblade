import { MetaProvider, Title } from "@solidjs/meta";
import { Show, Suspense } from "solid-js";
import { getSearchPullRequests } from "~/api/getSearchPullRequests";
import { Flex } from "~/components/Flex/Flex";
import { PullRequestList } from "~/components/PullRequestList/PullRequestList";
import { Text } from "~/components/Text/Text";

export default function PullsPage() {
  const myPullRequestsQuery = getSearchPullRequests({
    q: `state:open author:@me is:pull-request`,
  });

  const myReviewPullRequestsQuery = getSearchPullRequests({
    q: `state:open is:pull-request review-requested:@me`,
  });

  return (
    <Flex gap={16} direction="column">
      <Title>Pull requests</Title>
      <h1>Pull requests</h1>

      <Suspense fallback={<Text>Loading pull requests</Text>}>
        <PullRequestList
          title={`My pull requests (${myPullRequestsQuery.data?.data.total_count})`}
          pullRequests={myPullRequestsQuery.data?.data.items ?? []}
          isError={myPullRequestsQuery.isError}
          noRequestsMessage="👌 You don't have any outstanding pull requests"
        />
      </Suspense>

      <Suspense fallback={<Text>Loading code reviews</Text>}>
        <PullRequestList
          title={`My reviews (${myReviewPullRequestsQuery.data?.data.total_count})`}
          pullRequests={myReviewPullRequestsQuery.data?.data.items ?? []}
          isError={myReviewPullRequestsQuery.isError}
          noRequestsMessage="✅ You're all caught up with code reviews!"
        />
      </Suspense>
    </Flex>
  );
}
