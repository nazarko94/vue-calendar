<template>
  <div class="timeline" :style="{ top: timelineOffset + 'px' }">
    <div class="dot"></div>
  </div>
</template> 

<script>
export default {
  name: 'CalendarTimeline',
  computed: {
    timelineOffset() {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const CELL_HEIGHT = 47;
      const BASIC_OFFSET = 35;
      return BASIC_OFFSET + CELL_HEIGHT * (hours + minutes / 60) - 1;
    },
  },
};
</script>


<style>
.timeline {
  position: absolute;
  height: 2px;
  background-color: #22f;
  z-index: 100;
}

.timeline .dot {
  margin: -4px 0 0 -5px;
  width: 10px;
  height: 10px;
  background-color: #00f;
  border-radius: 50%;
}
</style>
