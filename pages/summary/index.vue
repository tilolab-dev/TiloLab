<template>
  <div class="summary-index">
    <div class="container">
      <h1>Сторінка замовлення</h1>
      <p>Ця сторінка вимагає ідентифікатор замовлення.</p>
      <NuxtLink to="/" class="home-link">Повернутися на головну</NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { useSeoMeta } from "#imports";

useSeoMeta({
  title: "Замовлення - Tilo Lab",
  description: "Сторінка замовлень Tilo Lab",
  ogTitle: "Замовлення - Tilo Lab",
  ogDescription: "Сторінка замовлень Tilo Lab",
  ogImage: "https://tilolab.com.ua/images/about-main.webp",
  twitterCard: "summary_large_image"
});
</script>

<style lang="scss" scoped>
.summary-index {
  width: 100%;
  min-height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--text-color);

  .container {
    text-align: center;
    max-width: 600px;
    padding: 2rem;

    h1 {
      font-size: 2rem;
      margin-bottom: 1rem;
    }

    p {
      font-size: 1.1rem;
      margin-bottom: 2rem;
      color: var(--text-grey);
    }

    .home-link {
      display: inline-block;
      padding: 12px 24px;
      background-color: var(--accent-color);
      color: white;
      text-decoration: none;
      border-radius: 8px;
      transition: opacity 0.3s ease;

      &:hover {
        opacity: 0.8;
      }
    }
  }
}
</style>
