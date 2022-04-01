import { nanoid } from '@reduxjs/toolkit';
import { useMemo } from 'react';

export const useGenerateKeys = (base: string, keysCount: number): string[] => {
  const keys = useMemo<string[]>((): string[] => Array(keysCount).fill(null).map(() => `${base}-${nanoid()}`), [base, keysCount]);
  return keys;
};
