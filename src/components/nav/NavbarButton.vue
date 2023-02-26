<template>
  <button @click="clickHandler">{{ title }}</button>
</template>

<script>
export default {
  name: 'MenuButton',
  props: ['title'],
  methods: {
    clickHandler() {
      this.$emit('click-button', this.title);
    }
  }
};
</script>

<style scoped>
button {
  padding: 5px 20px;
  width: 75px;
  border: 1px solid #eee;
  font-size: 14px;
}

button.checked {
  color: rgb(86, 169, 236);
}
</style>
