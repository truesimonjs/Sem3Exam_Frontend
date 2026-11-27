const profileData = {
  profile: {
    firstName: 'Sofie',
    lastName: 'Jensen',
    email: 'sofie@eksempel.dk',
    priceArea: 'DK1',
  },
  priceThresholds: {
    goodPrice: 0.8,
    expensivePrice: 1.8,
  },
}

export async function fetchProfileData() {
  // Replace this static fixture with the API request when the endpoint is available.
  return {
    profile: { ...profileData.profile },
    priceThresholds: { ...profileData.priceThresholds },
  }
}
