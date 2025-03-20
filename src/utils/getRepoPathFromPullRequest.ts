import invariant from "invariant";
import { SearchPullRequestListItem } from "~/types/api";

export function getRepoPathFromPullRequest(
  pullRequest: SearchPullRequestListItem,
): {
  repo: string;
  owner: string;
} {
  const fullRepoUrlInParts = pullRequest.repository_url.split("/");
  const repo = fullRepoUrlInParts.pop();
  const owner = fullRepoUrlInParts.pop();

  invariant(repo, "No repo found on PR");
  invariant(owner, "No owner found on PR");

  return { repo, owner };
}
