<template>
  <section class="index_hero" :style="{ height: `calc(100vh - ${headerHeightValue}px)` }">
    <!-- <NuxtImg
      ref="imgRef"
      src="/images/index-img/hero.webp"
      class="hero_img"
      quality="80"
      width="1200"
      height="600"
      alt="hero"
      style="transform: scale(1.15); opacity: 0.7"
      priority
      sizes="(max-width: 480px) 480px, (max-width: 1024px) 1024px, 1200px"
    /> -->

    <video
      ref="videoRef"
      src="https://pub-0a8d6c93bd2743669515202d259de491.r2.dev/output.mp4"
      class="hero_video"
      autoplay
      muted
      loop
      playsinline
      width="1200"
      height="600"
      style="transform: scale(1.15); opacity: 0.7"
      @loadeddata="onVideoLoaded"
    />

    <div class="hero_overlay"></div>

    <!-- <div class="container"> -->
    <div class="hero_content_wrapper">
      <div ref="contentRef" class="hero_content">
        <div class="text_wrapper">
          <h1 class="main_text">
            Секс-девайси про ніжність <br />
            до тіла, а не про сором.
          </h1>
        </div>

        <div class="link_wrapper">
          <NuxtLink to="/products?page=1&category" class="hero_btn">
            <SharedAccentBtn class="hero_btn"> Обрати девайс </SharedAccentBtn>
          </NuxtLink>
        </div>
      </div>
    </div>

    <div class="toggle_sound_wrapper">
      <button @click="soundMuteHandler">
        <PlaySoundIcon v-if="muteState" />
        <MuteSoundIcon v-else />
      </button>
    </div>

    <!-- </div> -->
  </section>
</template>

<script setup>
// ICONS

import PlaySoundIcon from "@/assets/icons/play-sound.svg";
import MuteSoundIcon from "@/assets/icons/mute-sound.svg";

import { ref, onMounted, nextTick } from "vue";

const videoRef = ref(null);
const contentRef = ref(null);
const headerHeightValue = ref(0);
const muteState = ref(true);

const soundMuteHandler = () => {
  if (videoRef.value) {
    videoRef.value.muted = !videoRef.value.muted;
    muteState.value = videoRef.value.muted;
  }
};

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
  const { gsap } = await import("gsap");
  await nextTick();

  const mobileDevice = window.innerWidth <= 768;

  if (!mobileDevice) {
    const headerHeight = document.getElementsByClassName("header").item(0)?.offsetHeight || 0;
    console.log("Header element:", headerHeight);
    headerHeightValue.value = headerHeight;

    console.log("Header height:", headerHeightValue.value);
  }

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

  const tl = gsap.timeline({ defaults: { ease: "back.out(1.1)" } });
  const videoEl = videoRef.value;

  if (!videoEl) return;

  tl.to(videoEl, {
    scale: 1,
    opacity: 1,
    duration: 1.8,
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
  overflow: hidden;
  position: relative;

  padding: 80px 0 140px;

  .hero_video {
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
    // height: auto;
    max-height: 100vh;
    // padding-block: 237px;
  }
  @media screen and (max-width: 768px) {
    max-height: 70vh;

    // padding-block: 366px;
  }
  @media screen and (max-width: 480px) {
    max-height: 60vh;

    // padding-block: 234px;
  }
  @media screen and (max-width: 375px) {
    // padding-block: 125px;
  }
}

.hero_content_wrapper {
  position: absolute;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  top: 0;
  left: 0;
}

.hero_content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2vw;
  padding-bottom: 5vw;
  // justify-content: center;
  justify-content: space-between;
  position: relative;
  width: 100%;
  height: auto;
  gap: 2rem;
  z-index: 3;

  .text_wrapper,
  .link_wrapper {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  // .link_wrapper {
  //   justify-content: flex-end;
  // }
}

.toggle_sound_wrapper {
  width: 100%;
  height: -webkit-fill-available;
  position: absolute;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  padding-right: 3vw;
  padding-bottom: 5vw;
  top: 0;
  left: 0;

  button {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: rgb(36, 14, 24);
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid var(--border-color);
    z-index: 5;
    // padding: 10px;
    cursor: pointer;
    svg {
      width: 25px;
      height: 25px;
    }
  }

  @media screen and (max-width: 480px) {
    padding-top: 5vw;
    align-items: flex-start;
  }
}

.main_text {
  color: var(--text-color);
  font-size: 2.5rem;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: 0.8;
  text-transform: uppercase;
  text-align: center;

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
