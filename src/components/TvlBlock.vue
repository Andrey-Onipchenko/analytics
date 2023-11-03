<template>
  <div class="wraper">
    <TvlGraph :tvlByChains="tvlByChains" v-if="tvlByChains" />
    <TvlStatistics :tvlByChains="tvlByChains" v-if="tvlByChains" />
  </div>
</template>

<script lang="ts">
import { getTvlDailySnapshots } from "../helpers/tvl/getTvlDailySnapshots";
import TvlGraph from "../components/TvlGraph.vue";
import TvlStatistics from "../components/TvlStatistics.vue";

export default {
  data() {
    return {
      tvlByChains: null,
    };
  },

  async created() {
    this.tvlByChains = await getTvlDailySnapshots();
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
