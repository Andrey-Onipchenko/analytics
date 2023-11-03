<template>
  <div class="wrap">
    <div>
      <button @click="getTvlByChain()">All Chains</button>
      <button @click="getTvlByChain(1)">mainnet</button>
      <button @click="getTvlByChain(10)">OP</button>
      <button @click="getTvlByChain(250)">Fantom</button>
      <button @click="getTvlByChain(42161)">Arbirtum</button>
      <button @click="getTvlByChain(43114)">Avax</button>
    </div>
    <div>
      <button @click="tvlByPeriod(30)">1M</button>
      <button @click="tvlByPeriod(90)">3M</button>
      <button @click="tvlByPeriod(180)">6M</button>
      <button @click="tvlByPeriod(365)">1Y</button>
      <button @click="tvlByPeriod(1000)">all</button>
    </div>
    <v-chart class="chart" :option="option" />
  </div>
</template>

<script lang="ts">
import moment from "moment";
import { use } from "echarts/core";
import { LineChart } from "echarts/charts";
import VChart, { THEME_KEY } from "vue-echarts";
import { CanvasRenderer } from "echarts/renderers";
import { createGraphOption } from "../helpers/tvl/createGraphOption";
import {
  TooltipComponent,
  GridComponent,
  TitleComponent,
} from "echarts/components";

use([
  CanvasRenderer,
  LineChart,
  TooltipComponent,
  GridComponent,
  TitleComponent,
]);

export default {
  props: {
    tvlByChains: {},
  },

  data(): any {
    return {
      totalLabels: [],
      totalValues: [],
      labels: [],
      values: [],
      option: null,
      selectedChainId: null,
    };
  },

  methods: {
    updateGraphOption(labels: any, values: any) {
      this.option.xAxis.data = labels;
      this.option.series[0].data = values;
    },

    tvlGraphData() {
      const totalTvlByTimestamp: any = {};

      this.tvlByChains.map(({ snapshots }: any) => {
        snapshots.map(({ totalValueLockedUsd, timestamp }: any) => {
          if (!totalTvlByTimestamp[timestamp]) {
            totalTvlByTimestamp[timestamp] = +totalValueLockedUsd;
          } else {
            totalTvlByTimestamp[timestamp] += +totalValueLockedUsd;
          }
        });
      });

      for (const [key, value] of Object.entries(totalTvlByTimestamp)) {
        this.totalLabels.push(moment.unix(+key).format("DD.MM.YY"));
        this.totalValues.push(value);
      }

      this.option = createGraphOption(this.totalLabels, this.totalValues);
    },

    getTvlByChain(chainId: number) {
      if (!chainId) {
        this.selectedChainId = null;
        this.updateGraphOption(this.totalLabels, this.totalValues);
      } else {
        if (this.selectedChainId != chainId) {
          this.selectedChainId = chainId;
          this.labels = [];
          this.values = [];

          this.tvlByChains.map((item: any) => {
            if (item.chainId === chainId) {
              item.snapshots.forEach((element: any) => {
                this.labels.push(
                  moment.unix(element.timestamp).format("DD.MM.YY")
                );
                this.values.push(element.totalValueLockedUsd);
              });
            }
          });
        }

        this.updateGraphOption(this.labels, this.values);
      }
    },

    tvlByPeriod(period: number) {
      const isTotal = period >= 1000;
      const labelsArr = this.selectedChainId ? this.labels : this.totalLabels;
      const valuesArr = this.selectedChainId ? this.values : this.totalValues;

      const labels = isTotal
        ? labelsArr
        : [...labelsArr].splice(labelsArr.length - period, period);

      const values = isTotal
        ? valuesArr
        : [...valuesArr].splice(valuesArr.length - period, period);

      console.log("values", values);

      this.updateGraphOption(labels, values);
    },
  },

  async created() {
    this.tvlGraphData();
    console.log("tvlByChains", this.tvlByChains);
  },

  components: {
    VChart,
  },

  provide: {
    [THEME_KEY]: "dark",
  },
};
</script>

<style>
.wrap {
  width: 100%;
  height: 600px;
}
</style>
