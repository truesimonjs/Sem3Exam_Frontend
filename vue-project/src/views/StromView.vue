<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import Chart from '../components/Chart.vue'
import Prices from '../components/Prices.vue'
import UserPrices from '../components/UserPrices.vue'
import { fetchTodaysPrices } from '../lib/TodaysPricesFetch'

const dailyPrices = ref(null)
const currentHour = ref(new Date().getHours())
const loadError = ref(null)
let currentHourTimer

const formatPrice = (price) => Number(price).toFixed(2).replace('.', ',')
const formatHour = (hour) => String(hour).padStart(2, '0')

const dashboardData = computed(() => {
  if (!dailyPrices.value) return null

  const prices = dailyPrices.value
  const averagePrice = prices.reduce((total, price) => total + price, 0) / prices.length
  const priceNow = prices[currentHour.value]
  const isGoodPrice = priceNow <= averagePrice

  let cheapestStartHour = 0
  let cheapestWindowAverage = Number.POSITIVE_INFINITY

  for (let hour = 0; hour < prices.length - 1; hour += 1) {
    const windowAverage = (prices[hour] + prices[hour + 1]) / 2
    if (windowAverage < cheapestWindowAverage) {
      cheapestStartHour = hour
      cheapestWindowAverage = windowAverage
    }
  }

  const nextHour = (currentHour.value + 1) % 24
  const cheapestEndHour = (cheapestStartHour + 2) % 24
  const priceDifferencePercent =
    averagePrice === 0
      ? null
      : Math.round((Math.abs(averagePrice - priceNow) / Math.abs(averagePrice)) * 100)

  const now = new Date()
  const weekday = new Intl.DateTimeFormat('da-DK', { weekday: 'long' }).format(now)
  const day = new Intl.DateTimeFormat('da-DK', { day: 'numeric' }).format(now)
  const month = new Intl.DateTimeFormat('da-DK', { month: 'long' }).format(now)

  return {
    userPrices: {
      date: `${weekday} ${day}. ${month}`.toLocaleUpperCase('da-DK'),
      currentPrice: formatPrice(priceNow),
      currentPeriod: `${formatHour(currentHour.value)}:00–${formatHour(nextHour)}:00`,
      priceDifferencePercent,
      isGoodPrice,
    },
    priceSummary: {
      cheapestPeriod: `Kl. ${formatHour(cheapestStartHour)}–${formatHour(cheapestEndHour)}`,
      cheapestPrice: formatPrice(cheapestWindowAverage),
      averagePrice: formatPrice(averagePrice),
    },
  }
})

onMounted(async () => {
  currentHourTimer = setInterval(() => {
    currentHour.value = new Date().getHours()
  }, 60_000)

  try {
    const prices = await fetchTodaysPrices()
    if (
      !Array.isArray(prices) ||
      prices.length !== 24 ||
      prices.some((price) => !Number.isFinite(price))
    ) {
      throw new Error('Daily prices must contain one numeric price for each hour.')
    }

    dailyPrices.value = prices
  } catch (error) {
    console.error('Unable to load daily electricity prices', error)
    loadError.value = 'Strømdata kunne ikke indlæses. Prøv igen senere.'
  }
})

onBeforeUnmount(() => {
  clearInterval(currentHourTimer)
})
</script>

<template>
  <main class="strom-page">
    <div class="strom-page-content">
      <p v-if="loadError" class="load-message" role="alert">{{ loadError }}</p>
      <template v-else-if="dashboardData && dailyPrices">
        <UserPrices :data="dashboardData.userPrices" />
        <Chart :hourly-prices="dailyPrices" />
        <Prices :data="dashboardData.priceSummary" />
      </template>
      <p v-else class="load-message" role="status">Indlæser strømdata...</p>
    </div>
  </main>
</template>

<style scoped>
.strom-page {
  min-height: calc(100vh - 48px);
  padding: 1.5rem 0;
  background: #f4f7f5;
}

.strom-page-content {
  max-width: 1120px;
  margin: 0 auto;
}

.load-message {
  margin: 1.5rem;
  color: #52665f;
  font-size: 0.875rem;
}
</style>
