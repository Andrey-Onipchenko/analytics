<template>
  <div class="wrapper">
    <h1>Cauldrons</h1>
    <div class="btns">
      <button @click="toggleChain(1)">Ethereum</button>
      <button @click="toggleChain(10)">Optimism</button>
      <button @click="toggleChain(250)">Fantom</button>
      <button @click="toggleChain(42161)">Arbitrum</button>
      <button @click="toggleChain(43114)">Avalanche</button>
    </div>
    <div class="table-header">
      <div>Cauldron</div>
      <div>Network</div>
      <div>Total MIM borrowed</div>
      <div>Total Collateral deposited</div>
    </div>
    <div class="table" v-if="cauldronsByChains">
      <div class="row" v-for="item in filteredData" :key="item.id">
        <div class="item">
          <div>
            {{ item.name }}
          </div>
          <div>{{ item.id.slice(0, 6) }}...{{ item.id.slice(-6) }}</div>
        </div>
        <div class="item">{{ item.chainId }}</div>
        <div class="item">{{ item.totalMimBorrowed }}</div>
        <div class="item">${{ item.totalValueLockedUsd }}</div>
      </div>
    </div>
    <div class="table" v-else>LOADING</div>
  </div>
</template>

<script lang="ts">
import { getCauldronsInfo } from "../helpers/getCauldronsInfo";

export default {
  data(): any {
    return {
      cauldronsByChains: null,
      selectedChains: [10],
    };
  },

  computed: {
    filteredData() {
      return this.cauldronsByChains
        .map((item: any) => {
          if (this.selectedChains.includes(item.chainId)) return item.cauldrons;
          else return [];
        })
        .flat();
    },
  },

  methods: {
    toggleChain(item: number) {
      const index = this.selectedChains.indexOf(item);
      if (index === -1) this.selectedChains.push(item);
      else this.selectedChains.splice(index, 1);
    },
  },

  async mounted() {
    const queryArr = ["name", "id", "totalMimBorrowed", "totalValueLockedUsd"];
    this.cauldronsByChains = await getCauldronsInfo(queryArr);
  },
};
</script>

<style lang="scss" scoped>
.btns {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.btn {
  border: 1px solid #000;
  padding: 10px 15px;
  border-radius: 20px;
}

.table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #000;
  padding: 15px;
  border-radius: 20px 20px 0 0;
}

.table {
  height: 500px;
  overflow: hidden;
  padding: 15px;
  border: 1px solid #000;
  border-radius: 0 0 20px 20px;
  overflow-y: scroll;
}

.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;
  border-bottom: 1px solid #000;
}

.item {
  max-width: 350px;
  width: 100%;
}
</style>
