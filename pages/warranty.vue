<template>
  <section class="public_offer">
    <div class="container">
      <div class="legal_title">
        <h1>Обмін і гарантія</h1>
      </div>

      В розробці
    </div>
  </section>
</template>

<script setup>
import { useSeoMeta, useHead } from "#imports";
useSeoMeta({
  title: "Гарантія та повернення - Tilo Lab",
  description:
    "Гарантійні зобов'язання та умови повернення товару в Tilo Lab. Детальна інформація про гарантійний термін, процедуру повернення та обміну товарів.",
  ogTitle: "Гарантія та повернення - Tilo Lab",
  ogDescription: "Гарантійні зобов'язання та умови повернення товару в Tilo Lab.",
  ogImage: "https://tilolab.com.ua/images/about-main.webp",
  ogUrl: "https://tilolab.com.ua/warranty"
});

// Canonical URL
useHead({
  link: [
    {
      rel: "canonical",
      href: "https://tilolab.com.ua/warranty"
    }
  ]
});
</script>

<style lang="scss">
@use "@/style/mixins.scss" as mixins;
.public_offer {
  @include mixins.legalPage;
}
</style>
