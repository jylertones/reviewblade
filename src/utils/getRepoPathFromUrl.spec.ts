import { getRepoPathFromUrl } from "./getRepoPathFromUrl";
import { describe, expect, it } from "vitest";

describe("getRepoPathFromUrl", () => {
  const cases = [["https://github.com/owner/repo/pulls/3", "owner", "repo"]];

  it.for(cases)(
    "should return correct repo path from url %s",
    ([url, owner, repo]) => {
      const result = getRepoPathFromUrl(url);
      expect(result).toEqual({ owner, repo });
    },
  );
});
