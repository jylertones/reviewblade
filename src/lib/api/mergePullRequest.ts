import { request } from '$lib/utils/request';
import type { Endpoints } from '@octokit/types';

export type MergePullRequestParams = {
	owner: string;
	repo: string;
	pullNumber: number;
};

export type MergePullRequestResponse =
	Endpoints['PUT /repos/{owner}/{repo}/pulls/{pull_number}/merge']['response']['data'];

export async function mergePullRequest({
	owner,
	repo,
	pullNumber,
}: MergePullRequestParams) {
	const mergePullRequestApiUrl = `https://api.github.com/repos/${owner}/${repo}/pulls/${pullNumber}/merge`;

	const response = await request({
		url: mergePullRequestApiUrl,
		method: 'PUT',
	});

	return (await response.json()) as MergePullRequestResponse;
}
