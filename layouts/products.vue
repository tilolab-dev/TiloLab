<template>
  <div class="layout relative">
    <!-- <AppHeader /> -->
    <!-- <StickyHeader /> -->
    <!-- <MobileMenu /> -->
    <!-- <DashBurger class="absolute right-12" @click="mobileCategory()"/> -->

    <main class="main_content">
        <div class="product-head">
          <BreadCrumbs pageName="Товари" />
          <div class="page-title ">
            <h1>

                Товари
            </h1>
            <p>

                 Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium eius commodi officiis vel cumque incidunt praesentium quibusdam, ex nesciunt fuga sunt? Voluptatibus consequatur earum rem atque quisquam similique saepe tempore.
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
      <section
        class="products_main"
      >
        <!-- SIDEBAR -->
        <div 
          class="sidebar "
          :class="{'active-mobile-categories': mobileCategoryState}"
        >
          <ul >
            <li class=""
              @click="showCategory('showAll'); mobileCategory()"

            >
              <div class="icon">
                <!-- <img src="/public/img/icons/products.png" alt="products" /> -->
              </div>
              <!-- @click="showCategory('showAll')" -->

              <span
                class="text-[var(--dark-color)] dark:text-[var(--dark-font-color)] font-medium text-lg"
              >Всі товари</span>
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
                <!-- <span
                  class="text-[var(--dark-color)] dark:text-[var(--dark-font-color)] font-medium text-lg"
                >{{
                  category.translations.find(
                    (tr) => tr.language === $i18n.locale
                  ).title
                }}</span> -->
              </NuxtLink>
            </li>

          </ul>
        </div>

        <!--MAIN -->
        <div class="products-wrapper ">
          <slot />
          <!-- <KorzinkaBg /> -->
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
    <!-- <AppFooter /> -->
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";


import { useModalStore } from "@/store/modal-store";


import Modal from "@/components/Modals/Modal.vue";
import BreadCrumbs from "@/components/shared/BreadCrumbs.vue";
// import LinkBlock from "@/components/shared/LinkBlock.vue";
// import SvgIcon from "@/components/shared/SvgIcon.vue";
// import KorzinkaBg from "@/components/KorzinkaBg.vue";
// import ItemCard from "@/components/ItemCard.vue";
// import DashBurger from "~/components/shared/DashBurger.vue";

const modalStore = useModalStore();
// const indexStore = useIndexStore();
const currentModal = computed(() => modalStore.currentModal);
const modalProps = computed(() => modalStore.modalProps);

const fetchedProducts = ref([]);

const fetchedAllCategories = ref([]);

// const fetchCategory = computed(() => indexStore.fetchedCategories);
// fetchedAllCategories.value = fetchCategory.value;

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
// @use ".//styles/mixins.scss" as mixins;

// @include mixins.mobileBar(1024px);
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
}
.main_content {
  flex: 1;
  width: 95vw;
  height: 100%;
  margin: 0 auto;
  position: relative;
}

.product-head {
  width: 100%;
  padding-top: 20px;
}
.page-title {
  padding-block: 0.5rem;
  h1{
    margin-bottom: 20px;
    font-size: 2rem;
  }
  p {
    margin-bottom: 10px;
    font-size: clamp(0.7rem, 2vw, 1.5rem);
    @media screen and (max-width: 550px) {
      display: none;
    }
  }
}

.products_main{
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 1rem;

  .sidebar{

    padding-top: 2rem;
    padding-bottom: 2rem;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    @media (min-width: 768px) {
      padding-top: 2.5rem;
      padding-bottom: 2.5rem;
    }

    @media (max-width: 767px) {
      margin-top: 1.5rem;
    }

    border-right: 1px solid #d9dbe0;
    padding-right: 1rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;

    ul{
      margin-top: 1rem;
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

.products_wrapper{
  display: flex;
  flex-direction: column;
}

// .card-wrapper {
//   box-shadow: 20px 20px 60px #bebebe, -20px -20px 60px #ffffff;
// }
// .cards-content {
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: flex-start;
//   gap: 10px;

//   .card-wrapper {
//     width: calc(50% - 5px);
//     @media screen and (max-width: 1024px) {
//       width: calc(33.3% - 7px);
//     }
//     @media screen and (max-width: 764px) {
//       width: calc(50% - 5px);
//     }
//     @media screen and (max-width: 375px) {
//       width: 100%;
//     }
//   }
// }

// .dark .layout{
//   background-color: var(--dark-component-color);
// }


// @media screen and (max-width: 768px) {

// .page-title, .mobile-bar{
//   display: none;
// }

// }

// .dash-burger{
//   @media screen and (min-width: 1024px) {
//     &{
//       display: none;
//     }
//   }
//   @media screen and (max-width: 1024px) {
//     &{
//       top: 155px;
//     }
//   }
//   @media screen and (max-width: 768px) {
//     &{
//       top: 80px;
//     }
//   }
// }



// @media screen and (max-width: 1024px) {
//   .categories{
//     position: fixed;
//     left: -50%;
//     top: 50%;
//     transform: translate(0, -50%);
//     height: 95vh;
//     width: 50%;
//     background-color: var(--dark-grey);
//     z-index: 100;
//     border-radius: 20px;
//     overflow: scroll;
//     transition: all ease 0.3s;

//   }
//   .active-mobile-categories{
//     left: 0;
//     transition: all ease 0.3s;
//   }
// }
</style>
