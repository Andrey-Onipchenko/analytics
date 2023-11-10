<template>
  <v-chart class="chart" :option="option" />
</template>

<script lang="ts">
import { use } from "echarts/core";
import { GaugeChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
import VChart, { THEME_KEY } from "vue-echarts";
import { getProtocolsInfo } from "../../helpers/getProtocolsInfo";
import { createGaugeOption } from "../../helpers/graph/createGaugeOption";
import { getProtocolsTotals } from "../../helpers/getProtocolsTotals";

use([GaugeChart, CanvasRenderer]);

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

  provide: {
    [THEME_KEY as keyof typeof THEME_KEY]: "dark",
  },

  components: {
    VChart,
  },
};
</script>
