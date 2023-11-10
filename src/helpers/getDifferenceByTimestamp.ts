import { DEFAULT_CHAINS } from "../constants";
import { getTimestamp } from "./getTimestamp";

export const getDifferenceByTimestamp = (
  dataByChains: any,
  difference: number
) => {
  const total: any = [];
  const result: any = [];

  dataByChains.map(({ snapshots, chainId }: any) => {
    snapshots.map(({ totalValueLockedUsd, timestamp }: any) => {
      if (+timestamp === getTimestamp()) {
        total.push({
          chainId,
          totalValueLockedUsd,
        });
      }

      if (+timestamp === getTimestamp(difference)) {
        result.push({
          chainId,
          totalValueLockedUsd,
        });
      }
    });
  });

  const resultChains = result.map((item: any) => item.chainId);
  const totaltChains = total.map((item: any) => item.chainId);

  DEFAULT_CHAINS.map((chainId: any) => {
    if (!resultChains.includes(chainId)) {
      result.push({ chainId, totalValueLockedUsd: 0 });
    }
    if (!totaltChains.includes(chainId)) {
      total.push({ chainId, totalValueLockedUsd: 0 });
    }
  });

  return total.map((item: any, index: number) => {
    return {
      chainId: item.chainId,
      totalValueLockedUsd:
        item.totalValueLockedUsd - result[index].totalValueLockedUsd,
    };
  });
};
