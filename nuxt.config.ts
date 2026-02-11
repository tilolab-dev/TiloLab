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
  // experimental: {
  //   inlineSSRStyles: true
  // },
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
    test_bank_api_key: process.env.TEST_BANK_API_KEY,
    bank_api_key: process.env.BANK_API_KEY,
    bank_webhook_url: process.env.BANK_WEBHOOK_URL,
    bank_public_key: process.env.BANK_PUBLIC_KEY,
    nova_post_api: process.env.NEW_POST_API,
    admin_user_name: process.env.ADMIN_USERNAME,
    admin_password: process.env.ADMIN_PASSWORD,
    jwt_secret: process.env.JWT_SECRET,
    public: {
      api_base_url: process.env.API_BASE_URL,
      nova_post_uri: process.env.NOVA_POST_URI
    }
  },
  css: [
    "~/style/mixins.scss",
    "~/style/default.scss",
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
    "@nuxtjs/supabase",
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
  supabase: {
    redirect: false,

    url: process.env.NUXT_PUBLIC_SUPABASE_URL,
    key: process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY
  },
  vite: {
    server: {
      allowedHosts: ["7fdf-46-150-69-16.ngrok-free.app"],
      strictPort: false
    },
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
