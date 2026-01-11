// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  app: {
    baseURL: "/",
    head: {
      meta: [
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1"
        }
      ]
    }
  },
  nitro: {
    compressPublicAssets: true
  },
  build: {
    transpile: ["@supabase/supabase-js", "gsap"]
  },
  imports: {
    dirs: ["helpers"]
  },
  runtimeConfig: {
    api_secret_path: process.env.API_SECRET_PATH,
    api_secret_key: process.env.API_SECRET_KEY,
    api_service_role_key: process.env.API_SERVICE_ROLE_KEY,
    bank_api_key: process.env.BANK_API_KEY,
    nova_post_api: process.env.NEW_POST_API,

    public: {
      api_base_url: process.env.API_BASE_URL,
      nova_post_uri: process.env.NOVA_POST_URI
    }
  },
  css: [
    "~/style/mixins.scss",
    "~/style/default.css",
    "~/style/index.scss",
    "~/style/variables.scss"
  ],
  alias: {
    "@components": "/components",
    "@utils": "/utils",
    "@store": "/store",
    "@helpers": "/helpers"
  },
  modules: [
    "@pinia/nuxt",
    "@nuxt/image",
    [
      "@nuxtjs/google-fonts",
      {
        families: {
          Montserrat: {
            wght: [400, 500, 600],
            ital: [500]
          },
          Inter: {
            wght: [500]
          }
        }
      }
    ],
    "nuxt-swiper"
  ],

  vite: {
    plugins: [
      require("vite-svg-loader")({
        svgo: true,
        svgoConfig: {
          plugins: [
            {
              name: "removeViewBox",
              active: false
            }
          ]
        }
      })
    ],
    optimizeDeps: {
      include: ["gsap"]
    }
  }
});
