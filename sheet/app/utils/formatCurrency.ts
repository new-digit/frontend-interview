import { DEFAULT_CURRENCY } from '../constants';

/**
 * 將數字格式化為貨幣字串
 * @param balance - 要格式化的金額數字
 * @param currency - 貨幣代碼，預設使用 DEFAULT_CURRENCY
 * @returns 格式化後的貨幣字串，若輸入無效則回傳空字串或錯誤訊息
 * @example
 * formatCurrency(1000, 'USD') // '$1,000.00'
 */
export const formatCurrency = (balance: number, currency: string = DEFAULT_CURRENCY) => {
  if (!balance || typeof balance !== 'number') {
    return '';
  }

  try {
    return new Intl.NumberFormat(undefined, {
      currency: currency,
      style: 'currency',
    }).format(balance);
  } catch {
    return 'Invalid amount';
  }
};
