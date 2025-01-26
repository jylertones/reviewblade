import { getPullRequest } from '$lib/api/getPullRequest';
import { getPullReviews } from '$lib/api/getPullReviews';
import type { PageLoad } from './$types';
import { getCompare } from '$lib/api/getCompare';
import { getCheckRuns } from '$lib/api/getCheckRuns';
import { getPullRequestComments } from '$lib/api/getPullRequestComments';

export const load: PageLoad = async ({ params }) => {
	// TODO: probably need to validate these
	const { owner, repo, pullNumber } = params;
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

	const checkRuns = await getCheckRuns({
		owner,
		repo,
		head: pullRequest.head.sha,
	});

	const pullRequestDiff = getCompare({
		owner,
		repo,
		base: pullRequest.base.ref,
		head: pullRequest.head.sha,
	});

	const pullRequestComments = getPullRequestComments({
		owner,
		repo,
		pullNumber: Number(pullNumber),
	});

	return {
		pullRequest,
		pullRequestReviews,
		pullRequestDiff,
		pullRequestComments,
		checkRuns,
		body: pullRequest.body_html,
	};
};
