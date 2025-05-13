import { AccountData } from '../api/mock';

/**
 * 透過搜尋字串，過濾帳號資料
 * @param data - 要過濾的帳號資料
 * @param search - 搜尋字串
 * @returns 過濾後的帳號資料
 */
export const filterAccountData = (data: AccountData[], search?: string): AccountData[] => {
  if (!search) return data;
  const lower = search.toLowerCase();
  return data.filter(
    (item) => item.name.toLowerCase().includes(lower) || item.id.toString().includes(lower),
  );
};
