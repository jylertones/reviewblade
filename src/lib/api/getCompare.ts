import { request } from '$lib/utils/request';
import type { Endpoints } from '@octokit/types';

export type GetCompareParams = {
	owner: string;
	repo: string;
	base: string;
	head: string;
};

export type CompareResponse =
	Endpoints['GET /repos/{owner}/{repo}/compare/{base}...{head}']['response']['data'];

export async function getCompare({ owner, repo, base, head }: GetCompareParams) {
	const getCompareApiUrl = `https://api.github.com/repos/${owner}/${repo}/compare/${base}...${head}`;

	const response = await request({
		url: getCompareApiUrl,
		method: 'GET'
	});

	return (await response.json()) as CompareResponse;
}
