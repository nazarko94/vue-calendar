export default {
  SET_DATE: (state, date) => {
    state.date = date;
  },

  SET_POPUP_DISPLAY: (state, isOpen) => {
    state.popup.isOpen = isOpen;
  },

  ADD_TASK: (state, task) => {
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
