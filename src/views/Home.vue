<template>
  <div class="home">
    <h1>Analytics</h1>
    <TvlBlock />
    <ByCategory />
    <ByChain />
  </div>
</template>

<script>
import TvlBlock from "../components/TvlBlock.vue";
import ByCategory from "@/components/fees/ByCategory.vue";
import ByChain from "@/components/fees/ByChain.vue";

export default {
  components: { TvlBlock, ByCategory, ByChain },
};
</script>
