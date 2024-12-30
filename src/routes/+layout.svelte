<script>
	import Header from '$lib/components/Header.svelte';
	import 'prismjs';

	let { children } = $props();
</script>

<div class="layout-wrapper">
	<Header />

	<main>
		{@render children()}
	</main>
</div>

<style>
	.layout-wrapper {
		margin: 0 auto;
		max-width: 60rem;
	}

	:global {
		:root {
			font-family: Inter, sans-serif;
			font-feature-settings:
				'liga' 1,
				'calt' 1; /* fix for Chrome */

			--color-primary-90: #000c12;
			--color-primary-80: #001924;
			--color-primary-70: #002537;
			--color-primary-60: #003249;
			--color-primary-50: #003f5c;
			--color-primary-40: #35677e;
			--color-primary-30: #688d9e;
			--color-primary-20: #9ab3be;
			--color-primary-10: #cdd9df;

			--color-maroon-90: #25101d;
			--color-maroon-80: #4a2039;
			--color-maroon-70: #703056;
			--color-maroon-60: #953f72;
			--color-maroon-50: #bc5090;
			--color-maroon-40: #ca74a7;
			--color-maroon-30: #d797bd;
			--color-maroon-20: #e4bad3;
			--color-maroon-10: #f2dce9;

			--color-peach-90: #321413;
			--color-peach-80: #652726;
			--color-peach-70: #973b3a;
			--color-peach-60: #ca4e4d;
			--color-peach-50: #ff6361;
			--color-peach-40: #ff8382;
			--color-peach-30: #ffa2a1;
			--color-peach-20: #ffc1c0;
			--color-peach-10: #ffe0e0;

			--color-yellow-90: #322100;
			--color-yellow-80: #654200;
			--color-yellow-70: #976300;
			--color-yellow-60: #ca8300;
			--color-yellow-50: #ffa600;
			--color-yellow-40: #ffb935;
			--color-yellow-30: #ffca68;
			--color-yellow-20: #ffdc9a;
			--color-yellow-10: #ffedcd;

			--color-green-90: #002117;
			--color-green-80: #00432e;
			--color-green-70: #006444;
			--color-green-60: #00855b;
			--color-green-50: #00a873;
			--color-green-40: #35ba90;
			--color-green-30: #68cbac;
			--color-green-20: #9addc8;
			--color-green-10: #cdeee3;

			--background-color: var(--color-primary-70);
			--background-color-secondary: var(--color-primary-80);
			--text-primary-color: var(--color-primary-10);
			--text-secondary-color: var(--color-primary-30);

			--color-success: var(--color-green-50);
			--color-warning: var(--color-yellow-50);

			--base-size: 16px;
			--font-heading-size-1: 2rem;
			--font-heading-size-2: 1.5rem;
			--font-heading-size-3: 1.25rem;
			--font-heading-size-4: 1rem;
			--font-heading-size-5: 0.875rem;
			--font-heading-size-6: 0.75rem;

			--font-body-size-1: 1rem;
			--font-body-size-2: 0.875rem;

			--border-color: var(--color-primary-70);
		}

		@supports (font-variation-settings: normal) {
			:root {
				font-family: InterVariable, sans-serif;
			}
		}

		body {
			background-color: var(--background-color);
			color: var(--text-primary-color);

			font-family: Inter, Helvetica, sans-serif;
			font-size: var(--base-size);
		}

		h1 {
			font-size: var(--font-heading-size-1);
		}

		h2 {
			font-size: var(--font-heading-size-2);
		}

		h3 {
			font-size: var(--font-heading-size-3);
		}

		h4 {
			font-size: var(--font-heading-size-4);
		}

		h5 {
			font-size: var(--font-heading-size-5);
		}

		h6 {
			font-size: var(--font-heading-size-6);
		}

		a,
		a:visited {
			color: var(--text-primary-color);
			text-decoration: none;
		}

		a:hover {
			color: var(--text-secondary-color);
			text-decoration: underline;
		}
	}
</style>
