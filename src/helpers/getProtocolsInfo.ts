import axios from "axios";
import { getGraphUrl } from "./getGraphUrl";
const defaultChains = [1, 10, 250, 42161, 43114];

export const getProtocolsInfo = async (queryArr: string[]) => {
  const query = `query MyQuery {
        protocols {
          ${queryArr.join(" ")}
        }
      }`;

  return await Promise.all(
    defaultChains.map(async (chainId: number) => {
      const url = getGraphUrl(chainId);
      const { data } = await axios.post(url, { query: query });

      return queryArr.reduce(
        (acc: object, query: string) => ({
          ...acc,
          chainId,
          [query]: data.data.protocols[0][query],
        }),
        {}
      );
    })
  );
};
