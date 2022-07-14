<template>
  <div class="day-view">
    <h2>{{ pageTitle }}</h2>
    <div class="day">
      <div class="content">
        <CalendarTimeline />

        <div class="times">
          <div class="header"></div>

          <div class="time" v-for="time in 24" :key="time">
            {{ (time - 1) | formatTime }}
          </div>
        </div>

        <CalendarViewDayColumn
          :date="date"
          :isToday="false"
          :title="dayTitle"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { formatTimeFilter, getDayFullName, getDayTitle } from '../../../utils';
import CalendarViewDayColumn from './CalendarViewDayColumn';
import CalendarTimeline from '../CalendarTimeline';

export default {
  name: 'DayView',
  props: {},
  components: { CalendarViewDayColumn, CalendarTimeline },
  filters: {
    formatTime(value) {
      return formatTimeFilter(value);
    },
  },

  computed: {
    pageTitle() {
      let title = getDayFullName(this.date);
      title += ' ';
      title += this.date.toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
      });
      return title;
    },

    dayTitle() {
      return getDayTitle(this.date);
    },

    date() {
      return this.$store.getters.DATE;
    },
  },
  methods: {
    nextPage() {
      this.$store.dispatch('NEXT_DAY');
    },

    backPage() {
      this.$store.dispatch('BACK_DAY');
    },
  },
};
</script>

<style>
h2 {
  width: 100%;
  text-align: center;
}

.day-view {
  margin: 0 auto;
  max-width: 1000px;
}

.day-view .content {
  position: relative;
  display: flex;
}

.day-view .day .header {
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: grey;
}

.day-view .content .timeline {
  margin-left: 100px;
  width: calc(100% - 100px);
}

.day-view .times .time {
  height: 45px;
  border: 1px solid grey;
  text-align: center;
}

.day-view .times .time {
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.day-view .header .title {
  margin-left: -102px;
}

.day-view .day {
  flex-basis: 900px;
}
</style>
