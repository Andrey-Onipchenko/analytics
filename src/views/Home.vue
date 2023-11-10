<template>
  <div class="home">
    <h1 class="title">Analytics</h1>
    <h3>
      Analytics platform for tracking the liquidity, volume, and fees generated
      by Abracadabra products.
    </h3>
    <TvlBlock />
    <!-- <ByCategory />
    <ByChain />
    <MimHealthBlock />
    <CauldronsInfoBlock /> -->
  </div>
</template>

<script lang="ts">
import TvlBlock from "../components/tvlBlock/TvlBlock.vue";
import MimHealthBlock from "../components/MimHealthBlock.vue";
import CauldronsInfoBlock from "../components/CauldronsInfoBlock.vue";
import ByCategory from "../components/fees/ByCategory.vue";
import ByChain from "../components/fees/ByChain.vue";

export default {
  components: {
    TvlBlock,
    MimHealthBlock,
    CauldronsInfoBlock,
    ByCategory,
    ByChain,
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
