<template>
  <p>Авторизація...</p>
</template>

<script setup>
import { useSeoMeta, navigateTo } from "nuxt/app";
import { onMounted } from "vue";
import { useAuth } from "@/composables/useAuth";

useSeoMeta({
  title: "Авторизація - Tilo Lab",
  robots: "noindex, nofollow"
});

onMounted(async () => {
  await useAuth().syncUser();
  await navigateTo("/");
});
</script>
