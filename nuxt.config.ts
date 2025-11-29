// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  nitro: {
    compressPublicAssets: true
  },
  runtimeConfig: {
    api_secret_path: process.env.API_SECRET_PATH,
    api_secret_key: process.env.API_SECRET_KEY,

    public: {
      api_base_url: process.env.API_BASE_URL,

    }
  }

})
