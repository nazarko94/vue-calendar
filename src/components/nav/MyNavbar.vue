<template>
  <div class="nav">
    <div class="nav-section day-select">
      <NavbarButton
        title="Today"
        class="today"
        @click-button="todayPage"
      />
      <NavbarButton title="Back" @click-button="backPage" />
      <NavbarButton title="Next" @click-button="nextPage" />
    </div>

    <div class="nav-section view-select">
      <NavbarButton
        v-for="title in viewSelectTitles"
        :key="title"
        :title="title"
        @click-button="selectView"
      />
    </div>
  </div>
</template>

<script>
import NavbarButton from './NavbarButton';
import types from '../types';

export default {
  name: 'MyMenu',
  components: { NavbarButton },

  data() {
    return {
      daySelectTitles: ['Back', 'Today', 'Next'],
      viewSelectTitles: ['Day', 'Week', 'Month'],
    };
  },

  methods: {
    todayPage() {
      this.$emit('today-page');
    },

    backPage() {
      this.$emit('back-page');
    },

    nextPage() {
      this.$emit('next-page');
    },

    clickHandler(buttonTitle) {
      console.log(buttonTitle, ' clicked');
    },

    selectView(buttonTitle) {
      let selectedView;
      switch (buttonTitle) {
        case 'Day':
          selectedView = types.dayView;
          break;
        case 'Week':
          selectedView = types.weekView;
          break;
        case 'Month':
          selectedView = types.monthView;
          break;

        default:
          selectedView = types.monthView;
          break;
      }
      this.$emit('select-view', selectedView);
    },
  },
};
</script>

<style>
.nav {
  margin: 15px auto;
  max-width: 1000px;
  display: flex;
  justify-content: space-between;
}

.nav-section {
  min-width: 225px;
  border: 1px solid #eee;
  border-radius: 4px;
}

.nav-section.day-select {
  margin-left: 15px;
}

.nav-section.view-select {
  margin-right: 15px;
}
</style>
