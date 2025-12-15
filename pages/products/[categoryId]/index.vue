<template>
    <div class="category_product_wrapper">
        <div class="page_title">
            <h1>
                {{  currentCategory.translations[0].title }}
            </h1>
        </div>
        <div class="loader_wrapper" v-if="fetchedProducts.length === 0">
            <Loader/>
            Завантаження
        </div>
        <ul class="product_wrapper" v-else>
            <li 
                v-for="product in fetchedProducts" 
                :key="product.id"
            >
                <NuxtLink
                    :to="`/products/${categoryName}/${product.id}`"
                >
                    <ItemCard :product="product" @click="productStore.setSelectedProducts(product)"/>
                </NuxtLink>
            </li>

        </ul>

    </div>
    
</template>



<script setup>

    import { useIndexStore } from '@/store/index-store';
    import { useProductStore } from '@/store/product-store';
    import { ref } from 'vue';
    import ItemCard from '@/components/ItemCard.vue';
    import Loader from '@/components/shared/Loader.vue';

    const fetchedProducts = ref([]);
    const categoryName = ref('');


    const indexStore = useIndexStore();
    const productStore = useProductStore();



    const route = useRoute();


     const categoryId = route.params.categoryId;

     categoryName.value = categoryId;


     const currentCategory = computed(() => {
            return indexStore.fetchedCategories.find((cat) => cat.group.toLowerCase() === categoryId.toLowerCase());    
        })





    onMounted(async () => {

        const categoryId = currentCategory.value.id;
        
        try{

            const getProductsByCategory = await $fetch(`/api/category?categoryId=${categoryId}`);

            fetchedProducts.value = getProductsByCategory.data;

        } catch (err) {

            console.log(err)

        }


    })

    definePageMeta({
    layout: "products",
    });
</script>



<style lang="scss">

    .category_product_wrapper{
        padding: 20px 0 150px;
        position: relative;
    }


    .page_title{
        h1{
            color: white;
            font-weight: 700;
            font-size: 2rem;
        }
    }

    .loader_wrapper{
        position: absolute;
        width: 100%;
        height: -webkit-fill-available;
        transform: translateY(50%);
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        color: white;
    }
    .product_wrapper{
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        align-items: stretch;
        gap: 1rem;

    
    }




</style>