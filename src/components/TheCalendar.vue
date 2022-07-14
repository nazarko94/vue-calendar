<template>
  <div class="calendar">
    <CalendarMenu
      @select-view="selectView"
      @next-page="nextPage"
      @back-page="backPage"
      @today-page="todayPage"
    />
    <CalendarArea ref="area" :activeView="view" :date="date" />

    <CalendarPopup v-if="isPopupOpen" />
  </div>
</template>

<script>
import CalendarMenu from './menu/CalendarMenu.vue';
import CalendarArea from './area/CalendarArea.vue';
import CalendarPopup from './CalendarPopup';
import viewTypes from './viewTypes';

export default {
  name: 'TheCalendar',
  components: { CalendarMenu, CalendarArea, CalendarPopup },
  computed: {
    isPopupOpen() {
      return this.$store.getters.IS_POPUP_OPEN;
    },
  },

  data() {
    return {
      view: viewTypes.MONTH_VIEW,
      date: new Date(),
    };
  },

  methods: {
    todayPage() {
      this.$store.dispatch('TODAY');
    },

    backPage() {
      this.$refs.area.backPage();
    },

    nextPage() {
      this.$refs.area.nextPage();
    },

    selectView(selectedView) {
      this.view = selectedView;
    },
  },
};
</script>

<style scoped></style>
