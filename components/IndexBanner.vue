<template>
  <section class="index_banner">
    <!-- <NuxtImg
      src="/images/index-img/banner.webp"
      placeholder="/images/fallback-img.webp"
      error="/images/fallback-img.webp"
      class="banner_img"
      quality="80"
      width="1200"
      height="600"
      alt="banner"
      lazy
      sizes="(max-width: 480px) 480px, (max-width: 1024px) 1024px, 1200px"
    /> -->
    <!-- ref="imgRef" -->

    <video
      ref="videoRef"
      src="https://pub-0a8d6c93bd2743669515202d259de491.r2.dev/certificates.mp4"
      class="banner_video"
      autoplay
      muted
      loop
      playsinline
      width="1200"
      height="600"
      @loadeddata="onVideoLoaded"
    />

    <!-- style="transform: scale(1.15); opacity: 0.7" -->

    <div class="banner_overlay"></div>
    <div class="banner_wrapper">
      <div class="banner_content">
        <p ref="textRef1" class="banner_text">Сертифікат дає можливість</p>
        <p ref="textRef2" class="banner_text">самостійно вибрати те що принесе</p>
        <strong ref="accentRef" class="banner_accent">максимум задоволення</strong>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const videoRef = ref(null);

const textRef1 = ref(null);
const textRef2 = ref(null);
const accentRef = ref(null);

const onVideoLoaded = () => {
  // Attempt to play video with user interaction fallback for iOS
  const playVideo = async () => {
    try {
      if (videoRef.value) {
        await videoRef.value.play();
      }
    } catch {
      // Autoplay prevented, waiting for user interaction
      // Fallback: add click listener to start video on first user interaction
      document.addEventListener("click", playVideo, { once: true });
    }
  };

  playVideo();
};

onMounted(async () => {
  await nextTick();

  // Wait for video to be ready
  const waitForVideo = () => {
    return new Promise((resolve) => {
      if (videoRef.value && videoRef.value.readyState >= 2) {
        resolve();
      } else {
        videoRef.value?.addEventListener("loadeddata", resolve, { once: true });
      }
    });
  };

  await waitForVideo();

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".banner_content",
      start: "top 35%",
      once: true
    }
  });

  tl.from([textRef1.value, textRef2.value, accentRef.value], {
    y: 80,
    opacity: 0,
    duration: 0.8,
    stagger: 0.25,
    ease: "power3.out"
  });
});
</script>

<style lang="scss">
@use "@/style/mixins.scss" as mixins;

.index_banner {
  width: 100%;
  height: auto;
  position: relative;
  padding-block: 352px;
  min-height: 350px;

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

.banner_img,
.banner_video {
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
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 0, 0, 0.25) 45%,
    rgba(0, 0, 0, 0) 100%
  );
  z-index: 2;
}

.banner_wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding-bottom: 50px;
  position: absolute;
  inset: 0;
}

.banner_content {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 3;
}

.banner_text {
  @include mixins.titleText;
  font-weight: 600;

  @media screen and (max-width: 768px) {
    font-size: clamp(0.75rem, 3vw, 1.5rem);
  }
}

.banner_accent {
  @include mixins.titleText;
  text-transform: uppercase;
  color: var(--btn-color-active);
  font-weight: 600;

  @media screen and (max-width: 768px) {
    font-size: clamp(0.75rem, 3vw, 1.5rem);
  }
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
