<script setup>
defineProps({
  data: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <section class="summary-cards" aria-label="Dagens oversigt">
    <article class="summary-card">
      <span class="summary-icon summary-icon--green" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none">
          <rect x="4" y="6" width="16" height="14" rx="2" />
          <path d="M8 4v4M16 4v4M4 10h16M8 14h3M8 17h6" />
        </svg>
      </span>
      <span class="summary-copy">
        <span class="summary-label">DAGENS BILLIGSTE</span>
        <strong class="summary-value">{{ data.cheapestPeriod }}</strong>
        <span class="summary-detail">Fra {{ data.cheapestPrice }} kr./kWh</span>
      </span>
    </article>

    <article class="summary-card">
      <span class="summary-icon summary-icon--yellow" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M4 16h4l3-9 4 12 3-8h2" />
        </svg>
      </span>
      <span class="summary-copy">
        <span class="summary-label">DAGENS GENNEMSNIT</span>
        <strong class="summary-value">{{ data.averagePrice }} kr./kWh</strong>
        <span class="summary-detail">Beregnet fra dagens timepriser</span>
      </span>
    </article>

    <article class="summary-card">
      <span class="summary-icon summary-icon--gray" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none">
          <rect x="5" y="5" width="14" height="14" rx="3" />
          <circle cx="12" cy="12" r="3.5" />
        </svg>
      </span>
      <span class="summary-copy">
        <span class="summary-label">RASPBERRY PI</span>
        <strong class="summary-value">Forbundet</strong>
        <span class="summary-detail">Opdateret for 1 min. siden</span>
      </span>
    </article>
  </section>
</template>

<style scoped>
.summary-cards {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.75rem;
  margin: 1rem 1.5rem 0;
}

.summary-card {
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 0.7rem;
  padding: 0.65rem 0.75rem;
  border: 1px solid #dce5e1;
  border-radius: 0.65rem;
  background: #fff;
}

.summary-icon {
  display: flex;
  width: 32px;
  height: 32px;
  flex: 0 0 32px;
  align-items: center;
  justify-content: center;
  border-radius: 0.4rem;
}

.summary-icon svg {
  width: 17px;
  height: 17px;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.7;
}

.summary-icon--green {
  background: #e2f4ee;
  color: #0c8b69;
}

.summary-icon--yellow {
  background: #fff1d2;
  color: #d78a00;
}

.summary-icon--gray {
  background: #e9eeec;
  color: #687872;
}

.summary-copy {
  display: flex;
  min-width: 0;
  flex-direction: column;
}

.summary-label {
  color: #71817c;
  font-size: 0.55rem;
  line-height: 1.25;
}

.summary-value {
  overflow: hidden;
  color: #173a35;
  font-size: 0.8rem;
  line-height: 1.4;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.summary-detail {
  color: #07855f;
  font-size: 0.6rem;
  line-height: 1.3;
}

@media (max-width: 767.98px) {
  .summary-cards {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 575.98px) {
  .summary-cards {
    margin-right: 1rem;
    margin-left: 1rem;
  }
}
</style>
