<template>
  <div
    :class="[{ today: isToday, thisMonth: isThisMonth }, 'cell']"
    @click="onClick"
  >
    <div class="date">{{ date.getDate() }}</div>
    <div class="task" v-for="task in tasks" :key="task.date + task.startTime">
      {{ task.startTime }}
    </div>
  </div>
</template>

<script>
import { convertDateToFormFormat } from '../../../utils';
export default {
  name: 'MonthCell',
  props: {
    date: Date,
    isToday: Boolean,
    isThisMonth: Boolean,
  },

  computed: {
    tasks() {
      let tasks = this.$store.getters.DateTasks(this.date);
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

      this.$store.dispatch('openPopup');
    },
  },
};
</script>

<style scoped>
.cell {
  position: relative;
  width: 14.28%;
  min-height: 142px;
  box-sizing: border-box;
  border: 1px solid #cfd7e3;
  background-color: #eee;
  color: rgb(0, 0, 0, 0.1);
}

.cell.thisMonth {
  background-color: #fff;
  color: #000;
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
