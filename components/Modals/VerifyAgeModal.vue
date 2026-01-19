<template>
  <div class="verify_age_inner_overlay">
    <div ref="verifyAgeRef" class="verify_age_modal_content">
      <div class="verify_age">
        <div class="verify_age_top">
          <div class="verify_age_head">
            <h1>Верифікація віку</h1>
          </div>

          <div class="verify_age_content">
            <div>
              <p>Ви повинні бути старше 18 років</p>
            </div>
          </div>

          <div class="verify_age_bottom">
            <div class="verify_age_buttons">
              <button class="accent_btn" @click="confirmAge">Мені є 18 років</button>
              <button class="accent_btn" @click="exitSite">Ще ні</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useModalStore } from "@/store/modal-store";
import gsap from "gsap";
import { useCookie } from "nuxt/app";

const modalStore = useModalStore();
const verifyAgeRef = ref(null);

// Set age verification cookie when user confirms
const setAgeVerificationCookie = () => {
  const ageVerified = useCookie("age_verified", {
    default: () => false,
    maxAge: 60 * 60 * 24 * 30 // 30 days
  });
  ageVerified.value = true;
};

onMounted(() => {
  gsap.fromTo(
    verifyAgeRef.value,
    {
      x: "100%",
      opacity: 0
    },
    {
      x: "0%",
      opacity: 1,
      duration: 0.5,
      ease: "power3.out"
    }
  );
});

const closePopup = () => {
  gsap.to(verifyAgeRef.value, {
    x: "100%",
    opacity: 0,
    duration: 0.4,
    ease: "power3.in",
    onComplete: () => {
      modalStore.closeModal();
    }
  });
};

const confirmAge = () => {
  setAgeVerificationCookie();
  closePopup();
};

const exitSite = () => {
  window.location.href = "https://www.google.com";
};
</script>

<style scoped lang="scss">
.verify_age_inner_overlay {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.verify_age_modal_content {
  width: clamp(300px, 20vw, 400px);
  border: 1px solid #302029;
  background: var(--bg-color);
  padding: 20px;

  // min-height: 500px;
  max-height: 80vh;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;

  overflow: hidden;
}
.verify_age {
  color: var(--text-color);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  position: relative;
  width: 100%;
  height: 100%;
  gap: 1.5rem;
  flex: 1;

  &_top {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 0.5rem;
    width: 100%;
    height: 100%;
  }
}

.verify_age_head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: fit-content;
  padding-right: 20px;
  z-index: 1;

  h1 {
    font-size: 1rem;
    font-weight: 500;
    text-transform: uppercase;
  }

  button {
    color: white;
    transition: all ease 0.3s;
    cursor: pointer;
  }

  @media screen and (min-width: 1024px) {
    & button:hover {
      color: var(--accent-color);
      transition: all ease 0.3s;
    }
  }
}

.verify_age_content {
  display: block;
  width: 100%;
  height: fit-content;
  max-height: 55dvh;
  padding-bottom: 1rem;
  overflow-y: auto;
}

.verify_age_bottom {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  height: fit-content;
  gap: 1.5rem;
}

.verify_age_buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: fit-content;
  gap: 0.7rem;

  button,
  a {
    font-weight: 600;
    font-size: 0.8rem;
    padding-block: 10px;
    transition: all ease 0.3s;
    border: 1px solid transparent;
    border-radius: 5px;
    cursor: pointer;
    width: 100%;
    height: 100%;
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .accent_btn {
    background-color: var(--btn-color);
    border: 1px solid var(--border-color);

    @media screen and (min-width: 1024px) {
      &:hover {
        background-color: var(--btn-color-hover);
        transition: all ease 0.3s;
      }
    }
  }
  .verify_age_btn {
    @media screen and (min-width: 1024px) {
      &:hover {
        border: 1px solid var(--border-color);
        transition: all ease 0.3s;
      }
    }
  }
}
</style>
