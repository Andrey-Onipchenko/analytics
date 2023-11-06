<template>
  <div class="home">
    <h1>Analytics</h1>
    <TvlBlock />
    <TotalByCategory />
  </div>
</template>

<script>
import TvlBlock from "../components/TvlBlock.vue";
import TotalByCategory from "@/components/fees/cauldronsFee/TotalByCategory.vue"

export default {
  components: { TvlBlock, TotalByCategory },
};
</script>
