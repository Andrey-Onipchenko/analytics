<template>
  <div class="home">
    <h1>Analytics</h1>
    <TvlBlock />
    <MimHealthBlock />
  </div>
</template>

<script>
import TvlBlock from "../components/TvlBlock.vue";
import MimHealthBlock from "../components/MimHealthBlock.vue";

export default {
  components: { TvlBlock, MimHealthBlock },
};
</script>
