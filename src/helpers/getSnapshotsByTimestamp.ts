export const getSnapshotsByTimestamp = (data: any, props: any) => {
  const feesByTimestamp: any = {};
  const start: any = {};

  props.forEach((element: any) => {
    start[element] = 0;
  });

  data.map(({ snapshots }: any) => {
    snapshots.map((snapshot: any) => {
      if (!feesByTimestamp[snapshot.timestamp])
        feesByTimestamp[snapshot.timestamp] = { ...start };

      props.forEach((element: any) => {
        feesByTimestamp[snapshot.timestamp][element] += +snapshot[element];
      });
    });
  });

  return feesByTimestamp;
};
