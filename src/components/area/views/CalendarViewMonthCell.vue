<template>
  <div
    :class="[{ today: isToday, thisMonth: isThisMonth }, 'cell']"
    @click="onClick"
  >
    <div class="date">{{ date.getDate() }}</div>
    <!-- fix key -->
    <div class="task" v-for="task in tasks" :key="task.date + task.startTime">
      {{ task.startTime }}
    </div>
  </div>
</template>

<script>
import { convertDateToFormFormat } from '../../../utils';
export default {
  name: 'CalendarAreaCell',
  props: {
    date: Date,
    isToday: Boolean,
    isThisMonth: Boolean,
  },

  computed: {
    tasks() {
      let tasks = this.$store.getters.TASKS_BY_DATE(this.date);
      return tasks.sort((a, b) => {
        if (a.startTime < b.startTime) return -1;

        if (a.startTime > b.startTime) return 1;

        return 0;
      });
    },
  },

  methods: {
    onClick() {
      const popupDate = convertDateToFormFormat(this.date);
      this.$store.commit('setPopupDate', popupDate);

      this.$store.dispatch('OPEN_POPUP');
    },
  },
};
</script>

<style scoped>
.cell {
  position: relative;
  width: 142.8px;
  min-height: 142px;
  box-sizing: border-box;
  border: 1px solid #cfd7e3;
  background-color: #eee;
}

.cell.thisMonth {
  background-color: #fff;
}

.cell.today {
  background-color: #cfd7e3;
}

.cell .date {
  padding: 5px 10px 0 0;
  text-align: right;
}

.cell .task {
  margin: 2px auto;
  width: 97%;
  height: 35px;
  background-color: #72a6fa;
  line-height: 200%;
  border-radius: 4px;
  text-indent: 10px;
}
</style>
