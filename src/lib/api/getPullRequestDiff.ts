import { request } from '$lib/utils/request';

export type GetPullRequestDiffParams = {
	owner: string;
	repo: string;
	pullNumber: number;
};

export async function getPullRequestDiff({ owner, repo, pullNumber }: GetPullRequestDiffParams) {
	const getPullRequestDiffApiUrl = `https://api.github.com/repos/${owner}/${repo}/pulls/${pullNumber}`;

	const response = await request({
		url: getPullRequestDiffApiUrl,
		method: 'GET',
		headers: {
			Accept: 'application/vnd.github.diff'
		}
	});

	return await response.text();
}
