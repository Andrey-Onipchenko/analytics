<template>
  <div class="wrap">
    <TotalByCategory :values="values" v-if="values.length > 0" />
    <div class="by-category" v-if="values.length > 0">
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

import { getByCategoryOption } from "@/helpers/fees/getGraphOptions";
import { getFeesByCategoryGraphData } from "@/helpers/fees/getFeesGraphData";

import TotalByCategory from "@/components/fees/TotalByCategory.vue";

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
      values: [],
      labels: [],
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
      const { labels, values } = await getFeesByCategoryGraphData();
      this.labels = labels;
      this.values = values;
    },

    getGraphOption() {
      this.option = getByCategoryOption(
        this.labels,
        this.values,
        this.interval
      );
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
    TotalByCategory,
  },

  provide: {
    [THEME_KEY as any]: "dark",
  },
};
</script>

<style lang="scss" scoped>
.wrap {
  display: flex;
  justify-content: space-between;
  gap: 30px;
}
.chart {
  height: 400px;
  min-width: 800px;
  width: 100%;
  z-index: 1;
}
.by-category {
  margin-top: 100px;
}
</style>
