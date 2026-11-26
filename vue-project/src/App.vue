<template>
  <header>
    <nav class="navbar navbar-expand-md bg-white border-bottom" aria-label="Main navigation">
      <div class="container-fluid px-3 px-lg-4">
        <RouterLink class="navbar-brand d-flex align-items-center gap-2 me-0" to="/">
          <span class="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M13.2 2 4.7 13h5.8l-.8 9L19.3 11h-5.8l-.3-9Z" />
            </svg>
          </span>
          <span>Strøm-Alert</span>
        </RouterLink>

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div id="mainNavbar" class="collapse navbar-collapse">
          <div class="navbar-nav mx-auto">
            <RouterLink class="nav-link" to="/" exact-active-class="active">Strømpriser</RouterLink>
            <RouterLink class="nav-link" to="/profil" active-class="active">Min profil</RouterLink>
          </div>

          <div class="navbar-user-actions">
            <button class="btn logout-button" type="button">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M10 17v3H5V4h5v3M14 7l5 5-5 5M19 12H9" />
              </svg>
              <span>Log ud</span>
            </button>
            <div class="profile-summary d-flex align-items-center gap-2">
              <div class="text-md-end">
                <div class="profile-name">Sofie Jensen</div>
                <div class="profile-location">DK1 · Vestdanmark</div>
              </div>
              <span class="profile-avatar" aria-label="Sofie Jensen">SJ</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>

  <RouterView />
</template>

<style>
.navbar {
  min-height: 48px;
  padding-top: 0;
  padding-bottom: 0;
  font-size: 0.75rem;
}

.navbar-brand {
  color: #173a35;
  font-size: 0.875rem;
  font-weight: 700;
}

.navbar-brand:hover {
  color: #0b765e;
}

.brand-mark {
  display: inline-flex;
  width: 22px;
  height: 22px;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  background-color: #08785f;
  color: #fff;
}

.brand-mark svg {
  width: 16px;
  height: 16px;
}

.navbar-nav {
  align-self: stretch;
  gap: 0.25rem;
}

.navbar-nav .nav-link {
  display: flex;
  align-items: center;
  padding: 0 0.75rem;
  color: #465651;
}

.navbar-nav .nav-link.active {
  border-bottom: 2px solid #08785f;
  color: #08785f;
  font-weight: 600;
}

.profile-summary {
  color: #243a36;
}

.profile-name {
  font-weight: 600;
}

.profile-location {
  color: #83908c;
  font-size: 0.625rem;
}

.profile-avatar {
  display: inline-flex;
  width: 28px;
  height: 28px;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #d9eee9;
  color: #08785f;
  font-size: 0.625rem;
  font-weight: 700;
}

.navbar-user-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.profile-summary {
  padding-left: 0.75rem;
  border-left: 1px solid #e3eae7;
}

.logout-button {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.35rem 0.65rem;
  border: 1px solid #dce5e1;
  border-radius: 0.45rem;
  background: #f8faf9;
  color: #08785f;
  font-size: 0.7rem;
  font-weight: 600;
  white-space: nowrap;
  transition: background-color 0.15s ease, border-color 0.15s ease;
}

.logout-button svg {
  width: 14px;
  height: 14px;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.8;
}

.logout-button:hover,
.logout-button:focus-visible {
  border-color: #b8d5ca;
  background: #eaf5f1;
  color: #06674f;
}

.logout-button:focus-visible {
  box-shadow: 0 0 0 0.2rem rgb(8 120 95 / 15%);
}

@media (max-width: 767.98px) {
  .navbar-nav {
    align-self: auto;
    padding-top: 0.5rem;
  }

  .navbar-nav .nav-link {
    min-height: 40px;
    padding: 0.5rem 0;
  }

  .navbar-nav .nav-link.active {
    border-bottom: 0;
  }

  .navbar-user-actions {
    align-self: flex-start;
    margin-bottom: 0.75rem;
  }

  .profile-summary {
    padding-left: 0.75rem;
  }
}
</style>
