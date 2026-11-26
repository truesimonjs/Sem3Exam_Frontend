<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { VueDatePicker } from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { createChartData, createWeekChartData } from '../lib/chartDataFetch'
import { createMockHourlyPrices } from '../lib/mockChartPrices'

const props = defineProps({
  hourlyPrices: {
    type: Array,
    required: true,
  },
})

const chartElement = ref(null)
const selectedWeek = ref(new Date())
const selectedDay = ref(new Date())
const activeView = ref('day')
let priceChart

const formatPrice = (value) => Number(value).toFixed(2).replace('.', ',')
const formatHour = (hour) => String(hour).padStart(2, '0')

const weekDate = computed(() => {
  const value = Array.isArray(selectedWeek.value)
    ? selectedWeek.value.find((date) => date instanceof Date)
    : selectedWeek.value

  return value instanceof Date ? value : new Date()
})

const isSelectedDayToday = computed(() => {
  const now = new Date()
  return (
    selectedDay.value.getFullYear() === now.getFullYear() &&
    selectedDay.value.getMonth() === now.getMonth() &&
    selectedDay.value.getDate() === now.getDate()
  )
})

const selectedDayPrices = computed(() =>
  isSelectedDayToday.value
    ? props.hourlyPrices
    : createMockHourlyPrices(selectedDay.value),
)

const chartData = computed(() =>
  activeView.value === 'week'
    ? createWeekChartData(weekDate.value)
    : createChartData(selectedDayPrices.value),
)

const formattedDay = computed(() =>
  new Intl.DateTimeFormat('da-DK', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(selectedDay.value),
)

const formattedWeek = computed(() => {
  const start = new Date(weekDate.value)
  const weekday = (start.getDay() + 6) % 7
  start.setDate(start.getDate() - weekday)
  const end = new Date(start)
  end.setDate(start.getDate() + 6)

  const formatRangeDate = (date) =>
    new Intl.DateTimeFormat('da-DK', {
      day: 'numeric',
      month: 'short',
    }).format(date)

  return `${formatRangeDate(start)} – ${formatRangeDate(end)}`
})

const chartTitle = computed(() =>
  activeView.value === 'week' ? 'Prisudvikling for ugen' : 'Prisudvikling for dagen',
)

const chartDescription = computed(() =>
  activeView.value === 'week'
    ? `Demodata · gennemsnitspris pr. dag · ${formattedWeek.value} · kr./kWh`
    : `${isSelectedDayToday.value ? '' : 'Demodata · '}Pris pr. time · ${formattedDay.value} · kr./kWh`,
)

function createChartOptions(data) {
  return {
    chart: {
      type: 'bar',
      height: 260,
      toolbar: { show: false },
      fontFamily: 'inherit',
      foreColor: '#71817c',
    },
    series: [
      {
        name: 'Strømpris',
        data: data.values,
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: activeView.value === 'week' ? '48%' : '65%',
        borderRadius: 3,
      },
    },
    colors: ['#07855f'],
    dataLabels: { enabled: false },
    grid: {
      borderColor: '#e8eeeb',
      strokeDashArray: 0,
      padding: { left: 8, right: 8 },
    },
    xaxis: {
      categories: data.categories,
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        rotate: activeView.value === 'week' ? 0 : -45,
        style: { fontSize: '10px' },
      },
    },
    yaxis: {
      min: 0,
      labels: {
        formatter: formatPrice,
        style: { fontSize: '11px' },
      },
    },
    tooltip: {
      y: {
        formatter: (value) => `${formatPrice(value)} kr./kWh`,
      },
    },
  }
}

function selectWeek(value) {
  const date = Array.isArray(value)
    ? value.find((item) => item instanceof Date)
    : value

  if (date instanceof Date) {
    activeView.value = 'week'
  }
}

function selectDay(value) {
  if (value instanceof Date) {
    activeView.value = 'day'
  }
}

onMounted(async () => {
  const { default: ApexCharts } = await import('apexcharts')
  if (!chartElement.value) return

  priceChart = new ApexCharts(chartElement.value, createChartOptions(chartData.value))
  await priceChart.render()
})

watch(
  chartData,
  (data) => {
    if (!priceChart) return

    priceChart.updateOptions({
      series: [{ name: 'Strømpris', data: data.values }],
      xaxis: {
        categories: data.categories,
        labels: {
          rotate: activeView.value === 'week' ? 0 : -45,
          style: { fontSize: '10px' },
        },
      },
      plotOptions: {
        bar: {
          columnWidth: activeView.value === 'week' ? '48%' : '65%',
        },
      },
    })
  },
  { deep: true },
)

onBeforeUnmount(() => {
  if (priceChart) {
    priceChart.destroy()
  }
})
</script>

<template>
  <section class="price-history-card" aria-labelledby="price-history-title">
    <div class="price-history-heading">
      <div>
        <h2 id="price-history-title">{{ chartTitle }}</h2>
        <p>{{ chartDescription }}</p>
      </div>
    </div>

    <div class="picker-grid">
      <label class="picker-field">
        <span>Vælg uge</span>
        <VueDatePicker
          v-model="selectedWeek"
          week-picker
          auto-apply
          format="dd/MM/yyyy"
          aria-label="Vælg uge til prisoversigt"
          @update:model-value="selectWeek"
        />
      </label>
      <label class="picker-field">
        <span>Vælg dag</span>
        <VueDatePicker
          v-model="selectedDay"
          auto-apply
          format="dd/MM/yyyy"
          aria-label="Vælg dag til prisoversigt"
          @update:model-value="selectDay"
        />
      </label>
    </div>

    <div
      ref="chartElement"
      role="img"
      :aria-label="
        activeView === 'week'
          ? 'Gennemsnitlige strømpriser pr. dag for den valgte uge'
          : 'Strømpriser fordelt på timer for den valgte dag'
      "
    ></div>
  </section>
</template>

<style scoped>
.price-history-card {
  margin: 1rem 1.5rem 0;
  padding: 1rem 1.1rem 0.5rem;
  border: 1px solid #dce5e1;
  border-radius: 0.65rem;
  background: #fff;
}

.price-history-heading {
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #e8eeeb;
}

.price-history-heading h2 {
  margin: 0;
  color: #173a35;
  font-size: 1rem;
  font-weight: 700;
}

.price-history-heading p {
  margin: 0.2rem 0 0;
  color: #81908b;
  font-size: 0.7rem;
}

.picker-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
  padding: 1rem 0 0.5rem;
}

.picker-field {
  display: grid;
  gap: 0.4rem;
  color: #52665f;
  font-size: 0.75rem;
  font-weight: 600;
}

@media (max-width: 575.98px) {
  .price-history-card {
    margin-right: 1rem;
    margin-left: 1rem;
  }

  .picker-grid {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
}
</style>
