import moment from "moment";

export const getGraphData = async (data: any, queryMethod: string) => {
  const totalTvlByTimestamp: any = {};
  const totalLabels = [];
  const totalValues = [];

  data.map(({ snapshots }: any) => {
    snapshots.map((snapshot: any) => {
      if (!totalTvlByTimestamp[snapshot.timestamp]) {
        totalTvlByTimestamp[snapshot.timestamp] = +snapshot[queryMethod];
      } else {
        totalTvlByTimestamp[snapshot.timestamp] += +snapshot[queryMethod];
      }
    });
  });

  for (const [key, value] of Object.entries(totalTvlByTimestamp)) {
    totalLabels.push(moment.unix(+key).format("DD.MM.YY"));
    totalValues.push(value);
  }

  return { totalLabels, totalValues };
};
