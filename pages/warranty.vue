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
import { useSeoMeta } from "#imports";
useSeoMeta({
  title: "Гарантія",
  description:
    "Tilo Lab — це сучасний простір дослідження інтимного здоров’я, задоволення та тілесної гармонії. Ми створили лабораторію, де інновації, наука та турбота про тіло поєднуються у відповідальний та делікатний сервіс.",
  ogTitle: "Гарантія",
  ogDescription:
    "Tilo Lab — це сучасний простір дослідження інтимного здоров’я, задоволення та тілесної гармонії. Ми створили лабораторію, де інновації, наука та турбота про тіло поєднуються у відповідальний та делікатний сервіс.",
  ogImage: "https://tilolab.com.ua/images/about-main.webp"
});
</script>

<style lang="scss">
@use "@/style/mixins.scss" as mixins;
.public_offer {
  @include mixins.legalPage;
}
</style>
