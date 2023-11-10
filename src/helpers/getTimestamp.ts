export const getTimestamp = (difference = 0) => {
  const date = new Date();
  const today = date.getDate();
  const day = today <= 9 ? `0${today}` : today;

  const month = date.getMonth() + 1 - difference;

  const parseMonth = month <= 0 ? 12 + month : month;
  const formatMonth = parseMonth <= 9 ? `0${parseMonth}` : parseMonth;
  const year = month <= 0 ? date.getFullYear() - 1 : date.getFullYear();

  return Date.parse(`${year}-${formatMonth}-${day}T00:00:00Z`) / 1000;
};
