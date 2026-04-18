// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  app: {
    baseURL: "/",
    head: {
      htmlAttrs: {
        lang: "uk"
      },
      title: "Tilolab",
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "Tilo Lab — це сучасний простір дослідження інтимного здоров'я, задоволення та тілесної гармонії. Ми створили лабораторію, де інновації, наука та турбота про тіло поєднуються у відповідальний та делікатний сервіс."
        },
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "Tilolab" }
      ],
      link: [{ rel: "icon", type: "image/webp", href: "/favicon.ico" }]
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
    // bank_test_public_key: process.env.BANK_TEST_PUBLIC_KEY,
    bank_api_key: process.env.BANK_API_KEY,
    bank_webhook_url: process.env.BANK_WEBHOOK_URL,
    bank_public_key: process.env.BANK_PUBLIC_KEY,
    new_post_api: process.env.NOVA_POST_API,
    nova_post_test_api_key: process.env.NOVA_POST_TEST_API_KEY,
    nova_post_sender_ref: process.env.NOVA_POST_SENDER_REF,
    nova_post_contact_ref: process.env.NOVA_POST_CONTACT_REF,
    admin_user_name: process.env.ADMIN_USERNAME,
    admin_password: process.env.ADMIN_PASSWORD,
    jwt_secret: process.env.JWT_SECRET,
    telegram_token: process.env.TELEGRAM_TOKEN,
    telegram_chat_id: process.env.TELEGRAM_CHAT_ID,
    cf_account_id: process.env.CF_ACCOUNT_ID,
    cf_access_key: process.env.CF_ACCESS_KEY,
    cf_secret_key: process.env.CF_SECRET_KEY,
    r2_bucket_name: process.env.R2_BUCKET_NAME,
    r2_public_url: process.env.R2_PUBLIC_URL,

    public: {
      api_base_url: process.env.API_BASE_URL,
      nova_post_uri: process.env.NOVA_POST_URI,
      nova_post_test_uri: process.env.NOVA_POST_TEST_URI
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
      "@nuxtjs/sitemap",
      {
        hostname: "https://tilolab.com.ua",
        exclude: ["/admin/**", "/auth/**", "/summary/**"],
        routes: async () => {
          // You can add dynamic routes here if needed
          return [];
        }
      }
    ],
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
      allowedHosts: ["41e6-37-73-34-18.ngrok-free.app"],
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
