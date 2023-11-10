<template>
  <div class="wrapper">
    <Dropdown :options="CHART_MONTH" @update="changeMonth" />

    <h3 class="title">TVL</h3>
    <p class="value">{{ totalTvl }}</p>

    <h3 class="title">TVL changes</h3>
    <p class="value" :style="{ color: differenceTvl > 0 ? 'green' : 'red' }">
      {{ differenceTvl }}
    </p>

    <div class="list" v-if="tvlByChainsArr">
      <div
        class="list-item"
        v-for="info in tvlByChainsArr"
        :key="info.chainId"
        :style="{ color: info?.totalValueLockedUsd > 0 ? 'green' : 'red' }"
      >
        <span> {{ info.chainId }}</span>
        <span>{{ info.totalValueLockedUsd }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineAsyncComponent } from "vue";
import { CHART_MONTH } from "../../constants";
import { getSnapshotsByTimestamp } from "../../helpers/getSnapshotsByTimestamp";
import { getDifferenceByTimestamp } from "../../helpers/getDifferenceByTimestamp";
import { getTimestamp } from "../../helpers/getTimestamp";

export default {
  props: {
    tvlByChains: {},
  },

  data(): any {
    return {
      totalTvlsByTimestamp: {},
      monthsCount: 1,
      CHART_MONTH,
    };
  },

  computed: {
    totalTvl() {
      return this.totalTvlsByTimestamp[getTimestamp()].totalValueLockedUsd;
    },

    selectedTvl() {
      return this.totalTvlsByTimestamp[getTimestamp(this.monthsCount)]
        .totalValueLockedUsd;
    },

    differenceTvl() {
      return this.totalTvl - this.selectedTvl;
    },

    tvlByChainsArr() {
      return getDifferenceByTimestamp(this.tvlByChains, this.monthsCount);
    },
  },

  methods: {
    changeMonth(num: number) {
      this.monthsCount = num;
    },
  },

  created() {
    this.totalTvlsByTimestamp = getSnapshotsByTimestamp(this.tvlByChains, [
      "totalValueLockedUsd",
    ]);
  },

  components: {
    Dropdown: defineAsyncComponent(() => import("../ui/Dropdown.vue")),
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  margin-top: 45px;
  width: 400px;
  border: 1px solid #000;
  padding: 15px;
}

.title,
.value {
  text-align: center;
  margin-bottom: 10px;
}

.list {
  border: 1px solid #000;
  display: flex;
  flex-direction: column;
}

.list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 10px;
  border-bottom: 1px solid #000;
}
</style>
