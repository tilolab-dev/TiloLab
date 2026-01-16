<template>
  <section class="index_banner">
    <NuxtImg
      src="/images/index-img/banner.webp"
      class="banner_img"
      quality="80"
      width="1200"
      height="600"
      alt="banner"
      lazy
      sizes="(max-width: 480px) 480px, (max-width: 1024px) 1024px, 1200px"
    />
    <!-- ref="imgRef" -->

    <!-- style="transform: scale(1.15); opacity: 0.7" -->

    <div class="banner_overlay"></div>

    <div class="container">
      <div class="banner_content">
        <h3 class="banner_title">
          тут буде якийсь рекламний <br />
          банер або просто картинка
        </h3>

        <span class="banner_description"> Щоб розбавити сторінку </span>
      </div>
    </div>
  </section>
</template>

<script setup></script>

<style lang="scss">
.index_banner {
  width: 100%;
  height: auto;
  position: relative;
  padding-block: 352px;

  @media screen and (max-width: 1024px) {
    padding-block: 220px;
  }
  @media screen and (max-width: 768px) {
    padding-block: 250px;
  }

  @media screen and (max-width: 480px) {
    padding-block: 111px;
  }

  @media screen and (max-width: 375px) {
    padding-block: 51px;
  }
}

.banner_img {
  position: absolute;
  will-change: transform;
  width: 100%;
  height: 100%;
  object-fit: cover;
  top: 0;
  left: 0;
  z-index: 1;
}

.banner_overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.3) 100%);
  z-index: 2;
}

.banner_content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  position: relative;
  gap: 1rem;
  z-index: 3;
}

.banner_title {
  font-family: "Montserrat", sans-serif;
  font-size: 1.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  color: var(--text-color);

  @media screen and (max-width: 1024px) {
    font-size: 1.75rem;
  }

  @media screen and (max-width: 768px) {
    font-size: clamp(1.5rem, 3vw, 1.75rem);
  }

  @media screen and (max-width: 480px) {
    font-size: clamp(0.9rem, 5vw, 1.5rem);
  }
}

.banner_description {
  color: var(--text-color);
  font-family: Montserrat;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: 0.36px;

  @media screen and (max-width: 768px) {
    font-size: 1.0625rem;
  }

  @media screen and (max-width: 480px) {
    font-size: 0.875rem;
  }
}
</style>
