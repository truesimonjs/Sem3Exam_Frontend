<script setup>
import { reactive, ref } from 'vue'
import IntroMessage from '../components/IntroMessage.vue'

const registration = reactive({
  firstName: '',
  lastName: '',
  email: '',
  priceArea: 'DK1',
  password: '',
  acceptedTerms: false,
})

const registrationMessage = ref('')

function submitRegistration() {
  registrationMessage.value = 'Oprettelse af konto er ikke tilgængelig endnu.'
}
</script>

<template>
  <main class="register-view">
    <IntroMessage />

    <section class="register-side" aria-labelledby="register-heading">
      <div class="register-content">
        <form class="register-card" @submit.prevent="submitRegistration">
          <h1 id="register-heading">Opret din konto</h1>
          <p class="register-subtitle">Kom i gang på få minutter. Vi husker dine valg for dig.</p>

          <div class="row g-2 register-name-row">
            <div class="col-6">
              <label for="register-first-name" class="form-label">Fornavn</label>
              <input
                id="register-first-name"
                v-model="registration.firstName"
                class="form-control"
                name="firstName"
                placeholder="Sofie"
                autocomplete="given-name"
                required
              >
            </div>
            <div class="col-6">
              <label for="register-last-name" class="form-label">Efternavn</label>
              <input
                id="register-last-name"
                v-model="registration.lastName"
                class="form-control"
                name="lastName"
                placeholder="Jensen"
                autocomplete="family-name"
                required
              >
            </div>
          </div>

          <div class="register-field">
            <label for="register-email" class="form-label">E-mailadresse</label>
            <input
              id="register-email"
              v-model="registration.email"
              class="form-control"
              type="email"
              name="email"
              placeholder="navn@eksempel.dk"
              autocomplete="email"
              required
            >
          </div>

          <fieldset class="register-field">
            <legend class="form-label">Dit prisområde</legend>
            <div class="area-choices">
              <label
                class="area-choice"
                :class="{ 'area-choice--selected': registration.priceArea === 'DK1' }"
              >
                <input
                  v-model="registration.priceArea"
                  class="area-radio"
                  type="radio"
                  name="priceArea"
                  value="DK1"
                >
                <span>
                  <strong>DK1</strong>
                  <small>Vestdanmark</small>
                </span>
              </label>
              <label
                class="area-choice"
                :class="{ 'area-choice--selected': registration.priceArea === 'DK2' }"
              >
                <input
                  v-model="registration.priceArea"
                  class="area-radio"
                  type="radio"
                  name="priceArea"
                  value="DK2"
                >
                <span>
                  <strong>DK2</strong>
                  <small>Østdanmark</small>
                </span>
              </label>
            </div>
          </fieldset>

          <div class="register-field">
            <label for="register-password" class="form-label">Adgangskode</label>
            <input
              id="register-password"
              v-model="registration.password"
              class="form-control"
              type="password"
              name="password"
              placeholder="Mindst 8 tegn"
              autocomplete="new-password"
              minlength="8"
              required
            >
          </div>

          <label class="terms-choice">
            <input
              v-model="registration.acceptedTerms"
              class="form-check-input"
              type="checkbox"
              name="acceptedTerms"
              required
            >
            <span>Jeg accepterer vilkår og privatlivspolitik for Strøm-Alert.</span>
          </label>

          <button class="btn register-submit" type="submit">Opret konto</button>
          <p v-if="registrationMessage" class="register-message" role="status">
            {{ registrationMessage }}
          </p>

          <p class="login-prompt">
            Har du allerede en konto?
            <RouterLink to="/login">Log ind</RouterLink>
          </p>
        </form>

        <p class="register-provider">Priser leveres af Energi Data Service</p>
      </div>
    </section>
  </main>
</template>

<style scoped>
.register-view {
  position: fixed;
  z-index: 1100;
  inset: 0;
  display: grid;
  min-height: 100vh;
  overflow-y: auto;
  grid-template-columns: 42.3% 57.7%;
  color: #173a35;
}

.register-side {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background: #f4f7f5;
}

.register-content {
  width: 100%;
  max-width: 360px;
}

.register-card {
  padding: 1.25rem;
  border: 1px solid #e0e7e4;
  border-radius: 0.65rem;
  background: #fff;
  box-shadow: 0 2px 6px rgb(23 58 53 / 4%);
}

.register-card h1 {
  margin-bottom: 0.15rem;
  color: #173a35;
  font-size: 1.25rem;
  font-weight: 700;
}

.register-subtitle {
  margin-bottom: 1rem;
  color: #71817c;
  font-size: 0.7rem;
}

.register-card .form-label {
  display: block;
  margin-bottom: 0.25rem;
  color: #334b44;
  font-size: 0.65rem;
  font-weight: 600;
}

.register-card .form-control {
  min-height: 2rem;
  border-color: #d7e1dd;
  color: #38524b;
  font-size: 0.7rem;
}

.register-card .form-control::placeholder {
  color: #a4b0ab;
}

.register-card .form-control:focus {
  border-color: #75b9a5;
  box-shadow: 0 0 0 0.2rem rgb(8 120 95 / 15%);
}

.register-field {
  margin-top: 0.65rem;
}

.register-name-row .form-control {
  padding: 0.35rem 0.55rem;
}

.register-field legend {
  float: none;
  width: auto;
  margin-bottom: 0.25rem;
}

.area-choices {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
}

.area-choice {
  position: relative;
  display: flex;
  min-height: 2.8rem;
  align-items: center;
  justify-content: center;
  border: 1px solid #d7e1dd;
  border-radius: 0.4rem;
  background: #fff;
  color: #455b54;
  cursor: pointer;
  text-align: center;
}

.area-choice--selected {
  border-color: #07855f;
  background: #eaf5f1;
  color: #08785f;
}

.area-choice:focus-within {
  outline: 2px solid rgb(8 120 95 / 35%);
  outline-offset: 2px;
}

.area-radio {
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
}

.area-choice span {
  display: flex;
  flex-direction: column;
}

.area-choice strong {
  font-size: 0.7rem;
}

.area-choice small {
  font-size: 0.55rem;
}

.terms-choice {
  display: flex;
  align-items: flex-start;
  gap: 0.4rem;
  margin-top: 0.75rem;
  color: #61736d;
  font-size: 0.58rem;
  line-height: 1.4;
}

.terms-choice .form-check-input {
  flex: 0 0 auto;
  margin-top: 0.05rem;
  --bs-form-check-input-checked-bg-color: #08785f;
  --bs-form-check-input-checked-border-color: #08785f;
}

.register-submit {
  width: 100%;
  margin-top: 0.8rem;
  padding: 0.5rem 1rem;
  background: #08785f;
  color: #fff;
  font-size: 0.7rem;
  font-weight: 600;
}

.register-submit:hover,
.register-submit:focus-visible {
  background: #06674f;
  color: #fff;
}

.register-message {
  margin: 0.65rem 0 0;
  color: #6b7772;
  font-size: 0.65rem;
  text-align: center;
}

.login-prompt {
  margin: 0.9rem 0 0;
  color: #71817c;
  font-size: 0.65rem;
  text-align: center;
}

.login-prompt a {
  color: #08785f;
  font-weight: 700;
  text-decoration: none;
}

.login-prompt a:hover {
  text-decoration: underline;
}

.register-provider {
  margin: 0.75rem 0 0;
  color: #96a29d;
  font-size: 0.6rem;
  text-align: center;
}

@media (max-width: 767.98px) {
  .register-view {
    grid-template-columns: 1fr;
  }

  .register-side {
    padding: 1.5rem 1.25rem;
  }
}
</style>
