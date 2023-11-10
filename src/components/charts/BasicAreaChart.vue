<template>
  <v-chart class="chart" :option="option" />
</template>

<script lang="ts">
import { createBasicAreaChartOption } from "../../helpers/chart/createBasicAreaChartOption";
import { use } from "echarts/core";
import { LineChart } from "echarts/charts";
import VChart, { THEME_KEY } from "vue-echarts";
import { CanvasRenderer } from "echarts/renderers";
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
    chartData: {},
  },

  data(): any {
    return {
      option: null,
    };
  },

  watch: {
    chartData() {
      this.updateChartOption();
    },
  },

  methods: {
    updateChartOption() {
      const { labels, values } = this.chartData;
      this.option.xAxis.data = labels;
      this.option.series[0].data = values;
    },
  },

  created() {
    const { labels, values } = this.chartData;
    this.option = createBasicAreaChartOption(labels, values);
  },

  provide: {
    [THEME_KEY]: "dark",
  },

  components: {
    VChart,
  },
};
</script>
