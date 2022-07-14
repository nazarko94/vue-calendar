import { convertDateToFormFormat } from '../utils';

export default {
  DATE: (state) => {
    return state.date;
  },

  IS_POPUP_OPEN: (state) => {
    return state.popup.isOpen;
  },

  TASKS_BY_DATE: (state) => (date) => {
    const dateInFormFormat = convertDateToFormFormat(date);
    return state.tasks.filter((task) => task.date === dateInFormFormat);
  },
};
