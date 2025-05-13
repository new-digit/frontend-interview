import { describe, it, expect } from 'vitest';
import { filterAccountData } from './filterAccountData';
import type { AccountData } from '../api/mock';

const MOCK_DATA: AccountData[] = [
  {
    id: 1,
    name: 'Alice',
    mail: 'a@mail.com',
    totalBalance: 100,
    balance: 50,
    issueDate: 1,
    hasPaid: true,
  },
  {
    id: 2,
    name: 'Bob',
    mail: 'b@mail.com',
    totalBalance: 200,
    balance: 0,
    issueDate: 2,
    hasPaid: false,
  },
  {
    id: 3,
    name: 'Charlie',
    mail: 'c@mail.com',
    totalBalance: 300,
    balance: 150,
    issueDate: 3,
    hasPaid: true,
  },
];

describe('filterAccountData', () => {
  it('正常搜尋 name', () => {
    expect(filterAccountData(MOCK_DATA, 'Alice')).toEqual([MOCK_DATA[0]]);
  });
  it('搜尋空字串，回傳原資料', () => {
    expect(filterAccountData(MOCK_DATA, '')).toEqual(MOCK_DATA);
  });
  it('搜尋不存在的字串，回傳空陣列', () => {
    expect(filterAccountData(MOCK_DATA, 'ZZZ')).toEqual([]);
  });
  it('搜尋大小寫不敏感', () => {
    expect(filterAccountData(MOCK_DATA, 'alice')).toEqual([MOCK_DATA[0]]);
  });
  it('搜尋 id', () => {
    expect(filterAccountData(MOCK_DATA, '2')).toEqual([MOCK_DATA[1]]);
  });
  it('空陣列資料', () => {
    expect(filterAccountData([], 'Alice')).toEqual([]);
  });
  describe('錯誤與邊界值', () => {
    it('search 為 undefined', () => {
      expect(filterAccountData(MOCK_DATA)).toEqual(MOCK_DATA);
    });
    it('search 為 null', () => {
      // @ts-expect-error - 為測試目的忽略類型檢查
      expect(filterAccountData(MOCK_DATA, null)).toEqual(MOCK_DATA);
    });
  });
});
