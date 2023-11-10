<template>
  <div class="wrap">
    <Dropdown :options="CHART_INTERVALS" @update="updateChartByPeriod" />
    <Dropdown :options="CHART_CHAINS" @update="updateChartByChain" />
    <BasicAreaChart :chartData="chartData" v-if="chartData" />
  </div>
</template>

<script lang="ts">
import { defineAsyncComponent } from "vue";
import { getGraphData } from "../../helpers/getGraphData";
import { CHART_CHAINS, CHART_INTERVALS } from "../../constants";
import { getChartDataByChain } from "../../helpers/getChartDataByChain";

export default {
  props: {
    tvlByChains: {},
  },

  data(): any {
    return {
      totalLabels: [],
      totalValues: [],
      chainLabels: [],
      chainValues: [],
      selectedChainId: null,
      CHART_INTERVALS,
      CHART_CHAINS,
      chartData: null,
    };
  },

  methods: {
    updateChartData(labels: string[], values: number[]) {
      this.chartData = { labels, values };
    },

    updateChartByPeriod(period: number) {
      const labelsArr = this.selectedChainId
        ? this.chainLabels
        : this.totalLabels;
      const valuesArr = this.selectedChainId
        ? this.chainValues
        : this.totalValues;

      this.updateChartData(
        [...labelsArr].splice(labelsArr.length - period),
        [...valuesArr].splice(valuesArr.length - period)
      );
    },

    updateChartByChain(chainId: number) {
      if (!chainId) {
        this.selectedChainId = null;
        return this.updateChartData(this.totalLabels, this.totalValues);
      }

      if (this.selectedChainId != chainId) {
        const { labels, values } = getChartDataByChain(
          this.tvlByChains,
          chainId,
          "totalValueLockedUsd"
        );

        this.chainLabels = labels;
        this.chainValues = values;
        this.selectedChainId = chainId;

        this.updateChartData(labels, values);
      }
    },

    async createChartData() {
      // todo rename
      const { totalLabels, totalValues } = await getGraphData(
        this.tvlByChains,
        "totalValueLockedUsd"
      );

      this.updateChartData(totalLabels, totalValues);

      this.totalLabels = totalLabels;
      this.totalValues = totalValues;
    },
  },

  async created() {
    this.createChartData();
  },

  components: {
    Dropdown: defineAsyncComponent(() => import("../ui/Dropdown.vue")),
    BasicAreaChart: defineAsyncComponent(
      () => import("../charts/BasicAreaChart.vue")
    ),
  },
};
</script>

<style>
.wrap {
  width: 100%;
  height: 600px;
}
</style>
