<script lang="ts">
	import type { PullRequestApprovalState } from '$lib/constants/reviews';
	import {
		Badge,
		BadgeAlert,
		BadgeCheck,
		BadgeHelp,
		BadgeInfo,
	} from 'lucide-svelte';

	const mapApprovalStateToDisplay: Record<
		PullRequestApprovalState,
		{ label: string; icon: typeof Badge }
	> = {
		['waiting']: { label: 'Awaiting review', icon: BadgeHelp },
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

<span title={mapApprovalStateToDisplay[state].label}>
	<Icon
		class="status-icon"
		data-status={state}
		aria-label={mapApprovalStateToDisplay[state].label}
	/>
</span>

<style>
	span {
		display: contents;
	}

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
