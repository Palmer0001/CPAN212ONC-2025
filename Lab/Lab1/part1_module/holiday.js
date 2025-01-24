const _ = require('lodash');

const holidays = [
  { name: 'Christmas', date: '2025-12-25' },
  { name: 'Canada Day', date: '2025-07-01' },
  { name: 'New Year', date: '2026-01-01' }
];
const today = new Date();

holidays.forEach((holiday) => {
  const holidayDate = new Date(holiday.date);
  const timeDiff = holidayDate - today;
  const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  console.log(`${holiday.name} is ${daysDiff} days away.`);
});
const randomHoliday = _.sample(holidays);
console.log(`Random holiday: ${randomHoliday.name} on ${randomHoliday.date}`);
const christmasIndex = _.findIndex(holidays, { name: 'Christmas' });
const canadaDayIndex = _.findIndex(holidays, { name: 'Canada Day' });

console.log(`Christmas index: ${christmasIndex}`);
console.log(`Canada Day index: ${canadaDayIndex}`);