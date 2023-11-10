import moment from "moment";

export const formatChartData = (data: any) => {
  const labels = [];
  const values = [];

  for (const [key, value] of Object.entries(data)) {
    labels.push(moment.unix(+key).format("DD.MM.YY"));
    values.push(value);
  }

  return { labels, values };
};
