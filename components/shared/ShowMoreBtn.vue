<template>
  <NuxtLink class="show-more-link" :to="link">
    <slot />
  </NuxtLink>
</template>

<script setup>
defineProps({
  link: {
    type: String,
    default: "/"
  }
});
</script>

<style scoped lang="scss">
.show-more-link {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--link-color);
  text-align: right;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: 0.36px;
  text-transform: uppercase;
  white-space: nowrap;
  text-decoration: none;

  :deep(svg) {
    width: 10px;
    height: 10px;
    flex-shrink: 0;

    path {
      stroke: var(--link-color);
    }
  }

  &:hover {
    color: var(--link-color-hover);

    :deep(svg) {
      path {
        stroke: var(--link-color-hover);
      }
    }
  }

  &:active {
    color: var(--link-color-active);

    :deep(svg) {
      path {
        stroke: var(--link-color-active);
      }
    }
  }

  @media screen and (max-width: 480px) {
    font-size: 0.9375rem;
  }

  @media screen and (max-width: 375px) {
    font-size: 0.8125rem;
  }
}
</style>
