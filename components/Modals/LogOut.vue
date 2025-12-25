<template>
  <div class="logout_inner_overlay" @click.self="modalStore.closeModal()">
    <div class="logout">
      <div class="logout_content">
        <p class="logout_content_text">
          Ви впевнені, що хочете вийти з аккаунту?
        </p>
        <div class="logout_content_btns">
          <button class="logout_btn" @click="modalStore.closeModal()">
            Так
          </button>
          <button class="logout_btn" @click="modalStore.closeModal()">
            Скасувати
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useModalStore } from "@/store/modal-store";

const modalStore = useModalStore();
</script>

<style lang="scss">
@use "@/style/mixins.scss" as mixins;
.logout_inner_overlay {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.logout {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.logout_content {
  background: var(--bg-color);
  padding: 40px 60px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--text-color);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;

  &_text {
    @include mixins.subtitleText;
    font-size: 1.25rem;
    @media screen and (max-width: 1024px) {
      font-size: 1.0625rem;
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
    gap: 50px;

    @media screen and (max-width: 1024px) {
      font-size: 1.0625rem;
    }
    @media screen and (max-width: 480px) {
      font-size: 0.875rem;
    }
    @media screen and (max-width: 375px) {
      font-size: 0.75rem;
    }
  }

  @media screen and (max-width: 1024px) {
    padding: 36px 52px;
  }

  @media screen and (max-width: 480px) {
    padding: 32px 52px;
  }
  @media screen and (max-width: 375px) {
    padding: 24px 18px;
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
</style>
