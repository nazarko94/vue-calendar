export default {
  setDate(context, payload) {
    context.commit('setDate', payload);
  },

  nextDay(context) {
    const current = context.state.date;
    const nextDay = new Date(
      current.getFullYear(),
      current.getMonth(),
      current.getDate() + 1,
    );
    context.commit('setDate', nextDay);
  },

  prevDay(context) {
    const current = context.state.date;
    const prevDay = new Date(
      current.getFullYear(),
      current.getMonth(),
      current.getDate() - 1,
    );
    context.commit('setDate', prevDay);
  },

  today(context) {
    context.commit('setDate', new Date());
  },

  prevWeek(context) {
    const current = context.state.date;
    const daysToBackWeek = current.getDay() + 1;
    const prevWeek = new Date(
      current.getFullYear(),
      current.getMonth(),
      current.getDate() - daysToBackWeek,
    );
    context.commit('setDate', prevWeek);
  },

  nextWeek(context) {
    const current = context.state.date;
    const daysToNextWeek = 7 - current.getDay();
    const nextWeek = new Date(
      current.getFullYear(),
      current.getMonth(),
      current.getDate() + daysToNextWeek,
    );
    context.commit('setDate', nextWeek);
  },

  prevMonth(context) {
    const current = context.state.date;
    const prevMonth = new Date(current.getFullYear(), current.getMonth() - 1);
    context.commit('setDate', prevMonth);
  },

  nextMonth(context) {
    const current = context.state.date;
    const nextMonth = new Date(current.getFullYear(), current.getMonth() + 1);
    context.commit('setDate', nextMonth);
  },

  openPopup(context) {
    context.commit('screenSetPopup', true);
  },

  closePopup(context) {
    context.commit('screenSetPopup', false);
  },

  createTask(context) {
    const { date, startTime, endTime } = context.state.popup;
    context.commit('createTask', {
      date,
      startTime,
      endTime,
    });
  },
};