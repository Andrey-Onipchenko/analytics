<template>
  <select @change="$emit('update', selectedOption)" v-model="selectedOption">
    <option v-for="{ name, value } in options" :value="value">
      {{ name }}
    </option>
  </select>
</template>

<script>
export default {
  props: {
    options: {},
  },

  data() {
    return {
      selectedOption: this.options[0].value,
    };
  },
};
</script>
