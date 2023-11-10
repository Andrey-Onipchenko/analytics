<template>
  <div class="wraper">
    <TvlGraph :tvlByChains="tvlByChains" v-if="tvlByChains" />
    <TvlStatistics :tvlByChains="tvlByChains" v-if="tvlByChains" />
  </div>
</template>

<script lang="ts">
import { getProtocolDailySnapshotsInfo } from "../../helpers/getProtocolDailySnapshotsInfo";
import TvlGraph from "./TvlGraph.vue";
import TvlStatistics from "./TvlStatistics.vue";

export default {
  data() {
    return {
      tvlByChains: null,
    };
  },

  async created() {
    const params = ["timestamp", "totalValueLockedUsd"];
    this.tvlByChains = await getProtocolDailySnapshotsInfo(params);
  },

  components: {
    TvlGraph,
    TvlStatistics,
  },
};
</script>

<style scoped>
.wraper {
  display: flex;
  gap: 30px;
}
</style>
