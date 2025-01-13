import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
	plugins: [sveltekit()],

	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
	},
	resolve: process.env.VITEST
		? {
				conditions: ['browser'],
			}
		: undefined,
});
