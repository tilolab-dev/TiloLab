<template>
  <div class="layout relative">
    <!-- <AppHeader /> -->
    <StickyHeader />
    <!-- <MobileMenu /> -->
    <!-- <DashBurger class="absolute right-12" @click="mobileCategory()"/> -->

    <main class="main_content">
      <div class="container">
        <div class="product-head">
          <BreadCrumbs :links="breadCrumbLinks" />
        </div>
        <!--MAIN -->
        <div class="products-wrapper">
          <slot />
        </div>
      </div>
    </main>
    <Modal>
      <template #default="{ openModal, closeModal }">
        <component
          :is="currentModal"
          v-bind="modalProps"
          :open-modal="openModal"
          :close-modal="closeModal"
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

const modalStore = useModalStore();
const indexStore = useIndexStore();
const currentModal = computed(() => modalStore.currentModal);
const modalProps = computed(() => modalStore.modalProps);

const fetchedAllCategories = ref([]);

const fetchCategory = computed(() => indexStore.fetchedCategories);
fetchedAllCategories.value = fetchCategory.value;

const route = useRoute();

const breadCrumbLinks = computed(() => {
  const links = [];
  const pathSegments = route.path.split("/").filter((segment) => segment);

  // Handle products pages
  if (route.path.startsWith("/products")) {
    // Add "Продукти" link
    links.push({ name: "Продукти", url: "/products" });

    // If we have a category
    if (pathSegments.length > 1) {
      const categoryId = pathSegments[1];
      const category = indexStore.fetchedCategories.find(
        (cat) => cat.group.toLowerCase() === categoryId.toLowerCase()
      );

      if (category) {
        links.push({
          name: category.translations[0]?.title || categoryId,
          url: `/products/${categoryId}`
        });
      }

      // If we have a product ID, add it as non-link (last item)
      if (pathSegments.length > 2) {
        const productId = pathSegments[2];
        // For product pages, we could fetch product name here if needed
        // For now, using the product ID
        links.push({
          name: productId,
          url: route.fullPath
        });
      }
    }
  }

  return links;
});

// const categories = ref(true);
// const filters = ref(true);
// const search = ref(true);

// const mobileBags = ref(false);
// const mobilePackages = ref(false);

// const mobileCategoryState = ref(false);

// const mobileCategory = () => {
//   mobileCategoryState.value = !mobileCategoryState.value;
// };

let activeCategory = ref([]);

const showCategory = (category) => {
  const listProducts = computed(() => indexStore.fetchedProducts);
  if (category === "showAll") {
    activeCategory.value = [];
  } else {
    activeCategory.value = listProducts.value.reduce((acc, item) => {
      if (item.group === category) {
        acc.push(item);
      }

      if (item.groupProducts) {
        const matchingGroups = item.groupProducts.filter((group) => group.group === category);
        matchingGroups.forEach((group) => acc.push(group));
      }

      return acc;
    }, []);
  }
};

// const showMobileCategory = (category) => {
//   switch (category) {
//     case "mobileBags":
//       if (mobileBags.value) {
//         mobileBags.value = false;
//         return;
//       } else {
//         mobilePackages.value = false;
//         mobileBags.value = true;
//       }
//       break;
//     case "mobilePackages":
//       if (mobilePackages.value) {
//         mobilePackages.value = false;
//         return;
//       } else {
//         mobileBags.value = false;
//         mobilePackages.value = true;
//       }
//       break;
//   }
// };

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
</style>
