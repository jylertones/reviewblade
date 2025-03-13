import { Octokit } from "octokit";
import { getApiKey } from "./apiKeyUtils";

export const octokit = new Octokit({
  auth: getApiKey(),
  userAgent: "reviewblade/v0.0.1",
});
