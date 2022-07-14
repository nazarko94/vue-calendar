export default {
  SET_DATE(context, payload) {
    context.commit('SET_DATE', payload);
  },

  NEXT_DAY(context) {
    const current = context.state.date;
    const nextDay = new Date(
      current.getFullYear(),
      current.getMonth(),
      current.getDate() + 1,
    );
    context.commit('SET_DATE', nextDay);
  },

  BACK_DAY(context) {
    const current = context.state.date;
    const backDay = new Date(
      current.getFullYear(),
      current.getMonth(),
      current.getDate() - 1,
    );
    context.commit('SET_DATE', backDay);
  },

  TODAY(context) {
    context.commit('SET_DATE', new Date());
  },

  NEXT_MONTH(context) {
    const current = context.state.date;
    const nextMonth = new Date(current.getFullYear(), current.getMonth() + 1);
    context.commit('SET_DATE', nextMonth);
  },

  BACK_MONTH(context) {
    const current = context.state.date;
    const backMonth = new Date(current.getFullYear(), current.getMonth() - 1);
    context.commit('SET_DATE', backMonth);
  },

  NEXT_WEEK(context) {
    const current = context.state.date;
    const daysToNextWeek = 7 - current.getDay();
    const nextWeek = new Date(
      current.getFullYear(),
      current.getMonth(),
      current.getDate() + daysToNextWeek,
    );
    context.commit('SET_DATE', nextWeek);
  },

  BACK_WEEK(context) {
    const current = context.state.date;
    const daysToBackWeek = current.getDay() + 1;
    const backWeek = new Date(
      current.getFullYear(),
      current.getMonth(),
      current.getDate() - daysToBackWeek,
    );
    context.commit('SET_DATE', backWeek);
  },

  CLOSE_POPUP(context) {
    context.commit('SET_POPUP_DISPLAY', false);
  },

  OPEN_POPUP(context) {
    context.commit('SET_POPUP_DISPLAY', true);
  },

  ADD_TASK(context) {
    const { date, startTime, endTime } = context.state.popup;
    context.commit('ADD_TASK', {
      date,
      startTime,
      endTime,
    });
  },
};
