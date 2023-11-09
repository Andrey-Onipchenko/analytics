<template>
  <div class="wrapper">
    <h3>Total</h3>
    <p>{{ totalTvl }}</p>

    <button @click="changeMonth(1)">1M</button>
    <button @click="changeMonth(3)">3M</button>
    <button @click="changeMonth(6)">6M</button>

    <h3>Difference</h3>
    <p>{{ differenceTvl }}</p>

    <div
      v-for="info in tvlByChainsArr"
      :key="info.chainId"
      :style="{ color: info?.totalValueLockedUsd > 0 ? 'green' : 'red' }"
    >
      {{ info.chainId }} {{ info.totalValueLockedUsd }}
    </div>
  </div>
</template>

<script lang="ts">
import { getTotalDailySnapshotsByTimestamp } from "../helpers/getTotalDailySnapshotsByTimestamp";

export default {
  props: {
    tvlByChains: {},
  },

  data(): any {
    return {
      totalTvlsByTimestamp: {},
      monthsCount: 1,
    };
  },

  computed: {
    totalTvl() {
      return this.totalTvlsByTimestamp[this.getTimestamp()];
    },

    selectedTvl() {
      return this.totalTvlsByTimestamp[this.getTimestamp(this.monthsCount)];
    },

    differenceTvl() {
      return this.totalTvl - this.selectedTvl;
    },

    tvlByChainsArr() {
      const total: any = [];
      const result: any = [];

      this.tvlByChains.map(({ snapshots, chainId }: any) => {
        snapshots.map(({ totalValueLockedUsd, timestamp }: any) => {
          if (+timestamp === this.getTimestamp()) {
            total.push({
              chainId,
              totalValueLockedUsd,
            });
          }

          if (+timestamp === this.getTimestamp(this.monthsCount)) {
            result.push({
              chainId,
              totalValueLockedUsd,
            });
          }
        });
      });

      const defaultChains = [1, 10, 250, 42161, 43114];
      const chains = result.map((item: any) => item.chainId);

      defaultChains.map((chainId: any) => {
        if (!chains.includes(chainId)) {
          result.push({ chainId, totalValueLockedUsd: 0 });
          total.push({ chainId, totalValueLockedUsd: 0 });
        }
      });

      return total.map((item: any, index: number) => {
        return {
          chainId: item.chainId,
          totalValueLockedUsd:
            item.totalValueLockedUsd - result[index].totalValueLockedUsd,
        };
      });
    },
  },

  methods: {
    getTimestamp(difference = 0) {
      const date = new Date();
      const today = date.getDate();
      const day = today <= 9 ? `0${today}` : today;

      const month = date.getMonth() + 1 - difference;
      const formatMonth = month <= 9 ? `0${month}` : month;
      const year = date.getFullYear();

      return Date.parse(`${year}-${formatMonth}-${day}T00:00:00Z`) / 1000;
    },

    changeMonth(num: number) {
      this.monthsCount = num;
    },
  },

  created() {
    this.totalTvlsByTimestamp = getTotalDailySnapshotsByTimestamp(
      this.tvlByChains,
      "totalValueLockedUsd"
    );
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
</style>
