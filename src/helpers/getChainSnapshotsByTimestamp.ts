import moment from "moment";

export const getChainSnapshotsByTimestamp = (data: any) => {
  const feesSnapshotsByChain = data.map(({ chainId, snapshots }: any) => {
    const feesByTimestamp: any = {};
    const labels = [];
    const values = [];
    snapshots.map((snapshot: any) => {
      if (!feesByTimestamp[snapshot.timestamp]) {
        feesByTimestamp[snapshot.timestamp] = +snapshot["feesGenerated"];
      } else {
        feesByTimestamp[snapshot.timestamp] += +snapshot["feesGenerated"];
      }
    });

    for (const [key, value] of Object.entries(feesByTimestamp)) {
      labels.push(moment.unix(+key).format("DD.MM.YY"));
      values.push(value);
    }

    return { chainId, labels, values };
  });

  return feesSnapshotsByChain;
};
