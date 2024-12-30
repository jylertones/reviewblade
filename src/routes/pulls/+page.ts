import { getPullRequests } from '$lib/api/getPullRequests';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	try {
		const [myPullRequests, myReviewPullRequests] = await Promise.all([
			getPullRequests({
				q: `state:open author:jylertones is:pull-request`
			}),
			getPullRequests({
				q: `state:open is:pull-request review-requested:@me`
			})
		]);

		return {
			myPullRequests,
			myReviewPullRequests,
			isError: false
		};
	} catch (e) {
		console.error('Failure to pull the pull requests', e);
		return {
			myPullRequests: [],
			myReviewPullRequests: [],
			isError: true
		};
	}
};
