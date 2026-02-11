import js from "@eslint/js";
import pluginVue from "eslint-plugin-vue";
import * as parserVue from "vue-eslint-parser";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import prettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

export default [
  {
    ignores: [
      "node_modules/**",
      ".nuxt/**",
      ".output/**",
      "dist/**",
      "build/**",
      "*.d.ts",
      "coverage/**"
    ]
  },
  js.configs.recommended,
  ...pluginVue.configs["flat/recommended"],
  {
    files: ["**/*.vue", "**/*.js", "**/*.ts"],
    languageOptions: {
      parser: parserVue,
      parserOptions: {
        parser: tsparser,
        sourceType: "module",
        ecmaVersion: 2022,
        extraFileExtensions: [".vue"]
      },
      globals: {
        console: "readonly",
        document: "readonly",
        window: "readonly",
        localStorage: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
        FormData: "readonly",
        FileReader: "readonly",
        File: "readonly",
        Blob: "readonly",
        alert: "readonly",
        process: "readonly",
        require: "readonly",
        // Nuxt globals
        $fetch: "readonly",
        navigateTo: "readonly",
        useRoute: "readonly",
        useRouter: "readonly",
        useRuntimeConfig: "readonly",
        useHead: "readonly",
        defineNuxtConfig: "readonly",
        defineNuxtPlugin: "readonly",
        definePageMeta: "readonly",
        useFetch: "readonly",
        useAsyncData: "readonly",
        defineNuxtRouteMiddleware: "readonly",
        useCookie: "readonly",
        setCookie: "readonly",
        readRawBody: "readonly",
        getHeader: "readonly",
        // Vue globals
        ref: "readonly",
        computed: "readonly",
        watch: "readonly",
        onMounted: "readonly",
        toRefs: "readonly",
        nextTick: "readonly",
        // Swiper globals
        useSwiper: "readonly",
        // Server globals
        defineEventHandler: "readonly",
        defineNitroPlugin: "readonly",
        getRouterParam: "readonly",
        getQuery: "readonly",
        readBody: "readonly",
        readMultipartFormData: "readonly",
        createError: "readonly",
        // Custom globals
        locale: "readonly",
        fetch: "readonly",
        // Helper functions
        transliterate: "readonly",
        // Store globals
        useAuthStore: "readonly",
        useCartStore: "readonly",
        useIndexStore: "readonly",
        useProductStore: "readonly",
        useModalStore: "readonly",
        // Utility functions
        countTotalPrice: "readonly",
        resetTextFields: "readonly",
        productFileUpload: "readonly",
        // SUPABASE
        useSupabaseClient: "readonly",
        useSupabaseUser: "readonly",
        serverSupabaseUser: "readonly",
        useSupabaseAdmin: "readonly",
        // COOCKIE
        getGuestIdFromCookie: "readonly",
        clearGuestIdCookie: "readonly",
        setGuestIdCookie: "readonly"
      }
    },
    plugins: {
      "@typescript-eslint": tseslint,
      prettier: prettier
    },
    rules: {
      ...prettierConfig.rules,
      "prettier/prettier": [
        "error",
        {
          semi: true,
          singleQuote: false,
          tabWidth: 2,
          trailingComma: "none",
          printWidth: 100,
          endOfLine: "lf",
          vueIndentScriptAndStyle: false
        }
      ],
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "vue/multi-word-component-names": "off",
      "vue/no-v-html": "warn",
      "vue/require-default-prop": "off",
      "vue/require-explicit-emits": "off",
      "no-console": "warn",
      "no-debugger": "off"
    }
  },
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        sourceType: "module",
        ecmaVersion: 2022
      },
      globals: {
        console: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
        FormData: "readonly",
        FileReader: "readonly",
        File: "readonly",
        Buffer: "readonly",
        Blob: "readonly",
        alert: "readonly",
        process: "readonly",
        require: "readonly",
        // Nuxt globals
        $fetch: "readonly",
        navigateTo: "readonly",
        useRuntimeConfig: "readonly",
        defineNuxtConfig: "readonly",
        defineNuxtPlugin: "readonly",
        // Helper functions
        transliterate: "readonly",
        // Store globals
        useAuthStore: "readonly",
        useCartStore: "readonly",
        useIndexStore: "readonly",
        useProductStore: "readonly",
        useModalStore: "readonly",
        // Utility functions
        countTotalPrice: "readonly",
        resetTextFields: "readonly",
        productFileUpload: "readonly",
        // Server globals
        defineEventHandler: "readonly",
        getRouterParam: "readonly",
        getQuery: "readonly",
        readBody: "readonly",
        readMultipartFormData: "readonly",
        createError: "readonly"
      }
    },
    plugins: {
      "@typescript-eslint": tseslint,
      prettier: prettier
    },
    rules: {
      ...prettierConfig.rules,
      "prettier/prettier": "error",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "no-console": "off",
      "no-debugger": "off"
    }
  }
];
