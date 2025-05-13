import { describe, it, expect } from 'vitest';
import { formatCurrency } from './formatCurrency';

const DEFAULT = 'TWD';

describe('formatCurrency', () => {
  it('正常金額', () => {
    expect(formatCurrency(1234, DEFAULT)).toMatch(/1,234/);
  });
  it('0 金額', () => {
    expect(formatCurrency(0, DEFAULT)).toBe('');
  });
  it('負數金額', () => {
    expect(formatCurrency(-100, DEFAULT)).toMatch(/-100/);
  });
  describe('錯誤與邊界值', () => {
    it('NaN', () => {
      expect(formatCurrency(NaN, DEFAULT)).toBe('');
    });
    it('Infinity', () => {
      expect(formatCurrency(Infinity, DEFAULT)).toBe('');
    });
    it('null', () => {
      // @ts-expect-error - 為測試目的忽略類型檢查
      expect(formatCurrency(null, DEFAULT)).toBe('');
    });
    it('undefined', () => {
      // @ts-expect-error - 為測試目的忽略類型檢查
      expect(formatCurrency(undefined, DEFAULT)).toBe('');
    });
    it('非數字', () => {
      // @ts-expect-error - 為測試目的忽略類型檢查
      expect(formatCurrency('abc', DEFAULT)).toBe('');
    });
    it('錯誤 currency', () => {
      expect(formatCurrency(100, 'XXX')).toBe('Invalid amount');
    });
  });
});
