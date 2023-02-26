export default {
  setDate: (state, date) => {
    state.date = date;
  },

  screenSetPopup: (state, isOpen) => {
    state.popup.isOpen = isOpen;
  },

  createTask: (state, task) => {
    state.tasks.push(task);
  },

  setPopupStartTime: (state, startTime) => {
    state.popup.startTime = startTime;
  },

  setPopupEndTime: (state, endTime) => {
    state.popup.endTime = endTime;
  },

  setPopupDate: (state, date) => {
    state.popup.date = date;
  },
};
