<template>
  <section class="index_hero">
    <NuxtImg
      ref="imgRef"
      src="/images/index-img/hero.webp"
      class="hero_img"
      quality="80"
      width="1200"
      height="600"
      alt="hero"
      style="transform: scale(1.15); opacity: 0.7"
      priority
      lazy
      sizes="(max-width: 480px) 480px, (max-width: 1024px) 1024px, 1200px"
    />

    <div class="hero_overlay"></div>

    <div class="container">
      <div ref="contentRef" class="hero_content">
        <h1 class="main_text">
          Секс-девайси про ніжність <br />
          до тіла, а не про сором.
        </h1>

        <SharedAccentBtn class="hero_btn"> Обрати девайс </SharedAccentBtn>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";

const imgRef = ref(null);
const contentRef = ref(null);

onMounted(async () => {
  const { gsap } = await import("gsap");
  await nextTick();
  const tl = gsap.timeline({ defaults: { ease: "back.out(1.1)" } });
  // const el = imgRef.value;
  const imgEl = imgRef.value.imgEl;

  // console.log(imgEl);

  if (!imgEl) return;

  tl.to(imgEl, {
    scale: 1,
    opacity: 1,
    duration: 1.8,
    // ease: "back.out(1.2)" ,
    ease: "power4.out"
  });

  const contentEls = contentRef.value.querySelectorAll(".main_text, .hero_btn");

  contentEls.forEach((el) => {
    el.style.opacity = 0;
    el.style.transform = "translateY(30px)";
  });

  gsap.to(contentEls, {
    y: 0,
    opacity: 1,
    stagger: 0.2,
    duration: 0.8,
    delay: 0.5,
    ease: "power4.out"
  });
});
</script>

<style lang="scss" scoped>
.index_hero {
  width: 100%;
  height: 100vh;
  // background:
  //   linear-gradient(0deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.5) 100%),
  //   url("../public/images/index-img/hero.webp") lightgray 50% / cover no-repeat;
  position: relative;

  .hero_img {
    position: absolute;
    will-change: transform;
    width: 100%;
    height: 100%;
    object-fit: cover;
    top: 0;
    left: 0;
    z-index: 1;
  }

  .hero_overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.3) 100%);
    z-index: 2;
  }

  @media screen and (max-width: 1024px) {
    height: auto;
    max-height: 100dvh;
    padding-block: 237px;
  }
  @media screen and (max-width: 768px) {
    padding-block: 366px;
  }
  @media screen and (max-width: 480px) {
    padding-block: 234px;
  }
  @media screen and (max-width: 375px) {
    padding-block: 125px;
  }
}

.hero_content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  position: relative;
  width: 100%;
  height: 100%;
  gap: 2rem;
  z-index: 3;
}

.main_text {
  color: var(--text-color);
  font-size: 2.5rem;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: 0.8;
  text-transform: uppercase;

  @media screen and (max-width: 1024px) {
    font-size: 2rem;
  }

  @media screen and (max-width: 768px) {
    font-size: clamp(1.5rem, 5vw, 2rem);
  }

  @media screen and (max-width: 480px) {
    font-size: 1.375rem;
  }

  @media screen and (max-width: 375px) {
    font-size: clamp(1rem, 5vw, 1.25rem);
  }
}
</style>
