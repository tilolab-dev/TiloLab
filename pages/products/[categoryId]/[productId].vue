<template>
    <div class="product_id">

        <div class="container">

            <div class="product_id_wrapper" v-if="!loadState">
                <BreadCrumbs/>

                <div class="product_id_main">

                    <div class="product_id_preview">

                        <div class="main_img">
                            <img :src="productStore.selectedProducts.img[0].path" alt="main_img">

                        </div>

                        <div class="img_gallery">

                            <div
                                class="img_gallery_item"
                                v-for="(item, i) in 5"
                                :key="i"
                            >
                                <img :src="productStore.selectedProducts.img[0].path" alt="preview">

                            </div>

                        </div>

                    </div>

                    <div class="product_id_info">
                        <div class="product_id_info_main">

                            <h3>
                                {{ productStore.selectedProducts.translations[0].title }}
                            </h3>
                            <div class="product_price">
                                <span>
                                    {{ productStore.selectedProducts.productPrice }} грн
 
                                </span>
                                <span class="discount_accent" v-if="productStore.selectedProducts.discountPercent != 0">
                                    9999 грн

                                </span>
                            </div>

                            <div class="wish_list">

                                <SvgIcon name="header-heart" size="big" fill="var(--text-color)"/>

                                <span>
                                    Додати до списку бажань
                                </span>


                            </div>

                            <div class="availability">

                                <SvgIcon name="arrow-down" size="big" fill="var(--accent-color)"/>

                                <span >
                                    {{ productStore.selectedProducts.stockValue}} в наявності
                                </span>

                            </div>

                            <div class="cart_btn">
                                <button
                                    @click="cartStore.addProduct(productStore.selectedProducts)"
                                >
                                    Додати в кошик
                                </button>
                            </div>

                        </div>

                        <div class="product_id_info_characteristics">
                            <div class="head">
                                <h3>
                                    Характеристики
                                </h3>

                               
                            </div>
                             <ul>
                                    <li>
                                        <span>
                                            <strong>
                                                Колір:
                                            </strong>
                                            {{ productStore.selectedProducts.translations[0].productColor }}
                                        </span>
                                    </li>
                                    <li>
                                        <span>
                                            <strong>
                                                Матеріал:
                                            </strong>
                                            {{ productStore.selectedProducts.translations[0].productMaterial }}
                                        </span>
                                    </li>
                                    <li>
                                        <span>
                                            <strong>
                                                Розмір:
                                            </strong>
                                            {{ productStore.selectedProducts.productSize }}
                                        </span>
                                    </li>
                                    <li>
                                        <span>
                                            <strong>
                                                Країна виробник:
                                            </strong>
                                            <!-- {{ productStore.selectedProducts.translations[0].productMaterial }} -->
                                              ...
                                        </span>
                                    </li>
                                </ul>
                        </div>

                        <div class="product_id_info_description">
                            <div class="head">
                                <h3>
                                    Опис
                                </h3>
                                <button>
                                    <SvgIcon name="arrow-down" size="big" fill="var(--text-color)" />
                                </button>
                            </div>
                            <p>
                                {{ productStore.selectedProducts.translations[0].productDescription }}
                            </p>
                        </div>

                    </div>

                </div>

            </div>
            

        </div>

      
    </div>
</template>




<script setup>
    import {ref} from 'vue';
    import { useProductStore } from '@/store/product-store';
    import { useCartStore } from '@/store/cart-store';

    // components

    import BreadCrumbs from '@/components/shared/BreadCrumbs.vue';
    import SvgIcon from '@/components/shared/SvgIcon.vue';

    const productStore = useProductStore();
    const cartStore = useCartStore();
    const loadState = ref(true);

    const route = useRoute();

    const routeId = route.params.productId;


    const fetchProductById = async () => {

        try{

            const getProducts = await $fetch(`/api/products/${routeId}`);


            if (!getProducts.data) {

                return navigateTo('/404')
            }

            productStore.setSelectedProducts(getProducts.data);
              
            console.log(productStore.selectedProducts, 'productStore');

        } catch (err) {

            console.log(err)

        }
    }


    onMounted(async () => {

        if (productStore.selectedProducts) {
            loadState.value = false;
            return;
        } else if (routeId) {
            await fetchProductById();
            loadState.value = false;
        } else {
            navigateTo('/404')
        }
    })

</script>


<style lang="scss">

    .product_id_wrapper{
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        margin-block: 4rem;
        gap: 4rem;
    }

    .product_id{
        h1{
            color: white;
        }
    }

    .img_gallery{
        display: flex;
        gap: 12px;
        overflow-x: auto;
        scroll-snap-type: x mandatory;
        padding-bottom: 10px;
        scrollbar-width: none;

        &::-webkit-scrollbar{
            display: none;
        }

    }
    .img_gallery_item{
        flex: 0 0 30%;
        scroll-snap-align: start;
        overflow: hidden;
        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .product_id_main{
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        position: relative;
        gap: 5rem;
        width: 100%;
        height: 100%;

        
    }

    .product_id_preview{
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        width: 100%;
        height: 100%;
        gap: 1rem;
        flex: 1;

        .main_img{
            width: 100%;
            height: 100%;
        }

        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .product_id_info{
        flex: 1;
        color: var(--text-color);
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        gap: 4rem;
       

        &_main{
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;
            width: fit-content;
            gap: 1rem;

            h3{
                font-size: 2.1rem;
                font-weight: 500;
            
            }

            .product_price{
                display: flex;
                justify-content: flex-start;
                align-items: center;
                gap: 1.5rem;

                span{
                    font-size: 1.8rem;
                    font-weight: 500;   
                }

              

                .discount_accent{
                    color: var(--accent-color);
                }

                



            }

            .wish_list{
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    gap: 1rem;
                    cursor: pointer;

                    span{
                        font-size: 1.4rem;
                        font-weight: 500;
                    }

                    @media screen and (min-width: 1024px) {
                        &:hover svg{
                            fill: var(--accent-color);
                            transition: all ease 0.3s;

                        }
                        &:hover span{
                            color: var(--accent-color);
                            transition: all ease 0.3s;
                        }
                        
                    }
           
                  
            }

            .availability{
                display: flex;
                justify-content: flex-start;
                align-items: center;
                gap: 1rem;

                span{
                    font-size: 1.4rem;
                    font-weight: 500;
                }
            }

            .cart_btn{
                width: 100%;
                height: fit-content;
                position: relative;
                button{
                    width: 100%;
                    height: 100%;
                    background: var(--btn-color);
                    border: 2px solid var(--border-color);
                    transition: all ease 0.3s;
                    cursor: pointer;
                    border-radius: 8px;
                    padding-block: 1rem;
                    font-size: 1.5rem;

                    @media screen and (min-width: 1024px) {
                        &:hover {
                            background: var(--btn-color-hover);
                            transition: all ease 0.3s;
                        }
                    }
                }
            }

        }

        &_characteristics{
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;
            gap: 1rem;

            h3{
                font-size: 1.7rem;
                font-weight: 500;
            }

            ul{
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: flex-start;
                gap: 0.5rem;

                li span{
                    strong{
                        font-size: 1.4rem;
                        font-weight: 700;
                        color: var(--text-color);
                    }
                    font-size: 1.3rem;
                    font-weight: 500;
                    color: darkgrey
                }
            }
        }

        &_description{
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;
            gap: 1rem;

            .head{
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 100%;

                h3{
                    font-size: 1.7rem;
                    font-weight: 500;
                }
            }

            p{
                font-size: 1.4rem;
            }
        }


    }
    
    
</style>