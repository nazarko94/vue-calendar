<template>
  <div class="timeline" :style="{ top: countTimeline + 'px' }">
    <div class="point"></div>
  </div>
</template> 

<script>
export default {
  name: 'MyTimeline',
  computed: {
    countTimeline() {
      const now = new Date();
      const minutes = now.getMinutes();
      const hours = now.getHours();
      const cellHeight = 47;
      const cellOffset = 35;
      return cellOffset + cellHeight * (hours + minutes / 60) - 1;
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

.timeline .point {
  margin: -4px 0 0 -5px;
  width: 10px;
  height: 10px;
  background-color: #00f;
  border-radius: 50%;
}
</style>
