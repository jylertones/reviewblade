<script lang="ts">
	import type {
		CheckRunConclusion,
		CheckRunState,
	} from '$lib/constants/reviews';
	import {
		Badge,
		CircleAlert,
		CircleCheck,
		CircleCheckBig,
		CircleChevronRight,
		CircleDashed,
		CircleSlash,
		CircleStop,
		CircleX,
		LoaderCircle,
	} from 'lucide-svelte';

	const mapCheckRunConclusionToDisplay: Record<
		CheckRunConclusion,
		{ label: string; icon: typeof Badge }
	> = {
		['success']: { label: 'Success', icon: CircleCheckBig },
		['failure']: { label: 'Changes requested', icon: CircleX },
		['neutral']: { label: 'Commented', icon: CircleSlash },
		['cancelled']: { label: 'Approved', icon: CircleStop },
		skipped: { label: 'Skipped', icon: CircleChevronRight },
		timed_out: { label: 'Timed out', icon: CircleAlert },
		action_required: { label: 'Action required', icon: CircleAlert },
	};

	const mapCheckRunStateToDisplay: Record<
		CheckRunState,
		{ label: string; icon: typeof Badge }
	> = {
		['queued']: { label: 'Queued', icon: CircleDashed },
		['in_progress']: { label: 'In progress', icon: LoaderCircle },
		['completed']: { label: 'Completed', icon: CircleCheck },
		waiting: {
			label: '',
			icon: CircleDashed,
		},
		requested: {
			label: 'Requested',
			icon: CircleDashed,
		},
		pending: {
			label: '',
			icon: CircleDashed,
		},
	};

	type ReviewStateIconProps = {
		status: CheckRunState;
		conclusion: CheckRunConclusion | null;
	};

	const { status, conclusion }: ReviewStateIconProps = $props();

	const displayProps =
		status === 'completed' && conclusion !== null
			? mapCheckRunConclusionToDisplay[conclusion]
			: mapCheckRunStateToDisplay[status];

	const label = displayProps.label;
	const Icon = displayProps.icon;
</script>

<span title={label}>
	<Icon
		class="status-icon"
		data-status={status}
		data-conclusion={conclusion}
		aria-label={label}
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

		.status-icon[data-conclusion='failure'],
		.status-icon[data-conclusion='action_required']
			.status-icon[data-conclusion='cancelled'],
		.status-icon[data-conclusion='timed_out'] {
			color: var(--color-error);
		}

		.status-icon[data-conclusion='success'] {
			color: var(--color-success);
		}

		.status-icon[data-status='in_progress'] {
			color: var(--color-warning);
			animation: rotate 2s linear infinite;
		}

		@keyframes rotate {
			100% {
				transform: rotate(360deg);
			}
		}
	}
</style>
