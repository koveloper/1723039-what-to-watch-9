import { renderHook } from '@testing-library/react-hooks';
import { useGenerateKeys } from './use-generate-keys';

describe('Hook: useGenerateKeys', () => {
  it('should return array of strings with prefix and unique posfix', async () => {
    const prefix = 'test';
    const keysCount = 49;
    const {result} = renderHook(
      () => useGenerateKeys(prefix, keysCount),
    );
    const value = result.current;
    expect(value).toBeInstanceOf(Array);
    expect(value.length).toBe(keysCount);
    for(const key of value) {
      expect(key.startsWith(prefix)).toBe(true);
    }
  });
});
