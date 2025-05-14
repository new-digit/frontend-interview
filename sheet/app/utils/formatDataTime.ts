/**
 * 將 timestamp 格式化為 en-GB 的日期字串格式
 * @param timestamp - 要格式化的 timestamp
 * @returns 格式化後的日期字串，若輸入無效則回傳空字串
 * @example
 * formatDateTime(1710000000000) // '01 Apr 2024'
 */
export const formatDateTime = (timestamp: number) => {
  if (!timestamp) return '';
  const date = new Date(timestamp);

  try {
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  } catch (e) {
    console.error(e);
    return '';
  }
};
