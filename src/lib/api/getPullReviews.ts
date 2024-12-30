import type { Endpoints } from '@octokit/types';
import { request } from '$lib/utils/request';

export type ReviewParameters =
	Endpoints['GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews']['parameters'];
export type ReviewResponse =
	Endpoints['GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews']['response'];

export async function getPullReviews(
	parameters: ReviewParameters
): Promise<ReviewResponse['data']> {
	const getReviewRequestApiUrl = `https://api.github.com/repos/${parameters.owner}/${parameters.repo}/pulls/${parameters.pull_number}/reviews`;

	const response = await request({
		url: getReviewRequestApiUrl,
		method: 'GET'
	});

	return (await response.json()) as ReviewResponse['data'];
}
