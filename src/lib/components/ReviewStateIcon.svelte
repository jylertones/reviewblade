<script lang="ts">
	import type { PullRequestApprovalState } from '$lib/constants/reviews';
	import { Badge, BadgeAlert, BadgeCheck, BadgeInfo } from 'lucide-svelte';

	const mapApprovalStateToDisplay: Record<
		PullRequestApprovalState,
		{ label: string; icon: typeof Badge }
	> = {
		['waiting']: { label: 'Awaiting review', icon: Badge },
		['changes_requested']: { label: 'Changes requested', icon: BadgeAlert },
		['commented']: { label: 'Commented', icon: BadgeInfo },
		['approved']: { label: 'Approved', icon: BadgeCheck },
	};

	type ReviewStateIconProps = {
		state: PullRequestApprovalState;
	};

	const { state }: ReviewStateIconProps = $props();

	const Icon = mapApprovalStateToDisplay[state].icon;
</script>

<Icon class="status-icon" data-status={state} />

<style>
	:global {
		.status-icon {
			color: var(--text-secondary-color);
			block-size: var(--icon-size-large);
			inline-size: var(--icon-size-large);
		}

		.status-icon[data-status='changes-requested'] {
			color: var(--color-warning);
		}

		.status-icon[data-status='approved'] {
			color: var(--color-success);
		}
	}
</style>
