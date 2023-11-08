import axios from "axios";
import { DEFAULT_CHAINS } from "../constants";
import { getGraphUrl } from "./getGraphUrl";

export const getCauldronsInfo = async (queryArr: string[]) => {
  const query = `query MyQuery {
                        cauldrons {
                            ${queryArr.join(" ")}
                        }
                }`;

  return await Promise.all(
    DEFAULT_CHAINS.map(async (chainId: number) => {
      const url = getGraphUrl(chainId);
      const { data } = await axios.post(url, { query: query });

      return {
        chainId,
        cauldrons: data.data.cauldrons.map((item: any) => {
          return { ...item, chainId };
        }),
      };
    })
  );
};
