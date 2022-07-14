function daysInMonth(date = new Date()) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const days = 33 - new Date(year, month, 33).getDate();
  return days;
}

function getDayFullName(date = new Date()) {
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  var dayName = days[date.getDay()];
  return dayName;
}

function getDayShortName(date = new Date()) {
  return getDayFullName(date)
    .slice(0, 3)
    .toUpperCase();
}

function getDayTitle(date) {
  let day = getDayShortName(date);
  let num = date.toLocaleDateString('en-US', {
    day: '2-digit',
    month: '2-digit',
  });
  num = num
    .split('/')
    .reverse()
    .join('/');
  return `${day} ${num}`;
}

function isLeapYear(year) {
  return new Date(year, 1, 29).getMonth() === 1;
}

function isTodayEqual(date) {
  const now = new Date();
  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  );
}

function formatTimeFilter(value) {
  let time = `${value}:00`;
  if (value < 10) {
    time = ['0', ...time].join('');
  }

  return time;
}

function convertDateToFormFormat(date) {
  const dateFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };
  const [month, day, year] = date
    .toLocaleDateString('en-US', dateFormatOptions)
    .split('/');

  return [year, month, day].join('-');
}

export {
  daysInMonth,
  getDayFullName,
  getDayShortName,
  getDayTitle,
  isLeapYear,
  isTodayEqual,
  formatTimeFilter,
  convertDateToFormFormat,
};
