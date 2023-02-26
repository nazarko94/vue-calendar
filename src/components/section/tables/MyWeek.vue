<template>
  <div class="week-table">
    <h2>{{ title }}</h2>
    <div class="week">
      <TimeLine />

      <div class="times">
        <div class="header"></div>
        <div class="time" v-for="time in 24" :key="time">
          {{ (time - 1) | formatTime }}
        </div>
      </div>

      <DayColumn v-for="day in week"
        :key="day.date.getTime()"
        v-bind="day"
      />
    </div>
  </div>
</template>

<script>
import { getShortName, isTodayEqual } from '../../../utils';
import DayColumn from './DayColumn';
import TimeLine from '../TimeLine';

export default {
  name: 'MyWeek',
  components: { DayColumn, TimeLine },
  filters: {
    formatTime(value) {
      let time = `${value}:00`;
      if (value < 10) {
        time = ['0', ...time].join('');
      }

      return time;
    },
  },

  computed: {
    week() {
      let beforeCurrentDay = this.getDaysBeforeCurrent();
      let afterCurrentDay = this.getDaysAfterCurrent();
      return [...beforeCurrentDay, ...afterCurrentDay];
    },

    title() {
      const options = { month: 'short' };
      const title = this.date.toLocaleDateString('en-US', options);
      const startWeekDate = this.week[0].date.getDate();
      const endWeekDate = this.week[6].date.getDate();
      return `${title} ${startWeekDate} - ${title} ${endWeekDate}`;
    },

    date() {
      return this.$store.getters.DATE;
    },
  },
  methods: {
    nextPage() {
      this.$store.dispatch('nextWeek');
    },

    backPage() {
      this.$store.dispatch('prevWeek');
    },
    getDaysBeforeCurrent() {
      return Array.from({ length: this.date.getDay() }, (_, i) => {
        const day = this.date.getDate() - this.date.getDay() + i;
        const date = new Date(
          this.date.getFullYear(),
          this.date.getMonth(),
          day,
        );
        const isToday = isTodayEqual(date);
        const title = this.getDayTitle(date);

        return {
          date,
          isToday,
          title,
        };
      });
    },
    getDaysAfterCurrent() {
      return Array.from({ length: 7 - this.date.getDay() }, (_, i) => {
        const date = new Date(
          this.date.getFullYear(),
          this.date.getMonth(),
          this.date.getDate() + i,
        );
        const isToday = isTodayEqual(date);
        const title = this.getDayTitle(date);

        return { date, isToday, title };
      });
    },

    getDayTitle(date) {
      let day = getShortName(date);
      let num = date.toLocaleDateString('en', {
        day: '2-digit',
        month: '2-digit',
      });
      num = num
        .split('/')
        .reverse()
        .join('/');
        return `${day} ${num}`;
    },
  },
};
</script>

<style>
.week-table {
  margin: 0 auto;
  max-width: 1000px;
}

h2 {
  text-align: center;
}

.week {
  position: relative;
  display: flex;
}

.week .timeline {
  margin-left: 12.5%;
  width: 87.5%;
}

.week .header {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 35px;
  background-color: #cfd7e3;
  color: #000;
}

.week .times {
  flex-basis: 200px;
}

.week .times .time {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 45px;
  border: 1px solid grey;
}

.week .day {
  flex-basis: 200px;
}
</style>
