import axios from "axios";
import { getGraphUrl } from "@/helpers/getGraphUrl";

type Chain = { name: string; id: number };

const defaultChains = [1, 10, 250, 42161, 43114];

export const queryMethods = {
  VALUE_LOCKED: "totalValueLockedUsd",
  FEES_GENERATED: "totalFeesGenerated",
  MIM_BORROWED: "totalMimBorrowed",
  BORROWING_FEES: "borrowFeesGenerated",
  INTEREST_FEES: "interestFeesGenerated",
  LIQUIDATION_FEES: "liquidationFeesGenerated",
};

const chains: Chain[] = [
  { name: "Ethereum", id: 1 },
  { name: "Optimism", id: 10 },
  { name: "Fantom", id: 250 },
  { name: "Arbitrum", id: 42161 },
  { name: "Avalanche", id: 43114 },
];

export const getTotal = (cauldronsData: any, queryMethod: string) => {
  let total = 0;

  cauldronsData.forEach((network: any) => {
    network.data.map((cauldron: any) => (total += +cauldron[queryMethod]));
  });

  return total;
};

export const getByChain = async (queryMethod: string) => {
  const query = `{
  protocols {
    ${queryMethod}
  }
}`;

  const totalByChain = await Promise.all(
    chains.map(async (chain: Chain) => {
      const { data } = await axios.post(getGraphUrl(chain.id), { query });
      return {
        value: +data.data.protocols[0][queryMethod],
        name: chain.name,
      };
    })
  );

  return totalByChain;
};

export const getByCauldron = async (queryMethod: string) => {
  const query = `{
    cauldrons {
      ${queryMethod}
      name
    }
  }`;

  const byCauldron = await Promise.all(
    chains.map(async (chain: Chain) => {
      const { data } = await axios.post(getGraphUrl(chain.id), { query });
      return data.data.cauldrons
        .filter((cauldron: any) => +cauldron[queryMethod] > 0)
        .map((cauldron: any) => {
          return { value: +cauldron[queryMethod], name: cauldron.name };
        });
    })
  );

  return byCauldron.flat();
};

export const getFeesByCategory = async () => {
  const query = `{
        protocols {
          totalFeesGenerated
          borrowFeesGenerated
          interestFeesGenerated
          liquidationFeesGenerated
        }
      }`;

  let fees = {
    total: 0,
    byCategory: [
      { name: "borrowFees", value: 0 },
      { name: "interestFees", value: 0 },
      { name: "liquidationFees", value: 0 },
    ],
  };

  await Promise.all(
    chains.map(async (chain: Chain) => {
      const { data } = await axios.post(getGraphUrl(chain.id), { query });
      const {
        borrowFeesGenerated,
        interestFeesGenerated,
        liquidationFeesGenerated,
        totalFeesGenerated,
      } = data.data.protocols[0];

      fees.byCategory[0].value += +borrowFeesGenerated;
      fees.byCategory[1].value += +interestFeesGenerated;
      fees.byCategory[2].value += +liquidationFeesGenerated;
      fees.total += +totalFeesGenerated;
    })
  );

  return fees;
};

export const getFeesByCategoryDailySnapshots = async (
  first = 1000,
  skip = 0,
  count = 0,
  data: any = []
): Promise<any> => {
  const query = `query MyQuery {
        protocols {
          dailySnapshots(first: ${first}, skip: ${skip}) {
            timestamp
            borrowFeesGenerated
            liquidationFeesGenerated
            interestFeesGenerated
          }
        }
      }`;

  data.push(
    await Promise.all(
      defaultChains.map(async (chainId: number) => {
        const url = getGraphUrl(chainId);
        const { data } = await axios.post(url, { query: query });

        return {
          chainId,
          snapshots: data.data.protocols[0].dailySnapshots || [],
        };
      })
    )
  );

  const isNextRequest = data[count].some(({ snapshots }: any) => {
    return snapshots.length >= first;
  });

  if (isNextRequest) {
    count++;
    return await getFeesByCategoryDailySnapshots(
      first,
      first * count,
      count,
      data
    );
  } else {
    return await data.reduce((accumulator: any, currentItem: any) => {
      return accumulator.map((item: any, index: number) => {
        return {
          chainId: item.chainId,
          snapshots: [...item.snapshots, ...currentItem[index].snapshots],
        };
      });
    });
  }
};

export const getFeesByChainDailySnapshots = async (
  first = 1000,
  skip = 0,
  count = 0,
  data: any = []
): Promise<any> => {
  const query = `query MyQuery {
        protocols {
          dailySnapshots(first: ${first}, skip: ${skip}) {
            timestamp
            feesGenerated
          }
        }
      }`;

  data.push(
    await Promise.all(
      defaultChains.map(async (chainId: number) => {
        const url = getGraphUrl(chainId);
        const { data } = await axios.post(url, { query: query });

        return {
          chainId,
          snapshots: data.data.protocols[0].dailySnapshots || [],
        };
      })
    )
  );

  const isNextRequest = data[count].some(({ snapshots }: any) => {
    return snapshots.length >= first;
  });

  if (isNextRequest) {
    count++;
    return await getFeesDailySnapshots(first, first * count, count, data);
  } else {
    return await data.reduce((accumulator: any, currentItem: any) => {
      return accumulator.map((item: any, index: number) => {
        return {
          chainId: item.chainId,
          snapshots: [...item.snapshots, ...currentItem[index].snapshots],
        };
      });
    });
  }
};
