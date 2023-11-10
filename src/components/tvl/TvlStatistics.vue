<template>
  <div class="wraper">
    <TvlGraph :tvlByChains="tvlByChains" v-if="tvlByChains" />
    <TvlByChain :tvlByChains="tvlByChains" v-if="tvlByChains" />
  </div>
</template>

<script lang="ts">
import TvlGraph from "./TvlGraph.vue";
import TvlByChain from "./TvlByChain.vue";
import { getProtocolDailySnapshotsInfo } from "../../helpers/getProtocolDailySnapshotsInfo";

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
    TvlByChain,
  },
};
</script>

<style scoped>
.wraper {
  display: flex;
  gap: 30px;
}
</style>
