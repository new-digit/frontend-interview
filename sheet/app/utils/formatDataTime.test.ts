import { describe, it, expect } from 'vitest';
import { formatDateTime } from './formatDataTime';

describe('formatDateTime', () => {
  it('正常 timestamp', () => {
    const ts = new Date('2024-01-01').getTime();
    expect(formatDateTime(ts)).toBe('01 Jan 2024');
  });
  it('timestamp 為 0', () => {
    expect(formatDateTime(0)).toBe('');
  });
  it('timestamp 為負數', () => {
    expect(formatDateTime(-1000000000000)).toBe('25 Apr 1938');
  });
  describe('錯誤與邊界值', () => {
    it('timestamp 為 undefined', () => {
      // @ts-expect-error - 為測試目的忽略類型檢查
      expect(formatDateTime(undefined)).toBe('');
    });
    it('timestamp 為 null', () => {
      // @ts-expect-error - 為測試目的忽略類型檢查
      expect(formatDateTime(null)).toBe('');
    });
    it('timestamp 為字串', () => {
      // @ts-expect-error - 為測試目的忽略類型檢查
      expect(formatDateTime('abc')).toBe('Invalid Date');
    });
    it('timestamp 為物件', () => {
      // @ts-expect-error - 為測試目的忽略類型檢查
      expect(formatDateTime({})).toBe('Invalid Date');
    });
  });
});
