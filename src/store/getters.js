import { convertDateToFormFormat } from '../utils';

export default {
  DATE: (state) => {
    return state.date;
  },

  isPopupOpen: (state) => {
    return state.popup.isOpen;
  },

  DateTasks: (state) => (date) => {
    const dateInFormFormat = convertDateToFormFormat(date);
    return state.tasks.filter((task) => task.date === dateInFormFormat);
  },
};
