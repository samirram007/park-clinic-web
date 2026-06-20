export const company = {
  name: import.meta.env.VITE_COMPANY_NAME || 'Park Sonoscan Clinic',
  shortName: import.meta.env.VITE_COMPANY_SHORT_NAME || 'Park Clinic',
  address: import.meta.env.VITE_COMPANY_ADDRESS || '4, Gorky Terrace, Minto Park, Kolkata - 700017',
  phone: import.meta.env.VITE_COMPANY_PHONE || '+91 9775992022 / 9775992024',
  email: import.meta.env.VITE_COMPANY_EMAIL || 'info@parkclinickolkata.com',
  siteUrl: import.meta.env.VITE_SITE_URL || 'https://parkclinickolkata.com',
  phoneShort: import.meta.env.VITE_COMPANY_PHONE_SHORT || '9775992022',
} as const
