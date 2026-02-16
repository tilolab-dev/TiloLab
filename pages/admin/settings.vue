<template>
  <div class="settings">
    <div class="admin_layout_container">
      <div class="title_page">
        <h1>Налаштування</h1>
      </div>

      <div class="settings_wrapper">
        <div class="settings_item">
          <div class="item_head">
            <strong>Керування головним модальним вікном:</strong>
          </div>
          <div class="item_body"></div>
        </div>
        <div class="settings_item">
          <div class="item_head">
            <strong>Керування блоком "НОВИНИ":</strong>
          </div>
          <div class="item_body"></div>
        </div>
        <div class="settings_item">
          <div class="item_head">
            <strong>Керування группою "ВАМ МОЖЕ СПОДОБАТИСЬ":</strong>
          </div>
          <div class="item_body">
            <!-- <div class="middle_section">
              <button>Додати товар</button>
            </div> -->
            <div class="content_section">
              <div class="div">Товари в категоріʼї:</div>
              <div class="list_wrapper">
                <div v-for="item in adminStore.promotedList" :key="item.id" class="list_item">
                  <div class="list_item_head">
                    <div class="button_wrapper">
                      <button
                        @click="
                          modalStore.showModal('RemovePromo', {
                            product: item.product,
                            listName: 'promoted'
                          })
                        "
                      >
                        <CloseIcon />
                      </button>
                    </div>

                    <div class="img_wrapper">
                      <img :src="item.product.img[0].path" alt="product" />
                    </div>
                  </div>
                  <div class="item_name">
                    {{ item.product.translations[0].title }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="settings_item">
          <div class="item_head">
            <strong>Керування группою "З ЦИМ ТОВАРОМ КУПУЮТЬ":</strong>
          </div>
          <div class="item_body">
            <!-- <div class="middle_section">
              <button>Додати товар</button>
            </div> -->
            <div class="content_section">
              <div class="div">Товари в категоріʼї:</div>
              <div class="list_wrapper">
                <div v-for="item in adminStore.popularList" :key="item.id" class="list_item">
                  <div class="list_item_head">
                    <div class="button_wrapper">
                      <button
                        @click="
                          modalStore.showModal('RemovePromo', {
                            product: item.product,
                            listName: 'popular'
                          })
                        "
                      >
                        <CloseIcon />
                      </button>
                    </div>

                    <div class="img_wrapper">
                      <img :src="item.product.img[0].path" alt="product" />
                    </div>
                  </div>
                  <div class="item_name">
                    {{ item.product.translations[0].title }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="settings_item">
          <div class="item_head">
            <strong>Керування блоком "ОПИТУВАННЯ":</strong>
          </div>
          <div class="item_body"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import CloseIcon from "@/assets/icons/close-icon.svg";
import { ref, onMounted } from "vue";
import { useAdminStore } from "@/store/admin-store";
import { useModalStore } from "@/store/modal-store";

const loaderState = ref(false);

const adminStore = useAdminStore();
const modalStore = useModalStore();

console.log(loaderState);

onMounted(async () => {
  loaderState.value = true;

  try {
    await Promise.all([adminStore.getPopularList(), adminStore.getPromotedList()]);
  } finally {
    loaderState.value = false;
  }
});

definePageMeta({
  layout: "admin"
});
</script>

<style lang="scss" scoped>
@use "@/style/mixins.scss" as mixins;
.settings {
  width: 100%;
  height: 100%;
  position: relative;

  .admin_layout_container {
    width: 95%;
    height: 100%;
    margin: 0 auto;
  }
  .title_page {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 40px 0 20px;
    h1 {
      @include mixins.titleText;
    }
  }

  .settings_wrapper {
    width: 100%;
    height: calc(100vh - 15%);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    backdrop-filter: blur(10px);
    padding: 20px 10px 80px;
    background: rgba(255, 255, 255, 0.03);
    overflow-y: scroll;
    gap: 8px;
  }

  &_item {
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(10px);
    // min-height: 100px;
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    position: relative;
    border: 1px solid rgba(255, 255, 255, 0.075);
    border-radius: 5px;
    // overflow: hidden;
    flex: 1 1 auto;

    .item_head {
      width: 100%;
      height: auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid var(--accent-grey);
      padding: 10px 15px;

      strong {
        @include mixins.mainText;
        font-size: 1rem;
      }
    }

    .item_body {
      width: 100%;
      height: auto;
      position: relative;
      padding: 20px 15px 15px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      gap: 20px;
    }

    .middle_section {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      width: 100%;
      height: auto;

      button {
        @include mixins.accentBtn;
        padding: 5px 10px;
        font-size: 0.75rem;
      }
    }
    .content_section {
      width: 100%;
      height: auto;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      gap: 20px;
    }
    .list_wrapper {
      width: 100%;
      height: auto;
      display: flex;
      align-items: stretch;
      justify-content: flex-start;
      gap: 10px;
    }
    .list_item {
      width: 150px;
      height: auto;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
      gap: 10px;
    }
    .list_item_head {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
      justify-content: flex-start;
      gap: 5px;
    }
    .button_wrapper {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      width: 100%;
      height: auto;

      button {
        position: relative;
        display: flex;
        justify-content: center;
        background: var(--error-bg);
        border-radius: 5px;
        border: 1px solid var(--error-border);
        align-items: center;
        padding: 4px;
        cursor: pointer;
        width: 20px;
        height: 20px;
      }

      svg {
        width: 100%;
        height: 100%;
        stroke: white;
      }
    }
    .img_wrapper {
      width: 150px;
      height: 150px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
      gap: 10px;
      &_head {
        width: 100%;
        height: auto;
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }

      .item_img {
        width: 150px;
        height: 150px;
        aspect-ratio: 1 / 1;
        display: flex;
        justify-content: center;
        position: relative;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .item_name {
      width: 100%;
      height: auto;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      @include mixins.mainText;
      font-size: 0.8rem;
    }
  }
}
</style>
