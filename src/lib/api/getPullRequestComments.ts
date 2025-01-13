import { request } from '$lib/utils/request';
import type { Endpoints } from '@octokit/types';

export type GetPullRequsetCommentsParams = {
	owner: string;
	repo: string;
	pullNumber: number;
};

export type PullRequestCommentsResponse =
	Endpoints['GET /repos/{owner}/{repo}/pulls/{pull_number}/comments']['response']['data'];

export async function getPullRequestComments({
	owner,
	repo,
	pullNumber,
}: GetPullRequsetCommentsParams) {
	const getPullRequestCommentsApiUrl = `https://api.github.com/repos/${owner}/${repo}/pulls/${pullNumber}/comments`;

	const response = await request({
		url: getPullRequestCommentsApiUrl,
		method: 'GET',
		headers: {
			Accept: 'application/vnd.github.full+json',
		},
	});

	return (await response.json()) as PullRequestCommentsResponse;
}
