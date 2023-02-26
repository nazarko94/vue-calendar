<template>
  <div class="month-table">
    <h2>{{ title }}</h2>
    <div class="days">
      <div class="day">Sunday</div>
      <div class="day">Monday</div>
      <div class="day">Tuesday</div>
      <div class="day">Wednesday</div>
      <div class="day">Thursday</div>
      <div class="day">Friday</div>
      <div class="day">Saturday</div>
    </div>
    <MonthCell
      v-for="cell in cells"
      :key="cell.date.getTime()"
      v-bind="cell"
    />
  </div>
</template>

<script>
import { daysInMonth, isTodayEqual } from '../../../utils';
import MonthCell from './MonthCell';

export default {
  name: 'MyMonth',
  components: { MonthCell },

  computed: {
    date() {
      return this.$store.getters.DATE;
    },

    title() {
      const options = { year: 'numeric', month: 'long' };
      const title = this.date.toLocaleDateString('en', options);
      return title;
    },

    cells() {
      return [
        ...this.getCellsPreviousMonth(),
        ...this.getCellsThisMonth(),
        ...this.getCellsNextMonth()
      ];
    }
  },

  methods: {
    backPage() {
      this.$store.dispatch('prevMonth');
    },
    nextPage() {
      this.$store.dispatch('nextMonth');
    },

    getCellsPreviousMonth() {
      const firstDayWeekOrder = new Date(
        this.date.getFullYear(),
        this.date.getMonth(),
        1
      ).getDay();

      const daysInPreviousMonth = daysInMonth(
        new Date(this.date.getFullYear(), this.date.getMonth() - 1)
      );

      return Array.from({ length: firstDayWeekOrder }, (_, index) => {
        const number = daysInPreviousMonth - firstDayWeekOrder + index + 1;
        const date = new Date(
          this.date.getFullYear(),
          this.date.getMonth() - 1,
          number
        );
        const isToday = isTodayEqual(date);
        return {
          date,
          isThisMonth: false,
          isToday
        };
      });
    },

    getCellsThisMonth() {
      const daysInThisMonth = daysInMonth(this.date);

      return Array.from({ length: daysInThisMonth }, (_, index) => {
        const date = new Date(
          this.date.getFullYear(),
          this.date.getMonth(),
          index + 1
        );
        const isToday = isTodayEqual(date);

        return {
          date,
          isToday,
          isThisMonth: true
        };
      });
    },

    getCellsNextMonth() {
      const daysInThisMonth = daysInMonth(this.date);
      const lastDayThisMonthWeekOrder = new Date(
        this.date.getFullYear(),
        this.date.getMonth(),
        daysInThisMonth
      ).getDay();

      return Array.from(
        { length: 6 - lastDayThisMonthWeekOrder },
        (_, index) => {
          const date = new Date(
            this.date.getFullYear(),
            this.date.getMonth() + 1,
            index + 1
          );
          const isToday = isTodayEqual(date);
          return {
            date,
            isToday,
            isThisMonth: false
          };
        }
      );
    }
  }
};
</script>

<style scoped>
h2 {
  width: 100%;
  text-align: center;
}

.month-table {
  margin: 0 auto;
  max-width: 90%;
  display: flex;
  flex-wrap: wrap;
  border: 1px solid #cfd7e3;
}

.month-table .days {
  width: 100%;
  height: 50px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  color: #37474F;
  background-color: #cfd7e3;
}

.month-table .days .day {
  flex-grow: 1;
  text-align: center;
  line-height: 28px;
  font-size: 18px;
}
</style>
