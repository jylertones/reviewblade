import { describe, expect, it } from 'vitest';
import { getFileExtension } from './getFileExtension';

describe('getFileExtension', () => {
	it('resolves simple file name', () => {
		expect(getFileExtension('d.js')).toEqual('js');
	});

	it('resolves a full path', () => {
		expect(getFileExtension('a/b/c.js')).toEqual('js');
	});

	it('no file extension is text', () => {
		expect(getFileExtension('README')).toEqual('text');
	});
});
