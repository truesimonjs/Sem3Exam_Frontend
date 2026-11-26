<script setup>
import { onMounted, ref } from 'vue'
import { fetchProfileData } from '../lib/profileData'

const profile = ref(null)
const priceThresholds = ref(null)
const loadError = ref(null)
const changesSaved = ref(false)

const formatPrice = (price) => price.toFixed(2).replace('.', ',')

onMounted(async () => {
  try {
    const data = await fetchProfileData()
    profile.value = data.profile
    priceThresholds.value = data.priceThresholds
  } catch (error) {
    console.error('Unable to load profile data', error)
    loadError.value = 'Profiloplysninger kunne ikke indlæses. Prøv igen senere.'
  }
})

function saveChanges() {
  changesSaved.value = true
}

function markUnsaved() {
  changesSaved.value = false
}
</script>

<template>
  <main class="profile-page">
    <p v-if="loadError" class="load-message" role="alert">{{ loadError }}</p>
    <form
      v-else-if="profile && priceThresholds"
      class="profile-card"
      @submit.prevent="saveChanges"
    >
      <section aria-labelledby="personal-info-heading">
        <div class="section-heading">
          <h1 id="personal-info-heading">Personlige oplysninger</h1>
          <p>De oplysninger, der er knyttet til din konto.</p>
        </div>

        <div class="row g-3">
          <div class="col-12 col-md-6">
            <label for="first-name" class="form-label">Fornavn</label>
            <input
              id="first-name"
              v-model="profile.firstName"
              class="form-control"
              name="firstName"
              autocomplete="given-name"
              required
              @input="markUnsaved"
            >
          </div>
          <div class="col-12 col-md-6">
            <label for="last-name" class="form-label">Efternavn</label>
            <input
              id="last-name"
              v-model="profile.lastName"
              class="form-control"
              name="lastName"
              autocomplete="family-name"
              required
              @input="markUnsaved"
            >
          </div>
          <div class="col-12">
            <label for="email" class="form-label">E-mailadresse</label>
            <input
              id="email"
              v-model="profile.email"
              class="form-control"
              name="email"
              type="email"
              autocomplete="email"
              required
              @input="markUnsaved"
            >
          </div>
          <div class="col-12">
            <label for="price-area" class="form-label">Prisområde</label>
            <select
              id="price-area"
              v-model="profile.priceArea"
              class="form-select"
              name="priceArea"
              @change="markUnsaved"
            >
              <option value="DK1">DK1 · Vestdanmark</option>
              <option value="DK2">DK2 · Østdanmark</option>
            </select>
          </div>
        </div>
      </section>

      <section class="threshold-section" aria-labelledby="price-threshold-heading">
        <div class="section-heading">
          <h2 id="price-threshold-heading">Dine prisgrænser</h2>
          <p>Vælg hvornår strømlyset skal skifte farve.</p>
        </div>

        <div class="threshold-control">
          <div class="threshold-label-row">
            <label for="good-price" class="form-label">God pris er under</label>
            <output for="good-price" class="threshold-value threshold-value--good">
              {{ formatPrice(priceThresholds.goodPrice) }} kr./kWh
            </output>
          </div>
          <input
            id="good-price"
            v-model.number="priceThresholds.goodPrice"
            class="form-range price-range"
            name="goodPrice"
            type="range"
            min="0"
            max="1.6"
            step="0.05"
            :aria-valuetext="`${formatPrice(priceThresholds.goodPrice)} kr. per kWh`"
            @input="markUnsaved"
          >
        </div>

        <div class="threshold-control">
          <div class="threshold-label-row">
            <label for="expensive-price" class="form-label">Dyr pris er over</label>
            <output for="expensive-price" class="threshold-value threshold-value--expensive">
              {{ formatPrice(priceThresholds.expensivePrice) }} kr./kWh
            </output>
          </div>
          <input
            id="expensive-price"
            v-model.number="priceThresholds.expensivePrice"
            class="form-range price-range"
            name="expensivePrice"
            type="range"
            min="0"
            max="4.5"
            step="0.05"
            :aria-valuetext="`${formatPrice(priceThresholds.expensivePrice)} kr. per kWh`"
            @input="markUnsaved"
          >
        </div>

        <div class="price-scale" role="img" aria-label="Prisniveau fra god over middel til dyr">
          <span>God</span>
          <span>Middel</span>
          <span>Dyr</span>
        </div>
      </section>

      <div class="form-actions">
        <button class="btn save-button" type="submit">Gem ændringer</button>
        <span v-if="changesSaved" class="save-feedback" role="status">
          Ændringer gemt lokalt.
        </span>
      </div>
    </form>
    <p v-else class="load-message" role="status">Indlæser profiloplysninger...</p>
  </main>
</template>

<style scoped>
.profile-page {
  min-height: calc(100vh - 48px);
  padding: 1.5rem;
  background: #f4f7f5;
}

.profile-card {
  max-width: 760px;
  margin: 0 auto;
  padding: 1.5rem;
  border: 1px solid #dce5e1;
  border-radius: 0.65rem;
  background: #fff;
}

.load-message {
  max-width: 760px;
  margin: 1rem auto;
  color: #52665f;
  font-size: 0.875rem;
}

.section-heading {
  margin-bottom: 1rem;
}

.section-heading h1,
.section-heading h2 {
  margin: 0;
  color: #173a35;
  font-size: 1.125rem;
  font-weight: 700;
}

.section-heading p {
  margin: 0.2rem 0 0;
  color: #81908b;
  font-size: 0.8rem;
}

.form-label {
  margin-bottom: 0.35rem;
  color: #334b44;
  font-size: 0.8rem;
  font-weight: 600;
}

.form-control,
.form-select {
  min-height: 2.5rem;
  border-color: #d5e0dc;
  color: #38524b;
  font-size: 0.8rem;
}

.form-control:focus,
.form-select:focus {
  border-color: #75b9a5;
  box-shadow: 0 0 0 0.2rem rgb(8 120 95 / 15%);
}

.threshold-section {
  margin-top: 1.5rem;
  padding-top: 1.25rem;
  border-top: 1px solid #e3eae7;
}

.threshold-control {
  margin-top: 1rem;
}

.threshold-label-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.threshold-label-row .form-label {
  margin-bottom: 0;
}

.threshold-value {
  font-size: 0.8rem;
  font-weight: 700;
  white-space: nowrap;
}

.threshold-value--good {
  color: #07855f;
}

.threshold-value--expensive {
  color: #d74b4b;
}

.price-range {
  margin: 0.55rem 0 0;
  --bs-form-range-thumb-bg: #f5f7f6;
  --bs-form-range-thumb-border: 1px solid #aebbb6;
  --bs-form-range-thumb-box-shadow: 0 1px 3px rgb(23 58 53 / 15%);
}

.price-scale {
  display: flex;
  overflow: hidden;
  margin-top: 1rem;
  border-radius: 0.35rem;
  font-size: 0.7rem;
  text-align: center;
}

.price-scale span {
  flex: 1;
  padding: 0.45rem 0.25rem;
}

.price-scale span:first-child {
  background: #d8f1e9;
  color: #08785f;
}

.price-scale span:nth-child(2) {
  background: #fff0c8;
  color: #9c7200;
}

.price-scale span:last-child {
  background: #f8dddd;
  color: #c83d3d;
}

.form-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1.25rem;
  padding-top: 1rem;
  border-top: 1px solid #e3eae7;
}

.save-button {
  padding: 0.55rem 1rem;
  background: #08785f;
  color: #fff;
  font-size: 0.8rem;
  font-weight: 600;
}

.save-button:hover,
.save-button:focus-visible {
  background: #06674f;
  color: #fff;
}

.save-feedback {
  color: #08785f;
  font-size: 0.8rem;
}

@media (max-width: 575.98px) {
  .profile-page {
    padding: 1rem;
  }

  .profile-card {
    padding: 1rem;
  }
}
</style>
