<script setup>
import { reactive, ref } from 'vue'
import IntroMessage from '../components/IntroMessage.vue'
import axios from 'axios'

const credentials = reactive({
  username: '',
  password: '',
  rememberMe: false,
})

const isLoading = ref(false)

const loginMessage = ref('')

async function submitLogin() {
  isLoading.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    const data = await axios.post("https://localhost:7235/api/auth/login", credentials);
    console.log(data.data.token);
    localStorage.setItem('stromAlertToken', data.data.token);
    window.location.href = '/';
  } catch (error) {
    if (error.response && error.response.status === 401) {
      loginMessage.value = 'Ugyldig brugernavn eller adgangskode.'
    } else {
      loginMessage.value = 'Der opstod en fejl. Prøv igen senere.'
    }
  } finally {
    isLoading.value = false
  }
}

function showPasswordRecoveryMessage() {
  loginMessage.value = 'Nulstilling af adgangskode er ikke tilgængelig endnu.'
}
</script>

<template>
  <main class="login-view">
    <IntroMessage />

    <section class="login-side" aria-labelledby="login-heading">
      <div class="login-content">
        <form class="login-card" @submit.prevent="submitLogin">
          <h2 id="login-heading">Velkommen tilbage</h2>
          <p class="login-subtitle">Log ind for at se dine strømpriser og indstillinger.</p>

          <div class="login-field">
            <label for="login-username" class="form-label">Brugernavn</label>
            <input
              id="login-username"
              v-model="credentials.username"
              class="form-control"
              type="text"
              name="username"
              placeholder="Indtast dit brugernavn"
              autocomplete="username"
              required
            >
          </div>

          <div class="login-field">
            <label for="login-password" class="form-label">Adgangskode</label>
            <input
              id="login-password"
              v-model="credentials.password"
              class="form-control"
              type="password"
              name="password"
              placeholder="Indtast din adgangskode"
              autocomplete="current-password"
              required
            >
          </div>

          <div class="login-options">
            <label class="remember-option">
              <input v-model="credentials.rememberMe" class="form-check-input" type="checkbox">
              <span>Husk mig</span>
            </label>
            <button class="recovery-button" type="button" @click="showPasswordRecoveryMessage">
              Glemt adgangskode?
            </button>
          </div>

          <button v-if="!isLoading" class="btn login-submit" type="submit">Log ind</button>
          <button v-else class="btn login-submit" type="button" disabled>
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            Indlæser...
          </button>
          <p v-if="loginMessage" class="login-message" role="status">{{ loginMessage }}</p>

          <p class="signup-prompt">
            Har du ikke en konto?
            <RouterLink to="/register">Opret dig gratis</RouterLink>
          </p>
        </form>

        <p class="login-provider">Priser leveres af Energi Data Service</p>
      </div>
    </section>
  </main>
</template>

<style scoped>
.login-view {
  position: fixed;
  z-index: 1100;
  inset: 0;
  display: grid;
  min-height: 100vh;
  overflow-y: auto;
  grid-template-columns: 42.3% 57.7%;
  color: #173a35;
}

.login-side {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: #f4f7f5;
}

.login-content {
  width: 100%;
  max-width: 360px;
}

.login-card {
  padding: 1.4rem;
  border: 1px solid #e0e7e4;
  border-radius: 0.65rem;
  background: #fff;
  box-shadow: 0 2px 6px rgb(23 58 53 / 4%);
  --bs-form-check-input-checked-bg-color: #08785f;
  --bs-form-check-input-checked-border-color: #08785f;
}

.login-card h2 {
  margin-bottom: 0.2rem;
  color: #173a35;
  font-size: 1.35rem;
  font-weight: 700;
}

.login-subtitle {
  margin-bottom: 1.2rem;
  color: #71817c;
  font-size: 0.75rem;
}

.login-field + .login-field {
  margin-top: 0.75rem;
}

.login-field .form-label {
  margin-bottom: 0.3rem;
  color: #334b44;
  font-size: 0.7rem;
  font-weight: 600;
}

.login-field .form-control {
  min-height: 2.35rem;
  border-color: #d7e1dd;
  color: #38524b;
  font-size: 0.75rem;
}

.login-field .form-control::placeholder {
  color: #a4b0ab;
}

.login-field .form-control:focus {
  border-color: #75b9a5;
  box-shadow: 0 0 0 0.2rem rgb(8 120 95 / 15%);
}

.login-options {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin: 0.75rem 0 0.9rem;
}

.remember-option {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  color: #5d7069;
  font-size: 0.7rem;
  white-space: nowrap;
}

.remember-option .form-check-input {
  margin: 0;
}

.recovery-button {
  padding: 0;
  border: 0;
  background: none;
  color: #08785f;
  font-size: 0.7rem;
  font-weight: 600;
}

.recovery-button:hover {
  color: #055e49;
  text-decoration: underline;
}

.login-submit {
  width: 100%;
  padding: 0.55rem 1rem;
  background: #08785f;
  color: #fff;
  font-size: 0.75rem;
  font-weight: 600;
}

.login-submit:hover,
.login-submit:focus-visible {
  background: #06674f;
  color: #fff;
}

.login-message {
  margin: 0.75rem 0 0;
  color: #6b7772;
  font-size: 0.7rem;
  text-align: center;
}

.signup-prompt {
  margin: 1.1rem 0 0;
  color: #71817c;
  font-size: 0.7rem;
  text-align: center;
}

.signup-prompt a {
  color: #08785f;
  font-weight: 700;
  text-decoration: none;
}

.signup-prompt a:hover {
  text-decoration: underline;
}

.login-provider {
  margin: 0.9rem 0 0;
  color: #96a29d;
  font-size: 0.65rem;
  text-align: center;
}

@media (max-width: 767.98px) {
  .login-view {
    grid-template-columns: 1fr;
  }

  .login-side {
    padding: 2rem 1.25rem;
  }
}

@media (max-width: 420px) {
  .login-options {
    gap: 0.4rem;
  }

  .recovery-button,
  .remember-option {
    font-size: 0.65rem;
  }
}
</style>
