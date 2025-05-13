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
