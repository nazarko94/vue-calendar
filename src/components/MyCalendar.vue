<template>
  <div class="calendar">
    <MyNavbar
      @select-view="selectView"
      @next-page="nextPage"
      @back-page="backPage"
      @today-page="todayPage"
    />
    <Section ref="area" :activeView="view" :date="date" />

    <Popup v-if="isPopupOpen" />
  </div>
</template>

<script>
import MyNavbar from './nav/MyNavbar.vue';
import Section from './section/Section.vue';
import Popup from './Popup';
import types from './types';

export default {
  name: 'MyCalendar',
  components: { MyNavbar, Section, Popup },
  computed: {
    isPopupOpen() {
      return this.$store.getters.isPopupOpen;
    },
  },

  data() {
    return {
      view: types.monthView,
      date: new Date(),
    };
  },

  methods: {
    backPage() {
      this.$refs.area.backPage();
    },

    todayPage() {
      this.$store.dispatch('today');
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
