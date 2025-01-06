export const apiKeyStorageKey = 'github_api_key';

export function hasApiKey() {
	return getApiKey() !== null;
}

export function setApiKey(keyValue: string | null) {
	if (keyValue === null) return;

	window.localStorage.setItem(apiKeyStorageKey, keyValue);
}

export function getApiKey() {
	return window.localStorage.getItem(apiKeyStorageKey);
}
