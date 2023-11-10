import moment from "moment";

export const getChartDataByChain = (
  graphData: any,
  chainId: number,
  queryMethod: string
) => {
  const labels: any = [];
  const values: any = [];

  graphData.map((data: any) => {
    if (data.chainId === chainId) {
      [...data.snapshots].reverse().forEach((snapshot: any) => {
        labels.push(moment.unix(snapshot.timestamp).format("DD.MM.YY"));
        values.push(snapshot[queryMethod]);
      });
    }
  });

  return { labels, values };
};
