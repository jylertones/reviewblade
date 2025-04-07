import invariant from "invariant";

/**
 *
 * @param url
 * @returns
 */
export function getRepoPathFromUrl(url: string): {
  repo: string;
  owner: string;
} {
  const urlObject = new URL(url);
  const pathname = urlObject.pathname;
  const fullRepoUrlInParts = pathname.split("/");
  const owner = fullRepoUrlInParts[1];
  const repo = fullRepoUrlInParts[2];

  invariant(repo, "No repo found on PR");
  invariant(owner, "No owner found on PR");

  return { repo, owner };
}
