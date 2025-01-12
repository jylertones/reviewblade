import type { PullRequestResponse } from '$lib/api/getPullRequests';
import invariant from 'invariant';

export function getRepoPathFromPr(pr: PullRequestResponse[0]): {
	repo: string;
	owner: string;
} {
	const fullRepoUrlInParts = pr.repository_url.split('/');
	const repo = fullRepoUrlInParts.pop();
	const owner = fullRepoUrlInParts.pop();

	invariant(repo, 'No repo found on PR');
	invariant(owner, 'No owner found on PR');

	return { repo, owner };
}
