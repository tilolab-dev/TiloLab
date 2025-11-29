<template>
  <div class="layout relative">
    <AppHeader />
    <StickyHeader />
    <MobileMenu />
    <DashBurger class="absolute right-12" @click="mobileCategory()"/>

    <main>
      <div class="section page products-section">
        <div class="product-container">
          <LinkBlock pageName="Товари" />
          <div class="page-title border-b-[1px] border-[#d9dbe0] border-[var(--dark-border-color)] py-2">
            <h1 class="text-[var(--dark-color)] font-bold text-2xl mb-5">
              {{ $t("products-page.title") }}
            </h1>
            <p class="text-[var(--dark-color)] dark:text-[var(--dark-font-color)] font-medium text-lg mb-2">
              {{ $t("products-page.description") }}
            </p>
          </div>
        </div>
        <!-- <div class="mobile-bar">
          <ul>
            <li @click="showCategory('showAll')">
              <span> Всі товари </span>
            </li>
            <li
              @click="
                showMobileCategory('mobileBags'), showCategory('empty-bags')
              "
              class="flex justify-between items-center gap-4"
            >
              <span class="flex-1"> Пакети майка </span>
              <div class="flex-1">
                <SvgIcon
                  name="arrow-down"
                  size="micro"
                  fill="var(--dark-color)"
                />
              </div>
            </li>
            <li>
              <span> Пакети для сміття </span>
            </li>
            <li
              @click="showMobileCategory('mobilePackages')"
              class="flex justify-between items-center gap-4"
            >
              <span class="flex-1"> Пакети фасувальні </span>
              <div class="flex-1">
                <SvgIcon
                  name="arrow-down"
                  size="micro"
                  fill="var(--dark-color)"
                />
              </div>
            </li>
            <li>
              <span> Пакети ZipLock </span>
            </li>
            <li>
              <span> Мішки </span>
            </li>
            <li>
              <span> Стрейтч плівка </span>
            </li>
            <li>
              <span> Рукавички </span>
            </li>
          </ul>
          <ul v-if="mobileBags">
            <li @click="showCategory('big-bag')">
              <span> Багажна серія </span>
            </li>
            <li @click="showCategory('bio-bag')">
              <span> Біопакети </span>
            </li>
            <li @click="showCategory('img-bag')">
              <span> З малюнком </span>
            </li>
            <li @click="showCategory('noImg-bag')">
              <span> Без малюнка </span>
            </li>
          </ul>
          <ul v-if="mobilePackages">
            <li @click="showCategory('packaging-block')">
              <span> Пакети фасувальні в блоці </span>
            </li>
            <li @click="showCategory('packaging-roll')">
              <span> Пакети фасувальні в рулоні </span>
            </li>
          </ul>
        </div> -->
      </div>
      <section
        class="products-main grid grid-cols-[1fr_3fr] gap-5 w-[92vw] mx-auto"
      >
        <!-- SIDEBAR -->
        <div 
          class="categories border-r-[1px] border-[#d9dbe0] dark:border-[var(--dark-border-color)] pr-4 py-2"
          :class="{'active-mobile-categories': mobileCategoryState}"
        >
          <ul class="mt-5 main-list">
            <li class=""
              @click="showCategory('showAll'); mobileCategory()"

            >
              <div class="icon">
                <img src="/public/img/icons/products.png" alt="products" />
              </div>
              <!-- @click="showCategory('showAll')" -->

              <span 
                class="text-[var(--dark-color)] dark:text-[var(--dark-font-color)] font-medium text-lg"
              >Всі товари</span>
            </li>
            <li>
              <div class="icon">
                <img
                  src="/public/img/icons/product-category.png"
                  alt="products"
                />
              </div>
              <span
                class="text-[var(--dark-color)] dark:text-[var(--dark-font-color)] font-medium text-lg"
              >Категорії товарів</span>
              <SvgIcon name="arrow-right" size="micro" fill="red" />
            </li>
            <li v-for="(category, index) in fetchedAllCategories" :key="index"
              @click="mobileCategory()"
            >
              <NuxtLink
                :to="`/products/${category.group
                  .replaceAll(' ', '-')
                  .toLowerCase()}`"
                class="flex justify-start gap-2 items-center"
              >
                <div class="icon">
                  <img :src="category.categoryImg" alt="icon" />
                </div>
                <span
                  class="text-[var(--dark-color)] dark:text-[var(--dark-font-color)] font-medium text-lg"
                >{{
                  category.translations.find(
                    (tr) => tr.language === $i18n.locale
                  ).title
                }}</span>
              </NuxtLink>
            </li>
            <!-- <ul class="sub-list ml-3 " v-show="categories">
                        <li @click="showCategory('empty-bags')">
                        <div class="icon">
                            <img src="/public/icon-pack/bag-icons/small-bag.png" alt="bag" />
                        </div>
                        <span>Пакети майка</span>
                        </li>
                        <ul class="third-list ml-3">
                        <li @click="showCategory('big-bag')">
                            <div class="icon">
                            <img src="@/public/icon-pack/bag-icons/big-bag.png" alt="bag" />
                            </div>
                            <span>Багажна серія</span>
                        </li>
                        <li @click="showCategory('bio-bag')">
                            <div class="icon">
                            <img src="@/public/icon-pack/bag-icons/bio-bag.png" alt="bag" />
                            </div>
                            <span>Біопакети</span>
                        </li>
                        <li @click="showCategory('img-bag')">
                            <div class="icon">
                            <img src="/public/icon-pack/bag-icons/img-bag.png" alt="bag" />
                            </div>
                            <span>З малюнком</span>
                        </li>
                        <li @click="showCategory('noImg-bag')">
                            <div class="icon">
                            <img src="/public/icon-pack/bag-icons/emptybag.png" alt="bag" />
                            </div>
                            <span>Без малюнка</span>
                        </li>
                        </ul>
                        <li @click="showCategory('trash-bags')">
                        <div class="icon">
                            <img src="/public/icon-pack/bag-icons/trash-bag.png" alt="bag" />
                        </div>
                        <span>Пакети для сміття</span>
                        </li>
                        <li @click="showCategory('index-packaging')">
                        <div class="icon">
                            <img src="/public/icon-pack/bag-icons/cute-bag.png" alt="bag" />
                        </div>
                        <span>Пакети фасувальні</span>
                        </li>
                        <ul class="third-list ml-3">
                        <li @click="showCategory('packaging-roll')">
                            <div class="icon">
                            <img src="/public/icon-pack/bag-icons/roll.png" alt="bag" />
                            </div>
                            <span>Пакети фасувальні в рулоні</span>
                        </li>
                        <li @click="showCategory('packaging-block')">
                            <div class="icon">
                            <img src="/public/icon-pack/bag-icons/block.png" alt="bag" />
                            </div>
                            <span>Пакети фасувальні в блоці</span>
                        </li>
                        </ul>
                        <li @click="showCategory('zip-bags')">
                        <div class="icon">
                            <img src="/public/icon-pack/bag-icons/zip.png" style="padding: 2px;" alt="bag" />
                        </div>
                        <span>Пакети ZipLock</span>
                        </li>
                        <li @click="showCategory('large-bags')">
                        <div class="icon">
                            <img src="/public/icon-pack/bag-icons/bag.png" alt="bag" />
                        </div>
                        <span>Мішки </span>
                        </li>
                        <li @click="showCategory('stratch-roll')">
                        <div class="icon">
                            <img
                            src="/public/icon-pack/bag-icons/stratch.png"
                            style="border-radius: 50%; border: none;"
                            alt="stratch"
                            />
                        </div>
                        <span>Стрейтч плівка</span>
                        </li>
                        <li @click="showCategory('gloves')">
                        <div class="icon">
                            <img src="/public/icon-pack/bag-icons/gloves.png" alt="stratch" />
                        </div>
                        <span>Рукавички</span>
                        </li>
                    </ul> -->
            <!-- <li @click="listControl(1)">
              <div class="icon">
                <img src="/public/img/icons/filters.png" alt="filters" />
              </div>
              <span>Фільтри</span>
              <SvgIcon name="arrow-right" size="micro" fill="red" />
            </li> -->
            <!-- <ul class="sub-list ml-5" v-show="filters">
              <li>
                <span>Фільтр</span>
              </li>
              <li>
                <span>Фільтр</span>
              </li>
              <li>
                <span>Фільтр</span>
              </li>
            </ul> -->
            <!-- <li @click="listControl(2)">
              <div class="icon">
                <img src="/public/img/icons/search-color.png" alt="search" />
              </div>
              <span>Пошук</span>
              <SvgIcon name="arrow-right" size="micro" fill="red" />
            </li>
            <ul class="sub-list ml-5" v-show="search">
              <li>
                <input type="text" placeholder="Пошук" />
              </li>
            </ul> -->
          </ul>
        </div>

        <!--MAIN -->
        <div class="products-wrapper flex flex-col">
          <slot />
          <KorzinkaBg />
        </div>

      </section>
    </main>
    <Modal>
      <template #default="{ openModal, closeModal }">
        <component
          :is="currentModal"
          v-bind="modalProps"
          :openModal="openModal"
          :closeModal="closeModal"
        />
      </template>
    </Modal>
    <AppFooter />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

import { useModalStore, useIndexStore } from "#imports";

import Modal from "@/components/Modals/Modal.vue";
import LinkBlock from "@/components/shared/LinkBlock.vue";
import SvgIcon from "@/components/shared/SvgIcon.vue";
import KorzinkaBg from "@/components/KorzinkaBg.vue";
import ItemCard from "@/components/ItemCard.vue";
import DashBurger from "~/components/shared/DashBurger.vue";

const modalStore = useModalStore();
const indexStore = useIndexStore();
const currentModal = computed(() => modalStore.currentModal);
const modalProps = computed(() => modalStore.modalProps);

const fetchedProducts = ref([]);

const fetchedAllCategories = ref([]);

const fetchCategory = computed(() => indexStore.fetchedCategories);
fetchedAllCategories.value = fetchCategory.value;

const categories = ref(true);
const filters = ref(true);
const search = ref(true);

const mobileBags = ref(false);
const mobilePackages = ref(false);

const mobileCategoryState = ref(false);

const mobileCategory = () => {
  mobileCategoryState.value = !mobileCategoryState.value;

}

let activeCategory = ref([]);

const showCategory = (category) => {
  if (category === "showAll") {
    activeCategory.value = [];
  } else {
    activeCategory.value = listProducts.reduce((acc, item) => {
      if (item.group === category) {
        acc.push(item);
      }

      if (item.groupProducts) {
        const matchingGroups = item.groupProducts.filter(
          (group) => group.group === category
        );
        matchingGroups.forEach((group) => acc.push(group));
      }

      return acc;
    }, []);
  }
};

const showMobileCategory = (category) => {
  switch (category) {
    case "mobileBags":
      if (mobileBags.value) {
        mobileBags.value = false;
        return;
      } else {
        mobilePackages.value = false;
        mobileBags.value = true;
      }
      break;
    case "mobilePackages":
      if (mobilePackages.value) {
        mobilePackages.value = false;
        return;
      } else {
        mobileBags.value = false;
        mobilePackages.value = true;
      }
      break;
  }
};

onMounted(() => {
  showCategory("showAll");
});
</script>

<style lang="scss" scoped>
@use ".//styles/mixins.scss" as mixins;

@include mixins.mobileBar(1024px);
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
main {
  flex: 1;
}

.products-section {
  font-family: "Montserrat", sans-serif;
}
.products-main {
  @media screen and (max-width: 600px) {
    width: 98vw;
  }
}
.product-container {
  width: 92vw;
  margin: 0 auto;
  padding-top: 20px;
}
.page-title {
  p {
    font-size: clamp(0.7rem, 2vw, 1.5rem);
    @media screen and (max-width: 550px) {
      display: none;
    }
  }
}
.icon {
  width: 40px;
  height: 40px;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--dark-color);
  border: 1px solid white;
  border-radius: 25%;
  position: relative;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2),
     -5px -5px 10px rgba(255, 255, 255, 0.2); 

  img {
    width: 100%;
    height: 100%;
    margin: 10px;
    padding: 7px;
    border: 1px solid white;
    border-radius: 25%;
  }
}
ul {
  display: flex;
  flex-direction: column;
  gap: 5px;
  // align-items: stretch;
  li {
    display: flex;
    align-items: center;
    justify-content: flex-start;

    cursor: pointer;
    border-radius: 10px;
    padding: 5px 10px;
    transition: all ease 0.3s;
    position: relative;
    span {
      color: var(--dark-color);
      font-weight: 500;
      font-size: clamp(12px, 1vw, 16px);
      white-space: nowrap;
    }
    svg {
      position: absolute;
      top: 50%;
      right: 0;
      transform: translate(-50%, -50%);
    }
  }
  @media screen and (min-width: 1024px) {
    li:hover {
      background: var(--secondary-color);
      transition: all ease 0.3s;
      span {
        font-weight: 600;
      }
    }
  }
}

.card-wrapper {
  box-shadow: 20px 20px 60px #bebebe, -20px -20px 60px #ffffff;
}
.cards-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 10px;

  .card-wrapper {
    width: calc(50% - 5px);
    @media screen and (max-width: 1024px) {
      width: calc(33.3% - 7px);
    }
    @media screen and (max-width: 764px) {
      width: calc(50% - 5px);
    }
    @media screen and (max-width: 375px) {
      width: 100%;
    }
  }
}

.dark .layout{
  background-color: var(--dark-component-color);
}


@media screen and (max-width: 768px) {

.page-title, .mobile-bar{
  display: none;
}

}

.dash-burger{
  @media screen and (min-width: 1024px) {
    &{
      display: none;
    }
  }
  @media screen and (max-width: 1024px) {
    &{
      top: 155px;
    }
  }
  @media screen and (max-width: 768px) {
    &{
      top: 80px;
    }
  }
}



@media screen and (max-width: 1024px) {
  .categories{
    position: fixed;
    left: -50%;
    top: 50%;
    transform: translate(0, -50%);
    height: 95vh;
    width: 50%;
    background-color: var(--dark-grey);
    z-index: 100;
    border-radius: 20px;
    overflow: scroll;
    transition: all ease 0.3s;

  }
  .active-mobile-categories{
    left: 0;
    transition: all ease 0.3s;
  }
}
</style>
