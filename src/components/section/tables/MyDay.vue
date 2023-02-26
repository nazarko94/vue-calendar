<template>
  <div class="day-table">
    <h2>{{ pageTitle }}</h2>
    <div class="day">
      <div class="content">
        <TimeLine />
        <div class="times">
          <div class="header"></div>
          <div class="time" v-for="time in 24" :key="time">
            {{ (time - 1) | formatTime }}
          </div>
        </div>
        <DayColumn
          :date="date"
          :isToday="false"
          :title="dayTitle"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { timeFilter, getFullName, getTitle } from '../../../utils';
import DayColumn from './DayColumn';
import TimeLine from '../TimeLine';
export default {
  name: 'MyDay',
  props: {},
  components: { DayColumn, TimeLine },
  filters: {
    formatTime(value) {
      return timeFilter(value);
    },
  },
  computed: {
    pageTitle() {
      let title = getFullName(this.date);
      title += ' ';
      title += this.date.toLocaleDateString('en', {
        month: 'short',
        day: '2-digit',
      });
      return title;
    },
    dayTitle() {
      return getTitle(this.date);
    },
    date() {
      return this.$store.getters.DATE;
    },
  },
  methods: {
    nextPage() {
      this.$store.dispatch('nextDay');
    },
    prevPage() {
      this.$store.dispatch('prevDay');
    },
  },
};
</script>

<style> 
h2 {
  width: 100%;
  text-align: center;
}

.day-table {
  margin: 0 auto;
  width: 1000px;
}

.day-table .content {
  position: relative;
  display: flex;
}

.day-table .day .header {
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #cfd7e3;
}

.day-table .content .timeline {
  margin-left: 100px;
  width: calc(100% - 100px);
}

.day-table .times .time {
  height: 45px;
  border: 1px solid grey;
  text-align: center;
}

.day-table .times .time {
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.day-table .header .title {
  margin-left: -102px;
}

.day-table .day {
  flex-basis: 900px;
}
</style>
