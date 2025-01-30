import { hasApiKey } from '$lib/utils/apiKeyUtils';
import { redirect } from '@sveltejs/kit';

export async function load() {
	if (hasApiKey()) {
		redirect(307, '/pulls');
	} else {
		redirect(307, '/about');
	}
}
