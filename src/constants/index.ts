export const DEFAULT_CHAINS: number[] = [1, 10, 250, 42161, 43114];
type dropdownOption = {
  name: string;
  value: number;
};

export const CHART_INTERVALS: Array<dropdownOption> = [
  { name: "1M", value: 30 },
  { name: "3M", value: 90 },
  { name: "6M", value: 180 },
  { name: "1Y", value: 1000 },
];

export const CHART_CHAINS: Array<dropdownOption> = [
  { name: "All chains", value: "" },
  { name: "Mainnet", value: 1 },
  { name: "OP", value: 10 },
  { name: "Fantom", value: 250 },
  { name: "Arbirtum", value: 42161 },
  { name: "Avax", value: 43114 },
];

export const CHART_MONTH: Array<dropdownOption> = [
  { name: "1M", value: 1 },
  { name: "3M", value: 3 },
  { name: "6M", value: 6 },
  { name: "1Y", value: 12 },
];
