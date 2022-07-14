<template>
  <div class="menu">
    <div class="menu-section day-select">
      <CalendarMenuButton
        title="Today"
        class="today"
        @click-button="todayPage"
      />
      <CalendarMenuButton title="Back" @click-button="backPage" />
      <CalendarMenuButton title="Next" @click-button="nextPage" />
    </div>

    <div class="menu-section view-select">
      <CalendarMenuButton
        v-for="title in viewSelectTitles"
        :key="title"
        :title="title"
        @click-button="selectView"
      />
    </div>
  </div>
</template>

<script>
import CalendarMenuButton from './CalendarMenuButton';
import viewTypes from '../viewTypes';

export default {
  name: 'CalendarMenu',
  components: { CalendarMenuButton },

  data() {
    return {
      daySelectTitles: ['Today', 'Back', 'Next'],
      viewSelectTitles: ['Month', 'Week', 'Day'],
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
          selectedView = viewTypes.DAY_VIEW;
          break;
        case 'Week':
          selectedView = viewTypes.WEEK_VIEW;
          break;
        case 'Month':
          selectedView = viewTypes.MONTH_VIEW;
          break;

        default:
          selectedView = viewTypes.MONTH_VIEW;
          break;
      }
      this.$emit('select-view', selectedView);
    },
  },
};
</script>

<style>
.menu {
  margin: 15px auto;
  max-width: 1000px;
  display: flex;
  justify-content: space-between;
}

.menu-section {
  min-width: 225px;
  border: 1px solid #eee;
  border-radius: 4px;
}

.menu-section.day-select {
  margin-left: 15px;
}

.menu-section.view-select {
  margin-right: 15px;
}
</style>
