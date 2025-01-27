export default function buildCalendar (value) {
  const startDay = value.clone().startOf('month').startOf('week')
  const endDay = value.clone().endOf('month').endOf('week')
  const calendar = []
  while (startDay.isBefore(endDay, 'day')) {
    buildDates(calendar, startDay)
  }
  if (calendar.length === 5) {
    buildDates(calendar, startDay)
  }
  return calendar
}

function buildDates (calendar, startDay) {
  calendar.push(
    Array(7)
      .fill(0)
      .map(() => startDay.add(1, 'day').clone())
  )
}
