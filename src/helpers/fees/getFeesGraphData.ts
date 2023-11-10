import moment from "moment";
import {
  getFeesByCategoryDailySnapshots,
  getFeesByChainDailySnapshots,
} from "@/helpers/fees/getFees";

export const getFeesByCategoryGraphData = async () => {
  const feesByTimestamp: any = {};
  const labels = [];
  const values = [];
  const data = await getFeesByCategoryDailySnapshots();

  data.map(({ snapshots }: any) => {
    snapshots.map((snapshot: any) => {
      if (!feesByTimestamp[snapshot.timestamp]) {
        feesByTimestamp[snapshot.timestamp] = {
          borrowFeesGenerated: 0,
          liquidationFeesGenerated: 0,
          interestFeesGenerated: 0,
        };

        feesByTimestamp[snapshot.timestamp].borrowFeesGenerated =
          +snapshot.borrowFeesGenerated;

        feesByTimestamp[snapshot.timestamp].liquidationFeesGenerated =
          +snapshot.liquidationFeesGenerated;

        feesByTimestamp[snapshot.timestamp].interestFeesGenerated =
          +snapshot.interestFeesGenerated;
      } else {
        feesByTimestamp[snapshot.timestamp].borrowFeesGenerated +=
          +snapshot.borrowFeesGenerated;

        feesByTimestamp[snapshot.timestamp].liquidationFeesGenerated +=
          +snapshot.liquidationFeesGenerated;

        feesByTimestamp[snapshot.timestamp].interestFeesGenerated +=
          +snapshot.interestFeesGenerated;
      }
    });
  });

  for (const [key, value] of Object.entries(feesByTimestamp)) {
    labels.push(moment.unix(+key).format("DD.MM.YY"));
    values.push(value);
  }

  return { labels, values };
};

export const getFeesByChainGraphData = async () => {
  const data = await getFeesByChainDailySnapshots();

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
