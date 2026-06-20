/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_VERIFICATION: string
  readonly VITE_BING_VERIFICATION: string
  readonly VITE_BASE_URL: string
  readonly VITE_API_BASE_URL: string
  readonly VITE_API_SECURE: string
  readonly VITE_COMPANY_NAME: string
  readonly VITE_COMPANY_SHORT_NAME: string
  readonly VITE_COMPANY_ADDRESS: string
  readonly VITE_COMPANY_PHONE: string
  readonly VITE_COMPANY_PHONE_SHORT: string
  readonly VITE_COMPANY_EMAIL: string
  readonly VITE_SITE_URL: string
  readonly VITE_API_URL: string
  readonly VITE_AUTH_STORAGE_TYPE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
