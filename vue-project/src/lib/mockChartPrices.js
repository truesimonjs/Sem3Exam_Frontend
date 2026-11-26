const hourlyPricePattern = [
  1.48, 1.34, 1.18, 1.06, 0.98, 1.04, 1.2, 1.36, 1.42, 1.28, 1.16, 1.02,
  0.82, 0.66, 0.71, 0.96, 1.18, 1.38, 1.58, 1.62, 1.51, 1.37, 1.22, 1.1,
]

export function createMockHourlyPrices(date) {
  const weekdayAdjustment = (date.getDay() - 3) * 0.025
  const dateAdjustment = ((date.getMonth() * 31 + date.getDate()) % 5 - 2) * 0.015
  const adjustment = weekdayAdjustment + dateAdjustment

  return hourlyPricePattern.map((price) => Number((price + adjustment).toFixed(2)))
}
