import { AccountData } from '../api/mock';

export function filterAccountData(data: AccountData[], search: string): AccountData[] {
  if (!search) return data;
  const lower = search.toLowerCase();
  return data.filter(
    (item) => item.name.toLowerCase().includes(lower) || item.id.toString().includes(lower),
  );
}
