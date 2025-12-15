<template>
  <div class="layout relative">
    <!-- <AppHeader /> -->
    <StickyHeader />
    <!-- <MobileMenu /> -->
    <!-- <DashBurger class="absolute right-12" @click="mobileCategory()"/> -->

    <main class="main_content">
      <div class="container">
        <div class="product-head">
          <BreadCrumbs />
        </div>

        <div class="filter_category">
          <div class="filter">
            RANGE SLIDER
          </div>
          <div class="category">
            Категорія
            <SvgIcon name="arrow-down" size="micro" /> 
          </div>
        </div>
        <!--MAIN -->
        <div class="products-wrapper ">
          <slot />
        </div>


      </div>
      
 
     
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


import { useModalStore } from "@/store/modal-store";
import { useIndexStore } from "@/store/index-store";


import Modal from "@/components/Modals/Modal.vue";
import BreadCrumbs from "@/components/shared/BreadCrumbs.vue";
import SvgIcon from "@/components/shared/SvgIcon.vue";


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
// @use ".//styles/mixins.scss" as mixins;

// @include mixins.mobileBar(1024px);
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
  background: var(--bg-color);

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

.filter_category {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 0 1rem;
  color: white;

  .category {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    cursor: pointer;
    font-size: 1.2rem;
    font-weight: 500;
  }
}


</style>
