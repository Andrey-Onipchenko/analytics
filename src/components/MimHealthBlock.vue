<template>
  <div class="wrapper">
    <h3 class="title">MIM borrowed / Collateral deposited</h3>
    <div class="wrap">
      <div class="block">
        <h3>Total MIM borrowed</h3>
        <p>$ {{ totalMimBorrowed }}</p>
      </div>
      <div class="graph">
        <!-- <v-chart class="chart" :option="option" /> -->
        <PercentageGaugeChart />
      </div>
      <div class="block">
        <h3>Total Collateral deposit</h3>
        <p>$ {{ totalValueLockedUsd }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getProtocolsInfo } from "../helpers/getProtocolsInfo";
import { createGaugeOption } from "../helpers/graph/createGaugeOption";
import { getProtocolsTotals } from "../helpers/getProtocolsTotals";
import PercentageGaugeChart from "../components/charts/PercentageGaugeChart.vue";

export default {
  data(): any {
    return {
      option: null,
      totalMimBorrowed: 0,
      totalValueLockedUsd: 0,
    };
  },

  async mounted() {
    const gaugeData = [{ value: 25 }];
    this.option = createGaugeOption(gaugeData);

    const params = ["totalMimBorrowed", "totalValueLockedUsd"];
    const totalsByChains = await getProtocolsInfo(params);

    const { totalMimBorrowed, totalValueLockedUsd } = getProtocolsTotals(
      totalsByChains,
      params
    );

    this.totalMimBorrowed = totalMimBorrowed;
    this.totalValueLockedUsd = totalValueLockedUsd;
  },

  components: {
    PercentageGaugeChart,
  },
};
</script>

<style lang="scss" scoped>
.title {
  text-align: center;
}

.wrapper {
  // margin-top: 70px;
  border: 1px solid #000;
}

.wrap {
  display: flex;
  justify-content: space-between;
  gap: 30px;
  height: 350px;
}

.graph {
  width: 500px;
  height: 350px;
}

.block {
  width: 350px;
  height: 350px;
  background: #13192d;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
