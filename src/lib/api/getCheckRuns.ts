import { request } from '$lib/utils/request';
import type { Endpoints } from '@octokit/types';

export type GetCheckRunsParams = {
	owner: string;
	repo: string;
	head: string;
};

export type CheckRunsResponse =
	Endpoints['GET /repos/{owner}/{repo}/commits/{ref}/check-runs']['response']['data'];

export async function getCheckRuns({ owner, repo, head }: GetCheckRunsParams) {
	const getCheckSuitesApiUrl = `https://api.github.com/repos/${owner}/${repo}/commits/${head}/check-runs?per_page=100`;

	const response = await request({
		url: getCheckSuitesApiUrl,
		method: 'GET',
	});

	return (await response.json()) as CheckRunsResponse;
}
