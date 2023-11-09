export const getTotalDailySnapshotsByTimestamp = (
  dataByChains: any,
  queryMethod: string
) => {
  const totalByTimestamp: any = {};

  dataByChains.map(({ snapshots }: any) => {
    snapshots.map((snapshot: any) => {
      if (!totalByTimestamp[snapshot.timestamp]) {
        totalByTimestamp[snapshot.timestamp] = +snapshot[queryMethod];
      } else {
        totalByTimestamp[snapshot.timestamp] += +snapshot[queryMethod];
      }
    });
  });

  return totalByTimestamp;
};
