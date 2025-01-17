import type { PullRequestCommentsResponse } from '$lib/api/getPullRequestComments';
import type { ReviewResponse } from '$lib/api/getPullReviews';
import type { ConsolidatedComment } from '$lib/types';
import { reviewStateToTyped } from './reviewStateToTyped';

export function combineReviewsAndComments(
	reviewsData: ReviewResponse['data'],
	commentsData: PullRequestCommentsResponse,
) {
	return [
		...reviewsData
			.filter(
				(review) =>
					review.user !== null &&
					(review.body_html !== '' || review.state !== 'COMMENTED'),
			)
			.map((review) => ({
				id: review.id,
				author: {
					name: review.user!.name ?? undefined,
					login: review.user!.login,
					id: review.user!.id,
					avatarUrl: review.user!.avatar_url,
				},
				body: review.body_html ?? '',
				createdAt: review.submitted_at
					? new Date(review.submitted_at)
					: undefined,
				state: reviewStateToTyped(review.state),
			})),
		...commentsData.reduce((acc, comment) => {
			const newComment = {
				id: comment.id,
				author: {
					name: comment.user.name ?? undefined,
					login: comment.user.login,
					id: comment.user.id,
					avatarUrl: comment.user.avatar_url,
				},
				state: 'commented',
				body: comment.body_html ?? '',
				createdAt: new Date(comment.created_at),
				diff: comment.in_reply_to_id
					? undefined
					: {
							diff: comment.diff_hunk,
							startLine: comment.start_line,
							lastLine: comment.line,
							path: comment.path,
							subjectType: comment.subject_type,
							reactions: comment.reactions,
						},
			};

			if (comment.in_reply_to_id) {
				const parentComment = acc.find((c) => c.id === comment.in_reply_to_id);
				if (parentComment) {
					parentComment.replies = [
						...(parentComment.replies ?? ([] as ConsolidatedComment[])),
						newComment,
					];
				}
			} else {
				acc.push(newComment);
			}

			return acc;
		}, [] as ConsolidatedComment[]),
	].sort((a, b) => {
		if (a.createdAt && b.createdAt) {
			return a.createdAt.getTime() - b.createdAt.getTime();
		}

		return 0;
	});
}
