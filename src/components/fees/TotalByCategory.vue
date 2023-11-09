<template>
  <div class="total-by-category">
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
import { PieChart } from "echarts/charts";
import {
  TooltipComponent,
  LegendComponent,
  TitleComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import VChart, { THEME_KEY } from "vue-echarts";
import { TotalChartData } from "@/helpers/fees/types";
import { getTotalByCategoryOption } from "@/helpers/fees/getGraphOptions";

use([
  TooltipComponent,
  LegendComponent,
  PieChart,
  TitleComponent,
  CanvasRenderer,
]);
export default {
  props: {
    values: { type: Array, default: [] },
  },

  data() {
    return {
      data: new TotalChartData(),
      option: {},
      interval: 30,
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
    changeInterval(newInterval: number) {
      this.interval = newInterval;
      this.option = getTotalByCategoryOption(this.values, this.interval);
    },
  },

  async created() {
    this.option = getTotalByCategoryOption(this.values, this.interval);
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
.total-by-category {
  margin-top: 100px;
}
.chart {
  height: 100px;
  width: 400px;
  height: 400px;
  z-index: 1;
}
</style>
