<script>
	import Header from '$lib/components/Header.svelte';
	import 'prismjs';

	let { children } = $props();
</script>

<Header />

<div class="layout-wrapper">
	<main>
		{@render children()}
	</main>
</div>

<style>
	.layout-wrapper {
		margin: 0 auto;
		max-inline-size: var(--layout-width);
	}

	:global {
		:root {
			font-family: Inter, sans-serif;
			font-feature-settings:
				'liga' 1,
				'calt' 1; /* fix for Chrome */

			--layout-width: 60rem;

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
			--background-color-tertiary: var(--color-primary-60);
			--text-primary-color: var(--color-primary-10);
			--text-secondary-color: var(--color-primary-30);

			--color-success: var(--color-green-50);
			--color-warning: var(--color-yellow-50);

			--base-size: 16px;
			--font-heading-size-1: 1.5rem;
			--font-heading-line-height-1: 2;
			--font-heading-size-2: 1.25rem;
			--font-heading-line-height-2: 2;
			--font-heading-size-3: 1.25rem;
			--font-heading-line-height-3: 1.25;
			--font-heading-size-4: 1rem;
			--font-heading-line-height-4: 1.5;
			--font-heading-size-5: 0.875rem;
			--font-heading-line-height-5: 1.25;
			--font-heading-size-6: 0.75rem;
			--font-heading-line-height-6: 1.333333333;

			--font-body-size-1: 1rem;
			--font-body-size-2: 0.875rem;

			--border-width: 2px;
			--border-color: var(--color-primary-50);
			--border-radius: 0.5rem;

			--button-default-background-color: var(--color-primary-50);
			--button-default-border-color: var(--color-primary-40);
			--button-default-color: var(--color-primary-20);
			--button-default-hover-background-color: var(--color-primary-60);

			--button-primary-background-color: var(--color-maroon-50);
			--button-primary-border-color: var(--color-maroon-60);
			--button-primary-color: var(--color-maroon-10);
			--button-primary-hover-background-color: var(--color-maroon-60);

			--icon-size-large: var(--font-heading-size-2);
			--icon-size-default: var(--font-body-size-1);
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
			margin: 0;
			padding: 0;
		}

		main {
			padding-block-start: 1rem;
		}

		section + section {
			margin-block-start: 1rem;
		}

		h1,
		h2,
		h3,
		h4,
		h5,
		h6 {
			margin-block: 0;
		}

		h1 {
			font-size: var(--font-heading-size-1);
			line-height: var(--font-heading-line-height-1);
		}

		h2 {
			font-size: var(--font-heading-size-2);
			line-height: var(--font-heading-line-height-2);
		}

		h3 {
			font-size: var(--font-heading-size-3);
			font-weight: normal;
			line-height: var(--font-heading-line-height-3);
		}

		h4 {
			font-size: var(--font-heading-size-4);
			line-height: var(--font-heading-line-height-4);
		}

		h5 {
			font-size: var(--font-heading-size-5);
			line-height: var(--font-heading-line-height-5);
		}

		h6 {
			font-size: var(--font-heading-size-6);
			line-height: var(--font-heading-line-height-6);
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
