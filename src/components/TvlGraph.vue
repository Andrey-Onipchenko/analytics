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
      <button @click="tvlByPeriod(1000)">1Y</button>
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
import { getGraphData } from "../helpers/getGraphData";

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

    async tvlGraphData() {
      const { totalLabels, totalValues } = await getGraphData(
        this.tvlByChains,
        "totalValueLockedUsd"
      );

      this.option = createGraphOption(totalLabels, totalValues);
      this.totalLabels = totalLabels;
      this.totalValues = totalValues;
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
              [...item.snapshots].reverse().forEach((element: any) => {
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
