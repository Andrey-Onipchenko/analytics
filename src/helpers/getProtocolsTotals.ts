export const getProtocolsTotals = (totalsByChains: any, params: any) => {
  return totalsByChains.reduce((acc: any, object: any) => {
    return params.reduce((accumulator: object, query: string) => {
      const currentValue = acc[query] ? +acc[query] : 0;
      return { ...accumulator, [query]: currentValue + +object[query] };
    }, {});
  }, {});
};
