<template>
  <div class="by-chain">
    <select
      name="intervals"
      id="intervals-select"
      @change="changeInterval(interval)"
      v-model="interval"
    >
      <option v-for="{ name, value } in intervals" :value="value">
        {{ name }}
      </option>
    </select>
    <VChart class="chart" :option="option" />
  </div>
</template>

<script lang="ts">
import { use } from "echarts/core";
import { BarChart } from "echarts/charts";
import {
  TitleComponent,
  GridComponent,
  TooltipComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";

import VChart, { THEME_KEY } from "vue-echarts";

import { getByChainOption } from "@/helpers/fees/getGraphOptions";
import { getFeesByChainGraphData } from "@/helpers/fees/getFeesGraphData";

use([
  TitleComponent,
  GridComponent,
  BarChart,
  CanvasRenderer,
  TooltipComponent,
]);

export default {
  data() {
    return {
      option: {},
      interval: 30,
      feesByChainGraphData: [],
    };
  },

  computed: {
    intervals() {
      return [
        { name: "1M", value: 30 },
        { name: "3M", value: 90 },
        { name: "6M", value: 180 },
        { name: "1Y", value: 365 },
      ];
    },
  },

  methods: {
    async getGraphData() {
      this.feesByChainGraphData = await getFeesByChainGraphData();
    },

    getGraphOption() {
      this.option = getByChainOption(this.feesByChainGraphData, this.interval);
    },
    changeInterval(newInterval: number) {
      this.interval = newInterval;
      this.getGraphOption();
    },
  },

  async created() {
    await this.getGraphData();
    this.getGraphOption();
  },

  components: {
    VChart,
  },

  provide: {
    [THEME_KEY as any]: "dark",
  },
};
</script>

<style lang="scss" scoped>
.chart {
  height: 400px;
  min-width: 400px;
  z-index: 1;
}
.by-chain {
  margin-top: 100px;
}
</style>
