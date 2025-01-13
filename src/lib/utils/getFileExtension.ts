import { type StringLiteralUnion } from 'shiki';
import type { BundledLanguage } from 'shiki/bundle/web';

export function getFileExtension(
	filename: string,
): StringLiteralUnion<BundledLanguage, string> {
	return filename.includes('.')
		? (filename.split('.').pop() as StringLiteralUnion<BundledLanguage, string>)
		: 'text';
}
