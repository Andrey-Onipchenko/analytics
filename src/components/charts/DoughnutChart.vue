<template>
  <div class="chart">
    <v-chart class="chart" :option="option" />
  </div>
</template>

<script lang="ts">
import {
  TooltipComponent,
  LegendComponent,
  TitleComponent,
} from "echarts/components";
import { use } from "echarts/core";
import { PieChart } from "echarts/charts";
import VChart, { THEME_KEY } from "vue-echarts";
import { CanvasRenderer } from "echarts/renderers";

use([
  TooltipComponent,
  LegendComponent,
  PieChart,
  TitleComponent,
  CanvasRenderer,
]);
export default {
  props: {
    chartData: { type: Array, default: [] },
  },

  data(): any {
    return {
      option: {},
    };
  },

  watch: {
    chartData() {
      this.option = this.createChartOption();
    },
  },

  methods: {
    createChartOption() {
      const borrowFees: any = { name: "Borrow Fees", value: 0 };
      const liquidationFees: any = { name: "Liquidation Fees", value: 0 };
      const interestFees: any = { name: "Interest Fees", value: 0 };

      this.chartData.forEach((value: any) => {
        borrowFees.value += value.borrowFeesGenerated;
        liquidationFees.value += value.liquidationFeesGenerated;
        interestFees.value += value.interestFeesGenerated;
      });

      const total =
        borrowFees.value + interestFees.value + liquidationFees.value;

      return {
        title: {
          text: `Total By Category: $${total}`,
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          show: false,
        },
        series: [
          {
            name: "Fees by category",
            type: "pie",
            radius: ["40%", "60%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "left",
            },
            labelLine: {
              show: true,
            },
            data: [borrowFees, interestFees, liquidationFees],
          },
        ],
      };
    },
  },

  async created() {
    this.option = this.createChartOption();
  },

  components: {
    VChart,
  },

  provide: {
    [THEME_KEY as keyof typeof THEME_KEY]: "dark",
  },
};
</script>
<style lang="scss" scoped>
.chart {
  width: 400px;
  height: 400px;
}
</style>
