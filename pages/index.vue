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
  title: "Tilo Lab - Інтимне здоров'я та тілесна гармонія | Головна",
  description:
    "Tilo Lab - сучасний простір для дослідження інтимного здоров'я та задоволення. Інноваційні продукти, делікатний сервіс та турбота про ваше тіло. Доставка по всій Україні.",
  ogTitle: "Tilo Lab - Інтимне здоров'я та тілесна гармонія",
  ogDescription:
    "Сучасний простір дослідження інтимного здоров'я, задоволення та тілесної гармонії. Інновації, наука та турбота про тіло.",
  ogImage: "https://tilolab.com.ua/images/about-main.webp",
  ogUrl: "https://tilolab.com.ua/",
  twitterCard: "summary_large_image",
  twitterTitle: "Tilo Lab - Інтимне здоров'я та тілесна гармонія",
  twitterDescription:
    "Сучасний простір дослідження інтимного здоров'я та задоволення. Інноваційні продукти та турбота про тіло.",
  twitterImage: "https://tilolab.com.ua/images/about-main.webp"
});

// Structured Data for SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Tilo Lab",
  url: "https://tilolab.com.ua",
  description: "Сучасний простір дослідження інтимного здоров'я, задоволення та тілесної гармонії",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://tilolab.com.ua/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  },
  sameAs: ["https://www.instagram.com/tilolab.ua", "https://www.facebook.com/tilolab.ua"]
};

useHead({
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify(structuredData)
    }
  ]
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
