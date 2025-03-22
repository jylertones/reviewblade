import { Title } from "@solidjs/meta";
import { useParams } from "@solidjs/router";
import { getPullRequest } from "~/api/getPullRequest";
import { Badge, BadgeProps } from "~/components/Badge/Badge";
import { Flex } from "~/components/Flex/Flex";
import Copy from "lucide-solid/icons/copy";
import { Button } from "~/components/Button/Button";
import ArrowRight from "lucide-solid/icons/arrow-right";
import ChevronDown from "lucide-solid/icons/chevron-down";
import ChevronRight from "lucide-solid/icons/chevron-right";
import Github from "lucide-solid/icons/github";
import { Text } from "~/components/Text/Text";
import {
  createEffect,
  createMemo,
  createSignal,
  Match,
  Show,
  Suspense,
  Switch,
} from "solid-js";
import { UserSubmittedText } from "~/components/UserSubmittedText/UserSubmittedText";
import { Box } from "~/components/Box/Box";
import { BoxBody } from "~/components/BoxBody/BoxBody";
import { getPullRequestMergeState } from "~/utils/getPullRequestMergeState";
import { getCheckRuns } from "~/api/getCheckRuns";
import { mergePullRequest } from "~/api/mergePullRequest";
import { CheckRunsSummary } from "~/components/CheckRunsSummary/CheckRunsSummary";
import { Dynamic } from "solid-js/web";
import { CheckRunsList } from "~/components/CheckRunsList/CheckRunsList";
import { ApprovalsSummary } from "~/components/ApprovalsSummary/ApprovalsSummary";
import { PullRequestDiscussionSection } from "~/components/PullRequestDiscussionSection/PullRequestDiscussionSection";
import { PullRequestDiff } from "~/components/PullRequestDiff/PullRequestDiff";

type Status = "open" | "closed" | "merged" | "draft";
const statusMap: Record<
  Status,
  { label: string; variant: BadgeProps["variant"] }
> = {
  draft: { label: "Draft", variant: "warning" },
  open: { label: "Open", variant: "default" },
  closed: { label: "Closed", variant: "warning" },
  merged: { label: "Merged", variant: "success" },
};

export default function PullRequestDetail() {
  const params = useParams();
  const pullRequestQuery = getPullRequest({
    owner: params.owner,
    repo: params.repo,
    pull_number: parseInt(params.pullNumber),
  });
  const checkRunsQuery = createMemo(() =>
    getCheckRuns(
      {
        owner: params.owner,
        repo: params.repo,
        ref: pullRequestQuery.data?.data.head.sha ?? "",
      },
      {
        enabled: !!pullRequestQuery.data?.data.head.sha,
      },
    ),
  );

  const mergePullRequestMutation = mergePullRequest();

  const [checksExpanded, setChecksExpanded] = createSignal(false);

  const pullRequest = () => pullRequestQuery.data?.data;
  const status = () => {
    if (pullRequest()?.draft) return "draft";
    if (pullRequest()?.merged_at) return "merged";
    if (pullRequest()?.state === "closed") return "closed";
    return "open";
  };
  const isNextStepToMerge = () => pullRequest()?.state === "open";
  const mergeState = () =>
    getPullRequestMergeState({ pullRequest: pullRequest() });

  function handleCopy() {
    const ref = pullRequest()?.head.ref;
    if (!ref) return;
    navigator.clipboard.writeText(ref);
  }

  const [isMerging, setIsMerging] = createSignal(false);
  async function handleMergePullRequest() {
    try {
      const pullRequestToMerge = pullRequest();
      if (isMerging() || !pullRequestToMerge) return;

      setIsMerging(true);
      const response = await mergePullRequestMutation.mutateAsync({
        owner: pullRequestToMerge.base.repo.owner.login,
        repo: pullRequestToMerge.base.repo.name,
        pull_number: pullRequestToMerge.number,
      });

      if (response.data.merged) {
        alert("Pull request merged successfully");
        location.reload();
      } else {
        alert("Error merging pull request");
      }
    } catch (e) {
      console.error(e);
      alert("Error merging pull request");
    } finally {
      setIsMerging(false);
    }
  }

  return (
    <>
      <Title>{pullRequest()?.title}</Title>

      <section>
        <Flex gap={8}>
          <Badge variant={statusMap[status()].variant}>
            {statusMap[status()].label}
          </Badge>
          <h1>{pullRequest()?.title}</h1>
        </Flex>

        <Flex direction="row" align="center" gap={4}>
          <Flex direction="row" align="center" gap={2}>
            <pre class="branch-name">{pullRequest()?.head.ref}</pre>
            <Button onClick={handleCopy} variant="icon">
              <Copy />
            </Button>
          </Flex>
          <ArrowRight />
          <pre class="branch-name">{pullRequest()?.base.ref}</pre>
        </Flex>
        <div>
          <Button href={pullRequest()?.html_url} target="_blank" rel="noopener">
            <Github />
            View on GitHub
          </Button>
        </div>
      </section>

      <section>
        <h2>Description</h2>

        <Suspense fallback={<Text>Loading...</Text>}>
          <UserSubmittedText text={pullRequest()?.body_html} />
        </Suspense>
      </section>

      <Show when={isNextStepToMerge()}>
        <section>
          <Box>
            <BoxBody>
              <Flex direction="column">
                <h2>Merge</h2>
                <Switch
                  fallback={
                    <Text>
                      This merge request cannot be merged because it is blocked:{" "}
                      {mergeState()}
                    </Text>
                  }
                >
                  <Match when={mergeState() === "ready"}>
                    <Flex gap={16}>
                      <Text>This request is ready to merge!</Text>
                      <Button
                        variant="primary"
                        onClick={handleMergePullRequest}
                        loading={isMerging()}
                      >
                        Merge pull request
                      </Button>
                    </Flex>
                  </Match>
                  <Match when={mergeState() === "dirty"}>
                    <Text>
                      This branch has conflicts with the upstream branch
                    </Text>
                  </Match>
                  <Match when={mergeState() === "checks_fail"}>
                    <Text>
                      The merge request cannot be merged because some checks
                      have not completed successfully
                    </Text>
                  </Match>
                  <Match when={mergeState() === "needs_review"}>
                    <Text>
                      The merge request cannot be merged because it needs to be
                      reviewed
                    </Text>
                  </Match>
                </Switch>
              </Flex>
            </BoxBody>
          </Box>
        </section>
      </Show>

      <section>
        <Box>
          <BoxBody>
            <Suspense fallback={<Text>Loading...</Text>}>
              <Flex gap={16} align="center">
                <h2>Checks</h2>
                <div class="checks-summary">
                  <CheckRunsSummary
                    checkRuns={checkRunsQuery().data?.data.check_runs}
                  />
                </div>
                <Button
                  variant="icon"
                  aria-controls="expand-checks"
                  aria-expanded={checksExpanded()}
                  onClick={() => setChecksExpanded(!checksExpanded())}
                >
                  <Dynamic
                    component={checksExpanded() ? ChevronDown : ChevronRight}
                  />
                </Button>
              </Flex>

              <Show when={checksExpanded()}>
                <div id="expand-checks">
                  <CheckRunsList
                    checkRuns={checkRunsQuery().data?.data.check_runs}
                  />
                </div>
              </Show>
            </Suspense>
          </BoxBody>
        </Box>
      </section>

      <section>
        <Box>
          <BoxBody>
            <Flex gap={8} align="center">
              <h2>Approvals</h2>

              <ApprovalsSummary pullRequest={pullRequest()} />
            </Flex>
          </BoxBody>
        </Box>
      </section>

      <PullRequestDiscussionSection
        owner={params.owner}
        repo={params.repo}
        pullNumber={Number(params.pullNumber)}
      />

      <section>
        <h2>Files</h2>

        <Suspense>
          <PullRequestDiff
            owner={params.owner}
            repo={params.repo}
            base={pullRequest()?.base.sha}
            head={pullRequest()?.head.sha}
          />
        </Suspense>
      </section>
    </>
  );
}
