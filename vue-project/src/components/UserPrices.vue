<script setup>
defineProps({
  data: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <section class="strom-view">
    <div class="container-fluid strom-content">
      <div class="d-flex flex-wrap align-items-end justify-content-between gap-3 mb-3">
        <div>
          <div class="strom-date">{{ data.date }}</div>
          <h1 class="strom-title mb-0">Dine strømpriser</h1>
        </div>
        <div class="area-badge">
          <span>Prisområde</span>
          <strong>DK1 · Vestdanmark</strong>
        </div>
      </div>

      <div class="row g-3">
        <div class="col-12 col-lg-7">
          <section class="price-card h-100" aria-label="Aktuel strømpris">
            <div class="price-card-main">
              <div class="price-heading-row">
                <div class="price-label">PRISEN LIGE NU</div>
                <span
                  class="good-price-badge"
                  :class="{ 'good-price-badge--high': !data.isGoodPrice }"
                >
                  <span
                    class="status-dot"
                    :class="{ 'status-dot--high': !data.isGoodPrice }"
                    aria-hidden="true"
                  ></span>
                  {{ data.isGoodPrice ? 'God pris' : 'Dyr pris' }}
                </span>
              </div>
              <div class="price-value-row">
                <span class="price-value">{{ data.currentPrice }}</span>
                <span class="price-unit">kr./kWh</span>
              </div>
              <p class="price-period mb-0">
                Gælder kl. {{ data.currentPeriod }} · inkl. moms
              </p>
            </div>
            <div class="price-card-footer">
              <template v-if="data.priceDifferencePercent !== null">
                Prisen er
                <strong>
                  {{ data.priceDifferencePercent }} %
                  {{ data.isGoodPrice ? 'lavere' : 'højere' }}
                </strong>
                end dagens gennemsnit.
              </template>
              <span v-else>Prisen er på niveau med dagens gennemsnit.</span>
            </div>
          </section>
        </div>

        <div class="col-12 col-lg-5">
          <section class="recommendation-card h-100" aria-label="Strøm anbefaling">
            <div class="recommendation-heading">
              <span
                class="green-light"
                :class="{ 'green-light--high': !data.isGoodPrice }"
                aria-hidden="true"
              >
                <span></span>
                <span></span>
                <span></span>
              </span>
              <div>
                <div class="recommendation-label">
                  {{ data.isGoodPrice ? 'STRØMLYSET ER GRØNT' : 'STRØMLYSET ER RØDT' }}
                </div>
                <h2 class="recommendation-title">
                  {{ data.isGoodPrice ? 'Godt tidspunkt at bruge strøm' : 'Vent med at bruge strøm' }}
                </h2>
              </div>
            </div>
            <p class="recommendation-description mb-0">
              {{
                data.isGoodPrice
                  ? 'Start opvaskemaskinen eller oplad bilen nu for at udnytte den lave pris.'
                  : 'Vent, hvis du kan, til strømprisen falder igen.'
              }}
            </p>
          </section>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.strom-view {
  color: #173a35;
}

.strom-content {
  max-width: 1120px;
  padding-right: 1.5rem;
  padding-left: 1.5rem;
}

.strom-date,
.price-label,
.recommendation-label {
  color: #08785f;
  font-size: 0.625rem;
  font-weight: 700;
}

.strom-date {
  margin-bottom: 0.2rem;
}

.strom-title {
  color: #173a35;
  font-size: 1.5rem;
  font-weight: 700;
}

.area-badge {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.6rem;
  border: 1px solid #dce5e1;
  border-radius: 0.4rem;
  background: #fff;
  font-size: 0.625rem;
}

.area-badge span {
  color: #81908b;
}

.area-badge strong {
  color: #38524b;
  font-weight: 600;
}

.price-card,
.recommendation-card {
  overflow: hidden;
  border: 1px solid #dce5e1;
  border-radius: 0.65rem;
  background: #fff;
}

.price-card-main {
  padding: 1rem 1.1rem;
}

.price-heading-row,
.price-value-row {
  display: flex;
  align-items: center;
}

.price-heading-row {
  justify-content: space-between;
}

.good-price-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.3rem 0.55rem;
  border-radius: 999px;
  background: #daf2eb;
  color: #08785f;
  font-size: 0.625rem;
  font-weight: 600;
}

.good-price-badge--high {
  background: #f8dddd;
  color: #c83d3d;
}

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #16a77f;
}

.status-dot--high {
  background: #d74b4b;
}

.price-value-row {
  gap: 0.45rem;
  margin: 0.1rem 0 0.3rem;
}

.price-value {
  color: #173a35;
  font-size: 2rem;
  font-weight: 700;
  line-height: 1;
}

.price-unit {
  color: #596e67;
  font-size: 0.75rem;
}

.price-period,
.recommendation-description {
  color: #71817c;
  font-size: 0.7rem;
}

.price-card-footer {
  padding: 0.75rem 1.1rem;
  border-top: 1px solid #e6ece9;
  background: #f9fbfa;
  color: #52665f;
  font-size: 0.7rem;
}

.price-card-footer strong {
  color: #08785f;
}

.recommendation-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem 1.1rem;
}

.recommendation-heading {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 0.75rem;
}

.recommendation-title {
  margin: 0.1rem 0 0;
  color: #173a35;
  font-size: 1rem;
  font-weight: 700;
}

.green-light {
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  gap: 3px;
  padding: 4px;
  border: 1px solid #dce5e1;
  border-radius: 999px;
  background: #f0f4f2;
}

.green-light span {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #dce5e1;
}

.green-light span:last-child {
  background: #17aa80;
  box-shadow: 0 0 0 2px #bce7da;
}

.green-light--high span:last-child {
  background: #d74b4b;
  box-shadow: 0 0 0 2px #f4cccc;
}

@media (max-width: 575.98px) {
  .strom-view {
    padding-top: 1.25rem;
  }

  .strom-content {
    padding-right: 1rem;
    padding-left: 1rem;
  }

  .strom-title {
    font-size: 1.35rem;
  }

  .area-badge {
    margin-left: auto;
  }
}
</style>
