<template>
  <section class="index_page">
    <IndexHero />

    <IndexCategories />

    <IndexPopular />

    <IndexBanner />

    <IndexCta />
  </section>
</template>

<script setup></script>

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
