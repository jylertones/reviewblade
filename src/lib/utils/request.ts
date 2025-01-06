import { getApiKey } from './apiKeyUtils';

export type RequestParams = {
	url: string;
	method?: 'GET' | 'POST' | 'PUT';
	body?: object;
	headers?: Record<string, string>;
};

export async function request(params: RequestParams) {
	const apiKey = getApiKey();

	const response = await fetch(params.url, {
		method: params.method,
		body: params.body ? JSON.stringify(params.body) : undefined,
		headers: {
			authorization: `Bearer ${apiKey}`,
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
