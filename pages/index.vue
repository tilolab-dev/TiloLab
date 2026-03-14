<template>
  <section class="index_page">
    <IndexHero />

    <IndexCategories />

    <IndexPopular />

    <IndexBanner />

    <Advantages />

    <IndexCta />

    <Seo />
  </section>
</template>

<script setup>
import { useSeoMeta } from "#imports";
useSeoMeta({
  title: "Головна",
  description:
    "Tilo Lab — це сучасний простір дослідження інтимного здоров’я, задоволення та тілесної гармонії. Ми створили лабораторію, де інновації, наука та турбота про тіло поєднуються у відповідальний та делікатний сервіс.",
  ogTitle: "Головна",
  ogDescription:
    "Tilo Lab — це сучасний простір дослідження інтимного здоров’я, задоволення та тілесної гармонії. Ми створили лабораторію, де інновації, наука та турбота про тіло поєднуються у відповідальний та делікатний сервіс.",
  ogImage: "https://tilolab.com/public/images/about-main.webp"
});
</script>

<style lang="scss" scoped>
.auth-btn {
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  border: 1px solid black;
  padding-inline: 1rem;
  cursor: pointer;
}
</style>
