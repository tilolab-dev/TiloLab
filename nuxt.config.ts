// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  app: {
    baseURL: '/',
    head: {
      meta: [
        { 
          name: 'viewport', 
          content: 'width=device-width, initial-scale=1' 
        }
      ]
    }
  },
  nitro: {
    compressPublicAssets: true,
  },
  build: {
    transpile: ['@supabase/supabase-js']
  },
  imports: {
    dirs: ['helpers']
  },
  runtimeConfig: {
    api_secret_path: process.env.API_SECRET_PATH,
    api_secret_key: process.env.API_SECRET_KEY,

    public: {
      api_base_url: process.env.API_BASE_URL,

    }
  },
  css: [
    '~/style/mixins.scss',
    '~/style/default.css',
    '~/style/index.scss',
    '~/style/variables.scss',
    
  ],
  alias: {
   '@components': '/components',
    '@utils': '/utils',
    '@store': '/store',
    '@helpers': '/helpers'
  },
  modules: ['@pinia/nuxt', '@nuxt/image', ['@nuxtjs/google-fonts', {
    families: {
      'Montserrat': {
        wght: [400, 500, 600],
        ital: [500],
      },
      'Inter': {
        wght: [500],
      },
    },
  }], 'nuxt-swiper']

})