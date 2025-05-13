import { DEFAULT_CURRENCY } from '../constants';

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
