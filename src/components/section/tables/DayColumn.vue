<template>
  <div :class="[{ today: isToday }, 'day']">
    <div class="header">
      <div class="title">
        {{ title }}
      </div>
    </div>

    <div class="hours">
      <div
        class="task"
        v-for="task in tasks"
        :key="task.id"
        :style="{ top: task.top + 'px', height: task.height + 'px' }"
      >
        {{ task.startTime }}
      </div>

      <div
        class="hour"
        v-for="hour in 24"
        :key="hour"
        :startTime="(hour - 1) | formatTime"
        :endTime="hour | formatTime"
        @click="onClick"
      ></div>
    </div>
  </div>
</template>

<script>
import { convertDateToFormFormat, timeFilter } from '../../../utils';
export default {
  name: 'DayColumn',
  props: {
    date: Date,
    isToday: Boolean,
    title: String,
  },
  filters: {
    formatTime(value) {
      return timeFilter(value);
    },
  },

  computed: {
    tasks() {
      let tasks = this.$store.getters.DateTasks(this.date);

      return tasks.map((task) => {
        task.top = this.calculateTaskOffset(task.startTime);
        task.height = this.calculateTaskHeight(task.startTime, task.endTime);
        task.id = task.top * 1000 + task.height;

        return task;
      });
    },
  },

  methods: {
    calculateTaskOffset(startTime) {
      return this.convertMinutesToPixels('00:00', startTime) + 1;
    },

    calculateTaskHeight(startTime, endTime) {
      const height = this.convertMinutesToPixels(startTime, endTime) - 2;
      if (height < 10) return 10;

      return height;
    },

    convertMinutesToPixels(startTime, endTime) {
      let value;
      let [startHour, startMinute] = this.parseTime(startTime);
      let [endHour, endMinute] = this.parseTime(endTime);

      const cellHeight = 47;

      value = cellHeight * (endHour - startHour);
      value += (cellHeight / 60) * (endMinute - startMinute);

      return value;
    },

    parseTime(time) {
      return time.split(':').map((n) => parseInt(n));
    },

    onClick(e) {
      const popupDate = convertDateToFormFormat(this.date);
      const startTime = e.target.getAttribute('startTime');
      let endTime = e.target.getAttribute('endTime');
      if (startTime === '23:00') endTime = '00:00';

      this.$store.commit('setPopupDate', popupDate);
      this.$store.commit('setPopupStartTime', startTime);
      this.$store.commit('setPopupEndTime', endTime);

      this.$store.dispatch('openPopup');
    },
  },
};
</script>

<style scoped>
.day.today {
  background-color: #fff;
}

.day .hours {
  position: relative;
}

.day .task {
  position: absolute;
  width: 100%;
  border-radius: 5px;
  background-color: #3b86ff;
  z-index: 200;
  text-indent: 10px;
}

.day .hour {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 45px;
  border: 1px solid grey;
}
</style>
