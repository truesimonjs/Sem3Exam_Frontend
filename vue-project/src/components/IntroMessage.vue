<template>
  <aside class="login-promo">
    <div class="login-brand">
      <span class="login-brand-mark" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M13.2 2 4.7 13h5.8l-.8 9L19.3 11h-5.8l-.3-9Z" />
        </svg>
      </span>
      <span>Strøm-Alert</span>
    </div>

    <div class="login-promo-copy">
      <p class="login-eyebrow">BRUG STRØMMEN SMARTE</p>
      <h1>Se hvornår strømmen er billigst.</h1>
      <p class="login-promo-description">
        Vi holder øje med priserne for dig, så du nemt kan flytte dit forbrug til de billigste timer.
      </p>
    </div>

    <p class="login-promo-footer">
      Aktuelle priser <span aria-hidden="true">·</span> Ingen teknisk viden nødvendig
    </p>
  </aside>
</template>

<style scoped>
.login-promo {
  position: relative;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  padding: 2rem 1.9rem;
  background: linear-gradient(145deg, #0d5a48 0%, #08785f 100%);
  color: #fff;
}

.login-promo::before,
.login-promo::after {
  position: absolute;
  right: -9rem;
  bottom: -16rem;
  width: 25rem;
  height: 25rem;
  border: 1px solid rgb(255 255 255 / 8%);
  border-radius: 50%;
  content: '';
  pointer-events: none;
}

.login-promo::after {
  right: -6rem;
  bottom: -13rem;
  width: 19rem;
  height: 19rem;
  border-color: rgb(255 255 255 / 9%);
}

.login-brand {
  z-index: 1;
  display: inline-flex;
  width: fit-content;
  align-items: center;
  gap: 0.45rem;
  color: #fff;
  font-size: 0.9rem;
  font-weight: 700;
}

.login-brand-mark {
  display: inline-flex;
  width: 22px;
  height: 22px;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  background: #fff;
  color: #08785f;
}

.login-brand-mark svg {
  width: 16px;
  height: 16px;
}

.login-promo-copy {
  z-index: 1;
  max-width: 24rem;
  margin: auto 0;
  padding: 3rem 0;
}

.login-eyebrow {
  margin-bottom: 0.75rem;
  color: #b6e0d2;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.14em;
}

.login-promo-copy h1 {
  max-width: 22rem;
  margin-bottom: 0.8rem;
  color: #fff;
  font-size: clamp(1.6rem, 2.5vw, 2rem);
  font-weight: 700;
  line-height: 1.2;
}

.login-promo-description {
  max-width: 23rem;
  margin: 0;
  color: #c6e2d9;
  font-size: 0.9rem;
  line-height: 1.55;
}

.login-promo-footer {
  z-index: 1;
  margin: 0;
  color: #b6d9ce;
  font-size: 0.7rem;
}

.login-promo-footer span {
  padding: 0 0.3rem;
}

@media (max-width: 767.98px) {
  .login-promo {
    min-height: 280px;
    padding: 1.5rem;
  }

  .login-promo-copy {
    padding: 2.5rem 0;
  }
}

@media (max-width: 420px) {
  .login-promo {
    min-height: 250px;
  }
}
</style>
