import axios from "axios";
import { getGraphUrl } from "./getGraphUrl";
import { DEFAULT_CHAINS } from "../constants";

export const getProtocolDailySnapshotsInfo = async (
  queryArr: string[],
  first = 370,
  orderDirection = "desc",
  orderBy = "timestamp"
): Promise<any> => {
  const query = `query MyQuery {
        protocols {
          dailySnapshots(first: ${first}, orderDirection: ${orderDirection}, orderBy: ${orderBy}) {
            ${queryArr.join(" ")}
          }
        }
      }`;

  return await Promise.all(
    DEFAULT_CHAINS.map(async (chainId: number) => {
      const url = getGraphUrl(chainId);
      const { data } = await axios.post(url, { query: query });
      return {
        chainId,
        snapshots: data.data.protocols[0].dailySnapshots || [],
      };
    })
  );
};
