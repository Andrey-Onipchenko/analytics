<template>
  <div class="by-chain">
    <Dropdown :options="CHART_INTERVALS" @update="updateStackedColumnChartt" />

    <StackedColumnChart
      :chartData="stackedColumnChartData"
      v-if="chainsFeesByTimestamp"
    />
  </div>
</template>

<script lang="ts">
import { defineAsyncComponent } from "vue";
import { CHART_INTERVALS } from "../../constants";
import { getChainSnapshotsByTimestamp } from "../../helpers/getChainSnapshotsByTimestamp";
import { getProtocolDailySnapshotsInfo } from "../../helpers/getProtocolDailySnapshotsInfo";

export default {
  data(): any {
    return {
      chainsFeesByTimestamp: null,
      stackedColumnChartInterval: 30,
      CHART_INTERVALS,
      chains: {
        1: "Ethereum",
        10: "Optimism",
        250: "Fantom",
        42161: "Arbitrum",
        43114: "Avalanche",
      },
    };
  },

  computed: {
    stackedColumnChartData() {
      return {
        labels: [...this.chainsFeesByTimestamp[0].labels]
          .reverse()
          .splice(0, this.stackedColumnChartInterval)
          .reverse(),
        legend: {
          data: ["Ethereum", "Optimism", "Fantom", "Arbitrum", "Avalanche"],
        },
        series: this.chainsFeesByTimestamp.map((chain: any) => {
          return {
            name: this.chains[chain.chainId],
            emphasis: {
              focus: "series",
            },
            data: [...chain.values]
              .reverse()
              .splice(0, this.stackedColumnChartInterval)
              .reverse(),
            type: "bar",
            stack: "x",
          };
        }),
      };
    },
  },

  methods: {
    updateStackedColumnChartt(interval: any) {
      this.stackedColumnChartInterval = interval;
    },

    async createChartData() {
      const feesByChains = await getProtocolDailySnapshotsInfo([
        "timestamp",
        "feesGenerated",
      ]);

      this.chainsFeesByTimestamp = getChainSnapshotsByTimestamp(feesByChains);
    },
  },

  async created() {
    await this.createChartData();
  },

  components: {
    Dropdown: defineAsyncComponent(() => import("../ui/Dropdown.vue")),
    StackedColumnChart: defineAsyncComponent(
      () => import("../charts/StackedColumnChart.vue")
    ),
  },
};
</script>

<style lang="scss" scoped>
.chart {
  height: 400px;
  min-width: 400px;
  z-index: 1;
}
</style>
