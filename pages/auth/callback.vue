<template>
  <p>Авторизація...</p>
</template>

<script setup lang="ts">
import { useSeoMeta, navigateTo } from "nuxt/app";
import { onMounted } from "vue";

useSeoMeta({
  title: "Авторизація - Tilo Lab",
  robots: "noindex, nofollow"
});

onMounted(() => {
  navigateTo("/");
});
</script>
