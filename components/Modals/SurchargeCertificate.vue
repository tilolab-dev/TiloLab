<template>
  <div class="surcharge_inner_overlay" @click.self="modalStore.closeModal()">
    <Transition name="modal-pop" appear>
      <div class="surcharge">
        <div class="surcharge_content">
          <Transition name="fade">
            <div v-if="loaderState" class="loader_overlay">
              <SharedLoader />
            </div>
          </Transition>

          <button
            class="close_btn"
            type="button"
            aria-label="Закрити"
            @click="modalStore.closeModal()"
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                stroke-width="1.6"
                stroke-linecap="round"
              />
            </svg>
          </button>

          <div class="surcharge_icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 9v4M12 16.5h.01M10.29 3.86 1.82 18a1.5 1.5 0 0 0 1.29 2.25h17.78A1.5 1.5 0 0 0 22.18 18L13.71 3.86a1.5 1.5 0 0 0-2.42 0Z"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>

          <div class="surcharge_conetnt_head">Увага!</div>
          <div class="surcharge_content_text">
            Сумма товарів у кошику перевищує номінал сертифікату. Ви можете доплатити різницю, або
            оберіть товари на суму еквівалентну номіналу подарункового сертифікату.
          </div>

          <div class="surcharge_content_btns">
            <button class="agree_btn" @click="surchargeOrder">Доплатити різницю</button>
            <button class="cancel_btn" @click="modalStore.closeModal()">Скасувати</button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useModalStore } from "@/store/modal-store";
import { useCartStore } from "@/store/cart-store";

const loaderState = ref(false);

const modalStore = useModalStore();
const cartStore = useCartStore();

const surchargeOrder = async () => {
  try {
    loaderState.value = true;

    const surchargeRes = await $fetch("/api/monobank/surcharge-order", {
      method: "POST",
      body: {
        orderId: props.orderId,
        certificateCode: props.receivedCode
      }
    });

    console.log(surchargeRes, "surchargeRes");

    const pageUrl = surchargeRes.pageUrl;

    if (surchargeRes.statusCode === 200) {
      cartStore.clearCart();
      window.location.href = pageUrl;
      modalStore.closeModal();
    }
  } catch (err) {
    console.log(err);
  }
  loaderState.value = false;
};

const props = defineProps({
  orderId: {
    type: String,
    required: true
  },
  receivedCode: {
    type: String,
    required: true
  }
});

onMounted(() => {
  console.log(props);
});
</script>

<style lang="scss" scoped>
@use "@/style/mixins.scss" as mixins;

.surcharge_inner_overlay {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(3px);
}

.surcharge {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  @media screen and (max-width: 480px) {
    align-items: flex-start;
    margin-top: 10dvh;
  }
}

.surcharge_content {
  position: relative;
  background:
    linear-gradient(180deg, rgba(255, 169, 214, 0.06) 0%, rgba(255, 169, 214, 0) 40%),
    var(--bg-color);
  padding: 48px 56px 44px;
  border: 1px solid var(--border-color);
  border-radius: 18px;
  box-shadow:
    0 24px 60px -20px rgba(0, 0, 0, 0.65),
    0 0 0 1px rgba(255, 169, 214, 0.06),
    0 0 40px -10px rgba(255, 169, 214, 0.18);
  color: var(--text-color);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: clamp(300px, 60vw, 620px);
  height: auto;
  gap: 24px;

  .loader_overlay {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(13, 12, 13, 0.6);
    backdrop-filter: blur(6px);
    border-radius: inherit;
    z-index: 2;
  }

  .close_btn {
    position: absolute;
    top: 18px;
    right: 18px;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: transparent;
    border: 1px solid transparent;
    color: var(--dark-text);
    cursor: pointer;
    transition: all ease 0.25s;

    svg {
      width: 16px;
      height: 16px;
    }

    @media screen and (min-width: 1024px) {
      &:hover {
        color: var(--text-color);
        border-color: var(--border-color);
        background: rgba(255, 169, 214, 0.08);
      }
    }

    @media screen and (max-width: 480px) {
      top: 12px;
      right: 12px;
      width: 28px;
      height: 28px;
    }
  }

  .surcharge_icon {
    width: 52px;
    height: 52px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: var(--warning-bg);
    border: 1px solid var(--warning-border);
    color: var(--warning-text);
    flex-shrink: 0;

    svg {
      width: 26px;
      height: 26px;
    }

    @media screen and (max-width: 480px) {
      width: 44px;
      height: 44px;
      svg {
        width: 22px;
        height: 22px;
      }
    }
  }

  &_conetnt_head {
    @include mixins.titleText;
    font-size: 1.5rem;
    letter-spacing: 0.4px;

    @media screen and (max-width: 480px) {
      font-size: 1.25rem;
    }
  }

  &_text {
    @include mixins.subtitleText;
    font-weight: 500;
    color: var(--text-grey);
    font-size: 1.0625rem;
    width: 100%;
    height: auto;
    line-height: 1.6;
    @media screen and (max-width: 1024px) {
      font-size: 1rem;
    }
    @media screen and (max-width: 480px) {
      font-size: 0.875rem;
    }
    @media screen and (max-width: 375px) {
      font-size: 0.8125rem;
    }
  }

  &_btns {
    @include mixins.mainText;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: auto;
    gap: 16px;
    margin-top: 8px;

    button {
      flex: 1;
      white-space: nowrap;
    }

    .agree_btn {
      @include mixins.accentBtn;
      width: 100%;
    }

    .cancel_btn {
      @include mixins.transparentBtn;
      border: 1px solid var(--dark-text);
      color: var(--text-grey);

      @media screen and (min-width: 1024px) {
        &:hover {
          border: 1px solid var(--border-color);
          color: var(--text-color);
        }
      }
    }

    @media screen and (max-width: 1024px) {
      font-size: 1.0625rem;
    }
    @media screen and (max-width: 768px) {
      flex-direction: column-reverse;
      width: 100%;
      height: auto;
      gap: 12px;
    }
    @media screen and (max-width: 480px) {
      font-size: 0.875rem;
    }
    @media screen and (max-width: 375px) {
      font-size: 0.75rem;
    }
  }

  @media screen and (max-width: 1024px) {
    padding: 40px 44px 36px;
    width: clamp(300px, 90vw, 620px);
  }

  @media screen and (max-width: 768px) {
    padding: 32px 32px 28px;
  }

  @media screen and (max-width: 480px) {
    padding: 24px 20px 20px;
    border-radius: 14px;
    gap: 18px;
  }
  @media screen and (max-width: 375px) {
    padding: 22px 16px 18px;
  }
}

.logout_btn {
  cursor: pointer;
  transition: all ease 0.3s;
  color: var(--text-color);
  @media screen and (min-width: 1024px) {
    &:hover {
      transition: all ease 0.3s;
      color: var(--accent-color);
    }
  }
}

// entrance / exit animation for the modal card
.modal-pop-enter-active {
  transition:
    opacity 0.25s ease,
    transform 0.28s cubic-bezier(0.16, 1, 0.3, 1);
}
.modal-pop-leave-active {
  transition:
    opacity 0.18s ease,
    transform 0.18s ease;
}
.modal-pop-enter-from {
  opacity: 0;
  transform: translateY(12px) scale(0.96);
}
.modal-pop-leave-to {
  opacity: 0;
  transform: translateY(8px) scale(0.98);
}

// loader crossfade
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .modal-pop-enter-active,
  .modal-pop-leave-active,
  .close_btn {
    transition: none !important;
  }
  .modal-pop-enter-from,
  .modal-pop-leave-to {
    transform: none;
  }
}
</style>
