import { getPullRequest } from '$lib/api/getPullRequest';
import { getPullReviews } from '$lib/api/getPullReviews';
import type { PageServerLoad } from './$types';
import { getCompare } from '$lib/api/getCompare';
import { getCheckRuns } from '$lib/api/getCheckRuns';

export const load: PageServerLoad = async ({ params }) => {
	// TODO: probably need to validate these
	const { owner, repo, pullNumber } = params;
	console.log({ owner, repo, pullNumber });
	const [pullRequest, pullRequestReviews] = await Promise.all([
		getPullRequest({
			owner: owner,
			repo: repo,
			pullNumber: Number(pullNumber),
		}),
		getPullReviews({
			owner,
			repo,
			pull_number: Number(pullNumber),
		}),
	]);

	const pullRequestDiff = getCompare({
		owner,
		repo,
		base: pullRequest.base.ref,
		head: pullRequest.head.ref,
	});

	const checkRuns = getCheckRuns({
		owner,
		repo,
		head: pullRequest.head.ref,
	});

	return {
		pullRequest,
		pullRequestReviews,
		pullRequestDiff,
		checkRuns,
		body: pullRequest.body_html,
	};
};
