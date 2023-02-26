<template>
  <div class="popup-wrapper">
    <div class="popup-section"></div>
    <div class="popup">
      <form v-on:submit.prevent="onSubmit">
        <header class="header">
          <div class="title">Create event</div>
          <div class="close-button" @click="close()">X</div>
        </header>
        <main class="main">
          <div class="date-desc">
            <label for="date">Date</label>
            <input type="date" name="date" id="date" v-model="date" required />
          </div>
          <div class="time-desc">
            <h3 class="title">Times</h3>
            <div class="start-time">
              <label for="startTime">Start Time</label>
              <input type="time" id="startTime" v-model="timeStart" required />
            </div>
            <div class="end-time">
              <label for="endTime">End Time</label>
              <input type="time" id="endTime" v-model="timeEnd" required />
            </div>
          </div>
        </main>
        <footer class="footer">
          <button class="submit-button" type="submit">Create</button>
        </footer>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyPopup',
  computed: {
    timeStart: {
      get() {
        return this.$store.state.popup.startTime;
      },
      set(value) {
        this.$store.commit('setPopupStartTime', value);
      },
    },

    timeEnd: {
      get() {
        return this.$store.state.popup.endTime;
      },
      set(value) {
        this.$store.commit('setPopupEndTime', value);
      },
    },

    date: {
      get() {
        return this.$store.state.popup.date;
      },
      set(value) {
        this.$store.commit('setPopupDate', value);
      },
    },
  },
  data() {
    return {};
  },

  methods: {
    createTask() {
      this.$store.dispatch('createTask');
      this.clearAreas();
    },

    clearAreas() {
      this.timeStart = '';
      this.timeEnd = '';
      this.date = '';
    },

    close() {
      this.$store.dispatch('closePopup');
    },

    onSubmit() {
      this.createTask();
      this.close();
    },
  },
};
</script>

<style scoped>
.popup-wrapper {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 999;
  box-sizing: border-box;
}

.popup-section {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
}

.popup {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 90%;
  max-width: 500px;
  background: rgb(206, 206, 206);
  font-family: Arial, Helvetica, sans-serif;
  border: 1px solid rgb(170, 170, 170);
  transform: translate(-50%, -50%);
}

.popup .header {
  padding: 0 20px;
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 24px;
  border-bottom: 1px solid #aaaaaa;
}

.popup .header .close-button {
  color: rgb(119, 119, 119);
  cursor: pointer;
}

.popup .main {
  margin: 30px 25px;
}

.popup .main label {
  display: block;
  font-size: 18px;
}

.popup .main input {
  margin: 7px 0;
  padding: 10px;
  width: 100%;
  font-size: 16px;
  border: 2px solid rgb(170, 170, 170);
  border-radius: 5px;
  box-sizing: border-box;
}

.popup .main .time-desc h3 {
  font-weight: normal;
}

.popup .main .time-desc .start-time,
.popup .main .time-desc .end-time {
  width: 45%;
  min-width: 125px;
  display: inline-block;
}

.popup .main .time-desc .start-time {
  margin-right: 10%;
}

.popup .footer {
  height: 65px;
  border-top: 1px solid rgb(170, 170, 170);
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.popup .footer .submit-button {
  margin-right: 25px;
  padding: 7px 15px;
  background-color: rgb(0, 119, 255);
  font-size: 16px;
  color: rgb(255, 255, 255);
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
