import { request } from '$lib/utils/request';
import type { Endpoints } from '@octokit/types';

export type MergePullRequestParams = {
	owner: string;
	repo: string;
	pullNumber: number;
	method?: 'merge' | 'squash' | 'rebase';
};

export type MergePullRequestResponse =
	Endpoints['PUT /repos/{owner}/{repo}/pulls/{pull_number}/merge']['response']['data'];

export async function mergePullRequest({
	owner,
	repo,
	pullNumber,
	method = 'squash',
}: MergePullRequestParams) {
	const mergePullRequestApiUrl = `https://api.github.com/repos/${owner}/${repo}/pulls/${pullNumber}/merge`;

	const response = await request({
		url: mergePullRequestApiUrl,
		method: 'PUT',
		body: {
			merge_method: method,
		},
	});

	return (await response.json()) as MergePullRequestResponse;
}
