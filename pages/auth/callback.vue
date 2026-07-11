<template>
  <p>Авторизація...</p>
</template>

<script setup>
import { useSeoMeta, navigateTo } from "nuxt/app";
import { onMounted } from "vue";
import { syncUser } from "@/composables/useAuth";

useSeoMeta({
  title: "Авторизація - Tilo Lab",
  robots: "noindex, nofollow"
});

onMounted(async () => {
  await syncUser();
  await navigateTo("/");
});
</script>
