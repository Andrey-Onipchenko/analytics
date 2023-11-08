<template>
  <div class="home">
    <h1>Analytics</h1>
    <TvlBlock />
    <MimHealthBlock />
    <CauldronsInfoBlock />
  </div>
</template>

<script>
import TvlBlock from "../components/TvlBlock.vue";
import MimHealthBlock from "../components/MimHealthBlock.vue";
import CauldronsInfoBlock from "../components/CauldronsInfoBlock.vue";

export default {
  components: { TvlBlock, MimHealthBlock, CauldronsInfoBlock },
};
</script>
