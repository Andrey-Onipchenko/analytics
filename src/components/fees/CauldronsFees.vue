<template>
  <div class="wrap">
    <h3>Fees Statistics</h3>
    <div class="row">
      <div v-if="doughnutChartData.length">
        <Dropdown :options="CHART_INTERVALS" @update="updateDoughnutChart" />
        <DoughnutChart :chartData="doughnutChartData" />
      </div>

      <div v-if="stackedColumnChartData.labels.length">
        <Dropdown
          :options="CHART_INTERVALS"
          @update="updateStackedColumnChart"
        />
        <StackedColumnChart :chartData="stackedColumnChartData" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineAsyncComponent } from "vue";
import { CHART_INTERVALS } from "../../constants";
import { formatChartData } from "../../helpers/formatChartData";
import { getSnapshotsByTimestamp } from "../../helpers/getSnapshotsByTimestamp";
import { getProtocolDailySnapshotsInfo } from "../../helpers/getProtocolDailySnapshotsInfo";

export default {
  data(): any {
    return {
      option: {},
      interval: 30,
      values: [],
      labels: [],
      doughnutChartInterval: 30,
      stackedColumnChartInterval: 30,
      CHART_INTERVALS,
      chartData: null,
      graphParams: [
        "borrowFeesGenerated",
        "liquidationFeesGenerated",
        "interestFeesGenerated",
      ],
    };
  },

  computed: {
    doughnutChartData() {
      return [...this.values].splice(0, this.doughnutChartInterval);
    },

    stackedColumnChartData() {
      const borrowFeesValues: string[] = [];
      const interestFeesValues: string[] = [];
      const liquidationFeesValues: string[] = [];

      [...this.values]
        .splice(0, this.stackedColumnChartInterval)
        .forEach((value: any) => {
          borrowFeesValues.push(value.borrowFeesGenerated);
          interestFeesValues.push(value.interestFeesGenerated);
          liquidationFeesValues.push(value.liquidationFeesGenerated);
        });

      return {
        labels: [...this.labels].splice(0, this.stackedColumnChartInterval),
        legend: { data: ["Borrow Fees", "Liquidation Fees", "Interest Fees"] },
        series: [
          {
            name: "Borrow Fees",
            emphasis: {
              focus: "series",
            },
            data: borrowFeesValues,
            type: "bar",
            stack: "x",
          },
          {
            name: "Interest Fees",
            emphasis: {
              focus: "series",
            },
            data: interestFeesValues,
            type: "bar",
            stack: "x",
          },
          {
            name: "Liquidation Fees",
            emphasis: {
              focus: "series",
            },
            data: liquidationFeesValues,
            type: "bar",
            stack: "x",
          },
        ],
      };
    },
  },

  methods: {
    updateDoughnutChart(interval: number) {
      this.doughnutChartInterval = interval;
    },

    updateStackedColumnChart(interval: number) {
      this.stackedColumnChartInterval = interval;
    },

    async createChartData() {
      const feesByChains = await getProtocolDailySnapshotsInfo([
        "timestamp",
        ...this.graphParams,
      ]);

      const feesByTimestamp = getSnapshotsByTimestamp(
        feesByChains,
        this.graphParams
      );

      const { labels, values } = formatChartData(feesByTimestamp);

      this.labels = labels;
      this.values = values;
    },
  },

  async created() {
    await this.createChartData();
  },

  components: {
    DoughnutChart: defineAsyncComponent(
      () => import("../charts/DoughnutChart.vue")
    ),
    Dropdown: defineAsyncComponent(() => import("../ui/Dropdown.vue")),
    StackedColumnChart: defineAsyncComponent(
      () => import("../charts/StackedColumnChart.vue")
    ),
  },
};
</script>

<style lang="scss" scoped>
.wrap {
  display: flex;
  flex-direction: column;
  gap: 30px;
}
.row {
  display: flex;
  justify-content: space-between;
  gap: 30px;
}
</style>
