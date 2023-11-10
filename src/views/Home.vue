<template>
  <div class="home">
    <h1 class="title">Analytics</h1>
    <h3>
      Analytics platform for tracking the liquidity, volume, and fees generated
      by Abracadabra products.
    </h3>
    <TvlStatistics />
    <CauldronsFees />
    <CauldronsFeeByChain />
    <MimHealthBlock />
    <!-- <CauldronsInfoBlock /> -->
  </div>
</template>

<script lang="ts">
import TvlStatistics from "../components/tvl/TvlStatistics.vue";
import CauldronsFees from "../components/fees/CauldronsFees.vue";
import CauldronsFeeByChain from "../components/fees/CauldronsFeeByChain.vue";
import MimHealthBlock from "../components/MimHealthBlock.vue";
// import CauldronsInfoBlock from "../components/CauldronsInfoBlock.vue";

export default {
  components: {
    TvlStatistics,
    CauldronsFees,
    CauldronsFeeByChain,
    MimHealthBlock,
    // CauldronsInfoBlock,
  },
};
</script>

<style lang="scss" scoped>
.home {
  margin: 50px 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
