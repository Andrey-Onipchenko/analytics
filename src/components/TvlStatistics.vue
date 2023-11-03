<template>
  <div>
    <h3>Total111</h3>
    <p>{{ totalTvl }}</p>

    <button @click="changeMonth(1)">1M</button>
    <button @click="changeMonth(3)">3M</button>
    <button @click="changeMonth(6)">6M</button>

    <h3>Difference</h3>
    <p>{{ differenceTvl }}</p>

    <div v-for="info in tvlByChains" :key="info.chainId">
      {{ info.chainId }} {{ info.totalValueLockedUsd }}
    </div>
  </div>
</template>

<script lang="ts">
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

    tvlByChains() {
      const result: any = [];

      this.tvlByChains.map(({ snapshots, chainId }: any) => {
        snapshots.map(({ totalValueLockedUsd, timestamp }: any) => {
          if (+timestamp === this.getTimestamp())
            result.push({
              chainId,
              totalValueLockedUsd,
            });
        });
      });

      const defaultChains = [1, 10, 250, 42161, 43114];
      const chains = result.map((item: any) => item.chainId);
      defaultChains.map((chainId: any) => {
        if (!chains.includes(chainId))
          result.push({ chainId, totalValueLockedUsd: 0 });
      });

      return result;
    },
  },

  methods: {
    getTotalTvlsByTimestamp() {
      this.tvlByChains.map(({ snapshots }: any) => {
        snapshots.map(({ totalValueLockedUsd, timestamp }: any) => {
          if (!this.totalTvlsByTimestamp[timestamp]) {
            this.totalTvlsByTimestamp[timestamp] = +totalValueLockedUsd;
          } else {
            this.totalTvlsByTimestamp[timestamp] += +totalValueLockedUsd;
          }
        });
      });
    },

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
    this.getTotalTvlsByTimestamp();
  },
};
</script>
