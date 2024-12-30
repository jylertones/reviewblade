import { request } from '$lib/utils/request';
import type { Endpoints } from '@octokit/types';

export type GetPullRequestParams = {
	owner: string;
	repo: string;
	pullNumber: number;
};

export type PullRequestResponse =
	Endpoints['GET /repos/{owner}/{repo}/pulls/{pull_number}']['response']['data'];

export async function getPullRequest({ owner, repo, pullNumber }: GetPullRequestParams) {
	const getPullRequestApiUrl = `https://api.github.com/repos/${owner}/${repo}/pulls/${pullNumber}`;

	const response = await request({
		url: getPullRequestApiUrl,
		method: 'GET'
	});

	return (await response.json()) as PullRequestResponse;
}
