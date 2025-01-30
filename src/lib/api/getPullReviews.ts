import type { Endpoints } from '@octokit/types';
import { request } from '$lib/utils/request';

export type ReviewParameters =
	Endpoints['GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews']['parameters'];
export type ReviewResponse =
	Endpoints['GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews']['response']['data'];

export async function getPullReviews(
	parameters: ReviewParameters,
): Promise<ReviewResponse> {
	const getReviewRequestApiUrl = `https://api.github.com/repos/${parameters.owner}/${parameters.repo}/pulls/${parameters.pull_number}/reviews`;

	const response = await request({
		url: getReviewRequestApiUrl,
		method: 'GET',
		headers: {
			Accept: 'application/vnd.github.full+json',
		},
	});

	return (await response.json()) as ReviewResponse;
}
