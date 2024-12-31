import { PUBLIC_GITHUB_API_TOKEN } from '$env/static/public';

export type RequestParams = {
	url: string;
	method?: 'GET' | 'POST' | 'PUT';
	body?: object;
	headers?: Record<string, string>;
};

export async function request(params: RequestParams) {
	const response = await fetch(params.url, {
		method: params.method,
		body: params.body ? JSON.stringify(params.body) : undefined,
		headers: {
			authorization: `Bearer ${PUBLIC_GITHUB_API_TOKEN}`,
			...params.headers,
		},
	});

	if (!response.ok) {
		if (response.status === 404) {
			console.error('Not found', params.url);
		} else {
			console.error('Request error', response.status);
		}
		throw new Error('Request error');
	}

	return response;
}
