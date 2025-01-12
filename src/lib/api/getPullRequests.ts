import type { Endpoints } from '@octokit/types';
import { request } from '$lib/utils/request';

export type PullRequestParameters =
	Endpoints['GET /search/issues']['parameters'];
export type PullRequestResponse =
	Endpoints['GET /search/issues']['response']['data']['items'];

export async function getPullRequests(parameters: PullRequestParameters) {
	const getPullRequestApiUrl = `https://api.github.com/search/issues?q=${encodeURIComponent(parameters.q)}`;

	const response = await request({
		url: getPullRequestApiUrl,
		method: 'GET',
	});

	return (await response.json()).items as PullRequestResponse;
}
