const rawApiBaseUrl = import.meta.env.VITE_API_BASE_URL

export const API_BASE_URL = rawApiBaseUrl?.replace(/\/+$/, '') || ''

export const env = {
  apiBaseUrl: API_BASE_URL,
} as const
