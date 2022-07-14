<template>
  <div class="month-view">
    <h2>{{ title }}</h2>
    <div class="days">
      <div class="day">SUN</div>
      <div class="day">MON</div>
      <div class="day">TUE</div>
      <div class="day">WED</div>
      <div class="day">THU</div>
      <div class="day">FRI</div>
      <div class="day">SAT</div>
    </div>
    <CalendarViewMonthCell
      v-for="cell in cells"
      :key="cell.date.getTime()"
      v-bind="cell"
    />
  </div>
</template>

<script>
import { daysInMonth, isTodayEqual } from '../../../utils';
import CalendarViewMonthCell from './CalendarViewMonthCell';

export default {
  name: 'MonthView',
  components: { CalendarViewMonthCell },

  computed: {
    date() {
      return this.$store.getters.DATE;
    },

    title() {
      const options = { year: 'numeric', month: 'long' };
      const title = this.date.toLocaleDateString('en-US', options);
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
    // today() {
    //   this.$store.dispatch('TODAY');
    // },

    backPage() {
      this.$store.dispatch('BACK_MONTH');
    },
    nextPage() {
      this.$store.dispatch('NEXT_MONTH');
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

.month-view {
  margin: 0 auto;
  max-width: 1000px;
  display: flex;
  flex-wrap: wrap;
  border: 1px solid #cfd7e3;
}

.month-view .days {
  width: 100%;
  height: 30px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  color: #37474F;
  background-color: #cfd7e3;
}

.month-view .days .day {
  flex-grow: 1;
  text-align: center;
  line-height: 28px;
  font-size: 18px;
}
</style>
