import { createMockHourlyPrices } from './mockChartPrices.js'

export function createChartData(hourlyPrices) {
  return {
    categories: hourlyPrices.map((_, hour) => `${String(hour).padStart(2, '0')}:00`),
    values: [...hourlyPrices],
  }
}

export function createWeekChartData(date) {
  const firstDay = new Date(date)
  const daysSinceMonday = (firstDay.getDay() + 6) % 7
  firstDay.setDate(firstDay.getDate() - daysSinceMonday)

  const categories = []
  const values = []

  for (let day = 0; day < 7; day += 1) {
    const currentDay = new Date(firstDay)
    currentDay.setDate(firstDay.getDate() + day)
    const dailyPrices = createMockHourlyPrices(currentDay)
    const averagePrice =
      dailyPrices.reduce((total, price) => total + price, 0) / dailyPrices.length
    const weekday = new Intl.DateTimeFormat('da-DK', { weekday: 'short' }).format(currentDay)

    categories.push(`${weekday} ${currentDay.getDate()}.`)
    values.push(averagePrice)
  }

  return { categories, values }
}
